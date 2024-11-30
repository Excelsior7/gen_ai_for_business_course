import json
from fastapi import FastAPI
from pydantic import BaseModel
from scrapping_apify_service import apify_scraper_actor
from openai_service import categorize_reviews
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Domaine React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/reviews")
def get_reviews(google_map_url):
    reviews = apify_scraper_actor(google_map_url)
    return categorize_reviews(reviews)


