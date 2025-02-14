from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import pickle
import pandas as pd
import numpy as np
import os
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.metrics.pairwise import cosine_similarity


# Load pre-trained models and datasets
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load similarity matrix and dataset for exact matches
with open(os.path.join(BASE_DIR, '../pkl/similarity.pkl'), 'rb') as file1:
    similarity = pickle.load(file1)

with open(os.path.join(BASE_DIR, '../pkl/prediction_df.pkl'), 'rb') as file2:
    dataset = pickle.load(file2)

df_exact = pd.DataFrame(dataset)  # For exact match recommendations

# Load dataset for predictions
with open(os.path.join(BASE_DIR, '../pkl/df_prediction_recommendation.pkl'), 'rb') as file3:
    dataset3 = pickle.load(file3)

df_prediction = pd.DataFrame(dataset3)  # For prediction-based recommendations


# Getting Prediction 
@csrf_exempt
def getRecommendations(req, PROP_ID):
   
    if req.method == 'POST':
        try:
            prop_index = df_exact[df_exact['PROP_ID'] == PROP_ID].index[0]
        except IndexError:
            return JsonResponse({'error': 'Property not found'}, status=404)

        # Get similarity scores and sort them
        distances = similarity[prop_index]
        property_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:11]  # Top 10

        # Prepare recommended properties
        recommended_properties = []
        for index, distance in property_list:
            recommended_properties.append({
                'PropertyID': df_exact.iloc[index]['PROP_ID'],
                'Similarity': f"{distance * 100:.2f}" 
            })

        return JsonResponse(recommended_properties, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=405)



# Getting Recommendation on Prediction Page
@csrf_exempt
def prediction_recommendation(req, top_n=10):
    if req.method == 'POST':
        try:
            data = json.loads(req.body)

            # Extract values from the request
            BEDROOM_NUM = float(data["bedroom"])  
            location = data['location'] 
            AGE = data["age"]
            FURNISH = data["furnish"]
            amenity_luxury = data["amenity"]
            AREA = float(data["area"])
            BALCONY_NUM = float(data["balcony"])  
            PRICE = float(data["PRICE"])  

            # Filter the existing dataset based on the user's bedroom input
            filtered_df = df_prediction[df_prediction['BEDROOM_NUM'] == BEDROOM_NUM]

            # Preparing user input data as a DataFrame
            new_data = {
                'BEDROOM_NUM': [BEDROOM_NUM],
                'location': [location],
                'AGE': [AGE],
                'FURNISH': [FURNISH],
                'amenity_luxury': [amenity_luxury],
                'AREA': [AREA],
                'BALCONY_NUM': [BALCONY_NUM],
                'PRICE': [PRICE]
            }
            new_df = pd.DataFrame(new_data)

            # Columns to process
            categorical_columns = ['location', 'AGE', 'FURNISH', 'amenity_luxury']
            numerical_columns = ['BEDROOM_NUM', 'AREA', 'BALCONY_NUM', 'PRICE']

            # Preprocessing: OneHotEncoder for categorical, StandardScaler for numerical
            preprocessor = ColumnTransformer(
                transformers=[
                    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_columns),
                    ('num', StandardScaler(), numerical_columns)
                ])

            # Fit on the filtered dataset and transform both the filtered dataset and new input
            processed_existing_data = preprocessor.fit_transform(filtered_df)
            processed_new_data = preprocessor.transform(new_df)

            # Calculate cosine similarity between new input and filtered properties
            similarity_scores = cosine_similarity(processed_new_data, processed_existing_data)

            # Get top N recommendations based on similarity scores
            top_n_indices = similarity_scores.argsort()[0][-top_n:][::-1]
            top_n_scores = similarity_scores[0][top_n_indices]

            # Prepare recommended properties
            recommended_properties = []
            for index, score in zip(top_n_indices, top_n_scores):
                recommended_properties.append({
                    'PropertyID': filtered_df.iloc[index]['PROP_ID'],
                    'Similarity': f"{score * 100:.2f}"  
                })

            return JsonResponse(recommended_properties, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)




