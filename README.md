# GEN AI

## 1- SCRAPING 

## Description
This project allows you to scrape Google reviews for a specific establishment in a given city. The retrieved information includes comments, ratings, user names, and review dates. The script uses Selenium to navigate through the pages and interact with dynamic elements.

---

## Usage

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
