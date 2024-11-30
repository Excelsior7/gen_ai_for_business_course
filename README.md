# GEN AI

## 1- SCRAPING 

## Description
This project allows you to scrape Google reviews for a specific establishment in a given city. The retrieved information includes comments, ratings, user names, and review dates. The script uses Selenium to navigate through the pages and interact with dynamic elements.

---

## Prerequisites

### Installing Dependencies

From the terminal, start by cloning the project and installing the dependencies listed in the `requirements.txt` file with the following commands:
   ```bash
git clone https://github.com/yannamer/GenAI.git
  ```
  ```bash
cd 'path/to/your/file/GenAI'
  ```
  ```bash
pip install -r requirements.txt
  ```
This will install the necessary packages.
Make sure that Google Chrome is also installed.

---

## Usage

### Input
Once the script is launched, it will ask for two inputs in the terminal:
1. **Business Name (`business_raw`)**: Name of the establishment to search for (e.g., Albert school).
2. **City (`town_raw`)**: City where the establishment is located.

These two pieces of information are combined to construct the Google search URL. Since it is a Google search, a slight spelling mistake is acceptable.

### Script Steps
1. **Launching the Browser**: The script uses Selenium to open Google Chrome.
2. **Searching for the Establishment**: The search URL is generated from the user inputs.
3. **Navigating to Reviews**:
   - The script accepts cookies if necessary.
   - It clicks on the Google reviews to display all available comments.
4. **Scrolling**:
   - The script automatically scrolls to the bottom of the page to load all reviews and avoid potential bugs, ensuring smooth operation.
   - Then, it scrolls back up in steps while scraping the visible data.
5. **Scraping Data**:
   - Retrieving comments.
   - Extracting user ratings.
   - Retrieving user names.
   - Converting review dates to the format DD/MM/YY.
6. **Removing Duplicates**: Duplicates are removed based on the `Name` column in case a user encountered a bug and submitted the same review or rating twice.
7. **Exporting Data**:
   - The data is saved in a CSV file named `<Business_Name>_<City>.csv` in the `./Comments` folder.
   - Since the script may take time to run, wait for the terminal to indicate "x comments saved in comments.csv" without interrupting it, where x is the number of scraped data.

---

### Output
The generated CSV file contains the following columns:
- **Business**: Name of the establishment.
- **Town**: City.
- **Comment**: Text of the comment.
- **Rate**: Rating given by the user.
- **Name**: User's name.
- **Date**: Date of the review.

# Instructions for interacting with the application

## Cloning the GitHub Repository

To clone the repository, open your terminal (or command prompt) and run the following command:

```bash
git clone <repository_url>
```
Replace `<repository_url>` with the URL of your repository.

## Running the FastAPI Application

To run the FastAPI application on port 8000, follow these steps:

1. Navigate to the FastAPI application directory:
   ```bash
   cd path/to/fastapi/directory
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
   cd path/to/react/directory
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

Don't forget to replace `api-key` with your OpenAI API key for the AI service to work properly.
