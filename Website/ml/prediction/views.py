from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import pandas as pd
import pickle
import numpy as np
import uuid

# Load the pipeline model
with open('./pkl/pipeline.pkl', 'rb') as file:
    loaded_pipeline = pickle.load(file)

# In-memory storage for predictions
predictions_store = {}

@csrf_exempt
def submit(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request
            data = json.loads(request.body)

            # Create a DataFrame from the incoming data
            new_data = pd.DataFrame({
                'location': [data['location']],
                'BEDROOM_NUM': [float(data["bedroom"])],
                'BALCONY_NUM': [float(data["balcony"])],
                'AREA': [float(data["area"])],
                'AGE': [data["age"]],
                'FURNISH': [data["furnish"]],
                'amenity_luxury': [data["amenity"]],
                'FLOOR_NUM': [data["floor"]]
            })

            # Predict using the loaded pipeline
            predicted_values = loaded_pipeline.predict(new_data)
            predicted_values = np.expm1(predicted_values)  # Assuming log-transformed target

            # Generate a unique session ID
            session_id = str(uuid.uuid4())

            # Store the prediction in the in-memory store with the session ID
            predictions_store[session_id] = float(predicted_values[0])

            return JsonResponse({'session_id': session_id, 'prediction': predictions_store[session_id]})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

def fetch_data(request):
    if request.method == 'GET':
        session_id = request.GET.get('session_id')
        prediction = predictions_store.get(session_id, None)
        if prediction is None:
            return JsonResponse({'error': 'No data available'}, status=404)
        return JsonResponse({'prediction': prediction})
    return JsonResponse({'error': 'Invalid request method'}, status=400)
