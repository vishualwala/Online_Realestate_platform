from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import pandas as pd
import pickle
import numpy as np

with open('./pkl/pipeline.pkl', 'rb') as file:
    loaded_pipeline = pickle.load(file)

@csrf_exempt
def submit(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

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

            predicted_values = loaded_pipeline.predict(new_data)
            predicted_values = np.expm1(predicted_values)
            predicted_values = float(predicted_values[0])

            
            return JsonResponse({'prediction': predicted_values})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


def fetch_data(request):
    return JsonResponse({'error': 'Invalid request method'}, status=400)
