# MERN Stack Real Estate ML App

![MERN Stack Real Estate ML App Workflow](https://github.com/dipanjanpathak/Master_ML-MERN-Realestate/blob/master/Website/frontend/src/Images/prediction%20workflow.png?raw=true)

This repository contains a **MERN Stack Real Estate Machine Learning Application** that predicts real estate prices and provides property recommendations. The app integrates **Machine Learning** models with a robust **backend** and a **React** frontend, delivering predictions and recommendations based on user input and data from the database.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Workflow Process](#workflow-process)
- [Data Science Workflow](#data-science-workflow)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Predict real estate prices based on input queries.
- Provide personalized property recommendations.
- Seamless integration of Machine Learning (ML) models with the backend.
- Efficient state management with **Redux Toolkit** on the frontend.
- End-to-end **MERN Stack** implementation with **Django** and **Node.js** APIs.
- In-memory caching for storing predictions.

---

## Tech Stack

- **Machine Learning**: Python, Scikit-learn, Numpy, Pandas, Plotly
- **Web Scraping**: BeautifulSoup, Selenium
- **Frontend**: React, Redux Toolkit, JavaScript, React-Bootstrap
- **Backend**: Django, Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: NGINX, AWS, Gunicorn

---

## Architecture Overview

This app follows a **Microservices** architecture, utilizing both Django and Node.js APIs for communication with the Machine Learning model and MongoDB. The frontend, built with React and Redux Toolkit, interacts with the backend to manage states and display predictions and recommendations to the user.

---

## Workflow Process

The flow of the app can be understood through the following steps:

1. **User Query Input**: The user inputs a property-related query (e.g., location, BHK, area).
2. **POST User Query Data**: The frontend (React) sends a POST request containing the user query data to the Django API.
3. **Load ML Model**: The Django API interacts with the ML model, loading the model to predict the price.
4. **Predict Price**: The ML model processes the user query and predicts the property price.
5. **Store Prediction**: The prediction is cached in an in-memory store to improve response times.
6. **Return Prediction**: The predicted price is sent back to the React app, where it is displayed to the user.
7. **Display Prediction**: The predicted price is presented to the user on the frontend.
8. **POST Query Data with Predicted Price**: The predicted price, along with the original query data, is sent to the backend for recommendations.
9. **Load Model (Recommendation)**: The ML model processes the query data to provide recommended properties.
10. **Generate Recommended Property IDs**: A list of recommended property IDs is prepared.
11. **GET Property ID Lists**: The frontend requests a list of recommended property IDs.
12. **POST for Recommendations**: The frontend makes another POST request for recommendations based on the property ID list to the Node.js API.
13. **Retrieve Properties from MongoDB**: The backend retrieves property details from the MongoDB database.
14. **Return Recommendations**: The recommended property data is returned to the frontend.
15. **Manage State**: The frontend uses Redux Toolkit to manage the application state for recommendations and prediction.
16. **Display Recommendations**: The recommendations are displayed to the user in the app interface.

---

## Data Science Workflow

The **Data Science** portion of this project is focused on predicting property prices and providing property recommendations. Here’s an overview of the **numerical aspects** and **metrics** used in the model evaluation process.

### 1. Data Collection & Preprocessing

- **Data Sources**: Real estate data was scraped using **BeautifulSoup** and **Selenium**, which includes features like location, BHK, balcony, area, floor number, price, etc.
- **Data Preparation**: The dataset was preprocessed by handling missing values, encoding categorical features, and normalizing numerical columns.
  - **Categorical Encoding**: Applied **OneHotEncoder** to features like `location`, `age`, `furnishing`, etc.
  - **Scaling**: Applied **StandardScaler** to scale numerical features like `area`, `price`, and `floor_number`.
  
### 2. Model Selection

- **Model**: The project uses **XGBoost Regressor** for price prediction. XGBoost was chosen for its ability to handle large datasets efficiently and produce high-quality results.

### 3. Hyperparameter Tuning

- **Hyperparameters Tuned**:
  - **Learning Rate**: `0.01 - 0.3` (optimal: 0.1)
  - **Max Depth**: `5 - 15` (optimal: 8)
  - **Subsample**: `0.7 - 1` (optimal: 0.85)
  - **Colsample_bytree**: `0.6 - 0.9` (optimal: 0.8)
  - **Number of Estimators**: `100 - 1000` (optimal: 500)

- **Optimization Method**: **Bayesian Optimization** was used to tune hyperparameters efficiently and reduce overfitting, leading to an optimal model.

### 4. Model Evaluation Metrics

- **R² Score**: The model achieved an **R² Score of 91%**, indicating that the model explains 91% of the variance in property prices.
- **Mean Absolute Error (MAE)**: The model’s MAE is **16%**, meaning the predicted prices have an average error of 16% when compared to the actual prices.

### 5. Price Prediction Process

1. **Input**: The user enters a query with parameters such as location, area, BHK, and other relevant property details.
2. **Prediction**: The pre-trained XGBoost model processes these inputs to predict the price of the property.
3. **Caching**: The predicted price is stored in an in-memory cache to reduce the time for future queries.
4. **Output**: The predicted price is sent back to the frontend and displayed to the user.

### 6. Recommendation System

- **Recommendation Model**: Based on the predicted price and property features, a **Recommendation Engine** suggests similar properties to the user.
- **Similarity Measures**: Recommendations are made based on similarity in features such as `area`, `BHK`, and `price`.


---

## Installation

To get started with this project, follow the steps below:

### Prerequisites

- Node.js (v14+)
- MongoDB
- Python (v3.8+)
- Django (v3+)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/dipanjanpathak/Master_ML-MERN-Realestate.git
   cd Master_ML-MERN-Realestate/Website
   ```

2. Install the required dependencies:
   ```bash
   npm install
   cd backend
   npm install
   cd ..
   cd frontend
   npm install
   cd ..
   cd ml
   pip install -r requirements.txt
   ```

3. Set up the MongoDB database:
   - Ensure MongoDB is running locally or via a cloud service (e.g., MongoDB Atlas).
   - Configure the database URI in the backend settings.

4. Start the app from the root:
   ```bash
   npm run dev
   ```

---

## Usage

Once installed and running, you can access the app at `http://localhost:3000`. Use the form on the frontend to input property queries, receive predicted prices, and explore recommended properties.

---

## Contributing

Contributions are welcome! If you have suggestions or want to report a bug, feel free to submit an issue or open a pull request.

---

## License

This project is licensed under the MIT License.

---
