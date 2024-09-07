from flask import Flask, request, jsonify
from flask.helpers import send_from_directory 

from flask_cors import CORS, cross_origin
import random
import datetime

app = Flask(__name__, static_folder='CreditCard_Fraud-1/dist', static_url_path='')
CORS(app)

 
# Load the Keras model


# Hardcoded sample data
sample_data_list = [
    {
        'time': 0,
        'amount': 149.62,
        'location': 'New York, USA',
        'merchant': 'Amazon',
        'features': [-1.359807134, -0.072781173, 2.536346738, 1.378155224, -0.33832077, 0.462387778, 0.239598554, 
                     0.098697901, 0.36378697, 0.090794172, -0.551599533, -0.617800856, -0.991389847, -0.311169354, 
                     1.468176972, -0.470400525, 0.207971242, 0.02579058, 0.40399296, 0.251412098, -0.018306778, 
                     0.277837576, -0.11047391, 0.066928075, 0.128539358, -0.189114844, 0.133558377, -0.021053053]
    },
    {
        'time': 1,
        'amount': 2000000,
        'location': 'Los Angeles, USA',
        'merchant': 'Best Buy',
        'features': [1.191857111, 0.266150712, 0.166480113, 0.448154078, 0.060017649, -0.082360809, -0.078802983, 
                     0.085101655, -0.255425128, -0.166974414, 1.612726661, 1.065235311, 0.489095016, -0.143772296, 
                     0.635558093, 0.463917041, -0.114804663, -0.18336127, -0.145783041, -0.069083135, -0.225775248, 
                     -0.638671953, 0.101288021, -0.339846476, 0.167170404, 0.125894532, -0.008983099, 0.014724169]
    },
    # Add more sample data here as needed
]

def generate_transaction_id():
    """Generate a random transaction ID."""
    return f"TXN{random.randint(1000, 9999)}"

def generate_random_date():
    """Generate a random date in the last year."""
    start_date = datetime.datetime.now() - datetime.timedelta(days=365)
    random_date = start_date + datetime.timedelta(days=random.randint(0, 365))
    return random_date.strftime("%m/%d/%Y")

@app.route('/sample_data', methods=['GET'])
@cross_origin()
def get_sample_data():
    # Copy the first sample data to ensure the original is not modified
    sample_row = sample_data_list[0].copy()
    
    # Add random transaction ID and date to the sample data
    sample_row['transactionId'] = generate_transaction_id()
    sample_row['date'] = generate_random_date()
    
    return jsonify(sample_row)

@app.route('/predict_keras', methods=['POST'])
def predict_keras():
    try:
        print("Received POST request with data:", request.data)
        data = request.get_json()
        print("Parsed JSON data:", data)

        if 'features' not in data:
            print("Error: 'features' key not found in data")
            return jsonify({'error': "'features' key not found in data"}), 400

        # Return random prediction: 0 or 1
        prediction = random.choice([0, 1])
        return jsonify({'prediction': prediction})

    except Exception as e:
        print("An error occurred:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path=''):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
