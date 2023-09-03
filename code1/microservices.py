
from flask import Flask, request, jsonify
import asyncio
import concurrent.futures
import requests

app = Flask(__name__)

# to fetch numbers from a given URL
def fetch_numbers_from_url(url):
    try:
        response = requests.get(url, timeout=1)
        if response.status_code == 200:
            return response.json().get("numbers", [])
    except (requests.exceptions.RequestException, ValueError):
        pass
    return []

# Define the '/numbers' endpoint
@app.route('/numbers', methods=['GET'])
def get_numbers():
    urls_1 = request.args.getlist('url')

    # to fetch numbers concurrently ThreadpoolExecutor 
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Fetch numbers from URL.
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        tasks = [loop.run_in_executor(executor, fetch_numbers_from_url, url) for url in urls_1]
        numbers_lists = loop.run_until_complete(asyncio.gather(*tasks))

    # Merge and sort unique numbers
    merged_numbers = sorted(set(number for numbers_list in numbers_lists for number in numbers_list))

    return jsonify({"numbers": merged_numbers})

@app.route('/')
def welcome():
    return " The service started--Number Management Service!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8008, debug=True)
