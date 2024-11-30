# Albert School MSc 2 - GEN AI FOR BUSINESS COURSE

# Google Reviews Analysis with AI  

This project allows you to analyze Google reviews for a specific establishment using intelligent categorization powered entirely by artificial intelligence.  

## Project Structure  
The project is divided into two main parts:  

### 1. **Frontend**  
The user interface was built with **React**, providing an intuitive and smooth experience for interacting with the data.  

### 2. **Backend**  
The backend consists of two main components:  
- **Apify Scraper**  
   We use the [Google Review Scraper (Apify)](https://apify.com/compass/google-maps-reviews-scraper) to automatically retrieve all Google reviews for a given establishment.  
   
- **OpenAI Service**  
   Once the reviews are extracted, they are sent to the OpenAI API using a prompt (shared below). This script automatically categorizes each review and assigns a sentiment: positive or negative.  

### OpenAI prompt
```
prompt_system = "Your role is to automatically categorize a company's reviews."     
prompt = f"""
CONTEXT:
I will share with you a JSON file containing a set of reviews about a company. You should interpret the JSON as follows: {{"id":"comment"}}.

TASK:
Each review is associated with an id. Your objective is to output a JSON with two elements:
1. The categories associated with the comment.
2. Whether the comment is positive or negative. (Polarity)

Regarding the taxonomy, you must follow three rules:
1. The categories should cover the entire range of comments. Every comment must be categorized.
2. Use the appropriate level of granularity to facilitate analysis.
3. Maximize the distance between categories to avoid redundancy.

FORMAT:
{{"comment id": [[category #1, Polarity of the comment for category #1],[category #2, Polarity of the comment for category #2],...]}}

Important note: I only want the JSON as output, nothing else. For example, I do not want the `json` annotation.

JSON FILE:
{reviews_text_only}
"""
```

# Installation

## Cloning the GitHub Repository

To clone the repository, open your terminal (or command prompt) and run the following command:

```bash
git clone https://github.com/Excelsior7/gen_ai_for_business_course
```

## Running the FastAPI Application

To run the FastAPI application on port 8000, follow these steps:

1. Navigate to the FastAPI application directory:
   ```bash
   cd ./gen_ai_for_business_course/backend
   ```

2. Install the dependencies if not already done:
   ```bash
   pip install -r requirements.txt
   ```

3. Launch the application:
   ```bash
   fastapi run fastapi_app.py --port 8000
   ```

## Running the React Application

To run the React application on port 3000, follow these steps:

1. Install Node.js:
   https://nodejs.org/en

2. Navigate to the React application directory:
   ```bash
   cd ./gen_ai_for_business_course/frontend
   ```

3. Install the dependencies if not already done:
   ```bash
   npm install
   ```

4. Launch the application:
   ```bash
   npm start
   ```

## Important Note

### Scraping limit
In the file `backend/scraping_apify_service.py`, modify the parameter **maxReviews**, which specifies the maximum number of reviews to be scraped from Google. Be cautious, as increasing this number could lead to higher costs later on with OpenAI.

### API Key Configuration
Don't forget to replace `api-key` in the file `backend/.env` with your OpenAI API key for the AI service to work properly.


# How to Use the Application  

Now that both the FastAPI and React applications are running, you can take full advantage of the AI's analytical capabilities.  

## Step 1: Find Your Google Maps URL  

The first screen of the React application asks you to enter a URL. This URL should be the Google Maps link where all your customer reviews are listed.  

### How to Find Your Google Maps URL  
1. Go to [Google Maps](https://www.google.com/maps).  
2. Enter the name of your business in the search bar.  
3. Navigate to the page containing your business details and customer reviews.  

For example, here is the URL for FNAC located at Saint-Lazare - Paris 75009:  
[Google Map FNAC Saint Lazare](https://www.google.com/maps/place/Fnac/@48.8753518,2.3244684,587m/data=!3m3!1e3!4b1!5s0x47e66e35bf0f74d1:0x7edf0a3a30afbaac!4m6!3m5!1s0x47e66e3598f16f2d:0x6b4f6b9039ea848!8m2!3d48.8753518!4d2.3270433!16s%2Fg%2F1v2ppjbk?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D)  

4. Copy the URL from the browser's address bar.  

## Step 2: Paste the URL into the Application  

Paste the copied URL into the search bar on your React application’s interface.  

## Step 3: Wait for the Scraping to Complete  

Once the URL is submitted, the application will start scraping your reviews. This process takes a few seconds.  

## Step 4: Analyze Your Customer Reviews  

After the scraping is completed, you’ll be able to analyze your customer reviews directly from the application. Enjoy gaining valuable insights from your data!  


## Value Proposition and Future Directions

### Value Proposition for Businesses  

- **Time-Saving**: The application eliminates the need for manual review analysis, automating the process and saving valuable time.  
- **Enhanced Customer Satisfaction**: It allows businesses to quickly identify their strengths to emphasize and weaknesses to address, fostering improved customer experience.

### Limitations and Future Directions  

- **Current Limitations**: The accuracy of the analysis may be affected by the quality of the available data. For example, a limited number of reviews or irrelevant comments can impact the results.  
- **Future Prospects**: Expanding to include additional sources such as TripAdvisor, Yelp, or social media to enrich the analysis and diversify insights.


