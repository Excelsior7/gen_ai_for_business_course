import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import data from './data/data copy.json';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function App() {
  // États pour les filtres
  const [periodA, setPeriodA] = useState({
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 5, 30),
    key: 'periodA'
  });
  const [periodB, setPeriodB] = useState({
    startDate: new Date(2024, 6, 1),
    endDate: new Date(2024, 11, 31),
    key: 'periodB'
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPolarity, setSelectedPolarity] = useState('');
  const [selectedStars, setSelectedStars] = useState('');
  const [activeWindow, setActiveWindow] = useState('reviews');
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [showUrlInput, setShowUrlInput] = useState(true);

  // Fonction pour récupérer les données depuis l'API
  const fetchReviewsData = async () => {
    try {
      setIsLoading(true);
      // Encodage de l'URL pour la passer en paramètre de requête
      const encodedUrl = encodeURIComponent(urlInput);
      const response = await fetch(`http://0.0.0.0:8000/reviews?google_map_url=${encodedUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      
      const newData = await response.json();
      setReviewsData(newData);
      setShowUrlInput(false);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la récupération des données');
    } finally {
      setIsLoading(false);
    }
  };

  // Extraire les catégories et polarités uniques
  const uniqueCategories = [...new Set(reviewsData.flatMap(review => 
    review.categories_cat ? review.categories_cat.map(cat => cat[0]) : []
  ))];
  const uniquePolarities = [...new Set(reviewsData.flatMap(review => 
    review.categories_cat ? review.categories_cat.map(cat => cat[1]) : []
  ))];

  // Fonction pour filtrer les avis par période
  const filterReviewsByPeriod = (period) => {
    return reviewsData.filter(review => {
      const reviewDate = new Date(review.publishedAtDate);
      return reviewDate >= period.startDate && reviewDate <= period.endDate &&
        (selectedCategory === '' || (review.categories_cat && review.categories_cat.some(cat => cat[0] === selectedCategory))) &&
        (selectedPolarity === '' || (review.categories_cat && review.categories_cat.some(cat => cat[1] === selectedPolarity))) &&
        (selectedStars === '' || review.stars === parseInt(selectedStars));
    });
  };

  // Fonctions utilitaires pour les statistiques
  const getCategoryPolarityCounts = (reviews) => {
    const counts = {};
    reviews.forEach(review => {
      if (review.categories_cat) {
        review.categories_cat.forEach(([category, polarity]) => {
          const key = `${category}-${polarity}`;
          counts[key] = (counts[key] || 0) + 1;
        });
      }
    });
    return counts;
  };

  const getPolarityCounts = (reviews) => {
    const counts = {};
    reviews.forEach(review => {
      if (review.categories_cat) {
        review.categories_cat.forEach(([_, polarity]) => {
          counts[polarity] = (counts[polarity] || 0) + 1;
        });
      }
    });
    return counts;
  };

  const getStarsCounts = (reviews) => {
    const counts = {};
    reviews.forEach(review => {
      counts[review.stars] = (counts[review.stars] || 0) + 1;
    });
    return counts;
  };

  // Calcul des statistiques
  const reviewsA = filterReviewsByPeriod(periodA);
  const reviewsB = filterReviewsByPeriod(periodB);

  const catPolCountsA = getCategoryPolarityCounts(reviewsA);
  const catPolCountsB = getCategoryPolarityCounts(reviewsB);
  const polarityCountsA = getPolarityCounts(reviewsA);
  const polarityCountsB = getPolarityCounts(reviewsB);
  const starsCountsA = getStarsCounts(reviewsA);
  const starsCountsB = getStarsCounts(reviewsB);

  // Calcul des évolutions
  const calculateEvolution = (valueA, valueB) => {
    if (valueA === 0) return 'N/A';
    return ((valueA - valueB) / valueB * 100).toFixed(1) + '%';
  };

  // Fonction pour formater la date
  const formatDate = (date) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
  };

  // Fonction pour obtenir les avis de la période sélectionnée
  const getFilteredReviews = () => {
    const reviewsFromPeriodA = filterReviewsByPeriod(periodA);
    
    // Trie les avis par date (du plus récent au plus ancien)
    return reviewsFromPeriodA.sort((a, b) => 
      new Date(b.publishedAtDate) - new Date(a.publishedAtDate)
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Analyse des Avis Clients</h1>
        {reviewsData.length > 0 && !showUrlInput && (
          <button 
            onClick={() => setShowUrlInput(true)}
            className="new-search-button"
          >
            Nouvelle recherche
          </button>
        )}
      </header>

      <div className="main-container">
        {showUrlInput && (
          <div className="url-input-section">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Entrez l'URL de la page d'avis"
              className="url-input"
            />
            <button 
              onClick={fetchReviewsData}
              disabled={isLoading}
              className="fetch-button"
            >
              {isLoading ? 'Chargement...' : 'Récupérer les avis'}
            </button>
          </div>
        )}

        {reviewsData.length > 0 && (
          <>
            <div className="filters-panel">
              <h2>Filtres</h2>
              <div className="filters-content">
                <div className="date-pickers">
                  <div className="period-picker">
                    <h3>Période A</h3>
                    <DatePicker
                      selected={periodA.startDate}
                      onChange={(date) => setPeriodA({ ...periodA, startDate: date })}
                      selectsStart
                      startDate={periodA.startDate}
                      endDate={periodA.endDate}
                      dateFormat="dd/MM/yyyy"
                    />
                    <DatePicker
                      selected={periodA.endDate}
                      onChange={(date) => setPeriodA({ ...periodA, endDate: date })}
                      selectsEnd
                      startDate={periodA.startDate}
                      endDate={periodA.endDate}
                      minDate={periodA.startDate}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <div className="period-picker">
                    <h3>Période B</h3>
                    <DatePicker
                      selected={periodB.startDate}
                      onChange={(date) => setPeriodB({ ...periodB, startDate: date })}
                      selectsStart
                      startDate={periodB.startDate}
                      endDate={periodB.endDate}
                      dateFormat="dd/MM/yyyy"
                    />
                    <DatePicker
                      selected={periodB.endDate}
                      onChange={(date) => setPeriodB({ ...periodB, endDate: date })}
                      selectsEnd
                      startDate={periodB.startDate}
                      endDate={periodB.endDate}
                      minDate={periodB.startDate}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>

                <div className="other-filters">
                  <div className="filter-group">
                    <label>Catégorie</label>
                    <select 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Toutes les catégories</option>
                      {uniqueCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Polarité</label>
                    <select 
                      value={selectedPolarity} 
                      onChange={(e) => setSelectedPolarity(e.target.value)}
                    >
                      <option value="">Toutes les polarités</option>
                      {uniquePolarities.map(pol => (
                        <option key={pol} value={pol}>{pol}</option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Note</label>
                    <select 
                      value={selectedStars} 
                      onChange={(e) => setSelectedStars(e.target.value)}
                    >
                      <option value="">Toutes les notes</option>
                      {[1, 2, 3, 4, 5].map(stars => (
                        <option key={stars} value={stars}>{stars} étoiles</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-container">
              <div className="window-controls">
                <button 
                  className={`window-button ${activeWindow === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveWindow('reviews')}
                >
                  Avis Clients
                </button>
                <button 
                  className={`window-button ${activeWindow === 'analytics' ? 'active' : ''}`}
                  onClick={() => setActiveWindow('analytics')}
                >
                  Analyses
                </button>
              </div>

              {activeWindow === 'reviews' ? (
                <div className="reviews-section">
                  <h2>Avis Clients</h2>
                  <div className="reviews-grid">
                    {getFilteredReviews().map(review => {
                      console.log('Structure complète de l\'avis:', review);
                      return (
                        <div key={review.reviewId} className="review-card">
                          <div className="review-header">
                            <div className="stars">
                              {[...Array(review.stars)].map((_, i) => (
                                <span key={i} className="star">★</span>
                              ))}
                              {[...Array(5 - review.stars)].map((_, i) => (
                                <span key={i} className="star empty">☆</span>
                              ))}
                            </div>
                            <div className="review-date">
                              {formatDate(review.publishedAtDate)}
                            </div>
                          </div>
                          <div className="review-content">
                            <p>{review.comment || review.text || "Aucun commentaire"}</p>
                          </div>
                          <div className="review-categories">
                            {review.categories_cat && review.categories_cat.map(([category, polarity], index) => (
                              <span 
                                key={index} 
                                className={`category-tag ${polarity.toLowerCase()}`}
                              >
                                {category} ({polarity})
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="analytics-container">
                  <h2>Analyses</h2>
                  <div className="statistics-section">
                    <div className="stat-card total-reviews">
                      <div className="stat-icon">📊</div>
                      <h3>Nombre total d'avis</h3>
                      <div className="stat-content">
                        <div className="stat-period">
                          <span className="period-label">Période A</span>
                          <span className="stat-number">{reviewsA.length}</span>
                        </div>
                        <div className="stat-period">
                          <span className="period-label">Période B</span>
                          <span className="stat-number">{reviewsB.length}</span>
                        </div>
                        <div className="stat-evolution">
                          <span className="evolution-label">Évolution </span>
                          <span className={`evolution-value ${calculateEvolution(reviewsA.length, reviewsB.length).startsWith('-') ? 'negative' : 'positive'}`}>
                            {calculateEvolution(reviewsA.length, reviewsB.length)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="stat-card sentiment-analysis">
                      <div className="stat-icon">😊</div>
                      <h3>Analyse des sentiments</h3>
                      <div className="stat-content">
                        {Object.keys(polarityCountsA || {}).map(polarity => (
                          <div key={polarity} className="sentiment-row">
                            <span className="sentiment-label">{polarity}</span>
                            <div className="sentiment-bars">
                              <div className="period-bar">
                                <div className="bar-label">A: {polarityCountsA[polarity] || 0}</div>
                                <div className="bar" style={{width: `${(polarityCountsA[polarity] || 0) * 100 / Math.max(...Object.values(polarityCountsA), 1)}%`}}></div>
                              </div>
                              <div className="period-bar">
                                <div className="bar-label">B: {polarityCountsB[polarity] || 0}</div>
                                <div className="bar" style={{width: `${(polarityCountsB[polarity] || 0) * 100 / Math.max(...Object.values(polarityCountsB), 1)}%`}}></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="stat-card rating-distribution">
                      <div className="stat-icon">⭐</div>
                      <h3>Distribution des notes</h3>
                      <div className="stat-content">
                        {[5, 4, 3, 2, 1].map(stars => (
                          <div key={stars} className="rating-row">
                            <span className="stars-label">{stars}★</span>
                            <div className="rating-bars">
                              <div className="period-bar">
                                <div className="bar-label">A: {starsCountsA[stars] || 0}</div>
                                <div className="bar" style={{width: `${(starsCountsA[stars] || 0) * 100 / Math.max(...Object.values(starsCountsA))}%`}}></div>
                              </div>
                              <div className="period-bar">
                                <div className="bar-label">B: {starsCountsB[stars] || 0}</div>
                                <div className="bar" style={{width: `${(starsCountsB[stars] || 0) * 100 / Math.max(...Object.values(starsCountsB))}%`}}></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App; 