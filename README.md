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

**prompt_system** = "Your role is to automatically categorize a company's reviews."     
**prompt** = f"""
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

# Usage

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
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

## Running the React Application

To run the React application on port 3000, follow these steps:

1. Navigate to the React application directory:
   ```bash
   cd ./gen_ai_for_business_course/frontend
   ```

2. Install the dependencies if not already done:
   ```bash
   npm install
   ```

3. Launch the application:
   ```bash
   npm start
   ```

## API Key Configuration

Don't forget to replace `api-key` in the file backend/.env with your OpenAI API key for the AI service to work properly.
