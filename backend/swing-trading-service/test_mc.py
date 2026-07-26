import requests
import json

def test_search(query):
    url = f"https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?query={query}&type=1&format=json"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    print("Status:", response.status_code)
    try:
        data = response.json()
        print("Data length:", len(data))
        if data:
            print("First item:", data[0])
    except Exception as e:
        print("Error parsing json:", e)
        print("Text:", response.text[:200])

if __name__ == "__main__":
    test_search("RELIANCE")
