import requests
import json as js


def apify_scraper_actor(google_maps_path):
    apify_scraper_endpoint="https://api.apify.com/v2/acts/compass~google-maps-reviews-scraper/run-sync-get-dataset-items?token=apify_api_YaeAd5682KXs2HZ0CFUHj0DzdUQPwb0ETYgj"

    json_payload = {
        "language": "en",
        "maxReviews": 100,
        "personalData": True,
        "startUrls": [
            {
                "url": google_maps_path,
                "method": "GET"
            }
        ]
    }

    response = requests.post(apify_scraper_endpoint,json=json_payload)
    print(response.text)

    reviews = js.loads(response.text)

    return reviews

