import time
from moneycontrol_scraper import get_cached_moneycontrol_data

def test_caching():
    print("Fetching RELIANCE for the first time...")
    start_time = time.time()
    data1 = get_cached_moneycontrol_data("NSE:RELIANCE")
    time1 = time.time() - start_time
    
    print(f"Time taken: {time1:.2f}s")
    print("Result:")
    for k, v in data1.items():
        print(f"  {k}: {v}")
    
    print("\nFetching RELIANCE for the second time immediately...")
    start_time = time.time()
    data2 = get_cached_moneycontrol_data("NSE:RELIANCE")
    time2 = time.time() - start_time
    
    print(f"Time taken: {time2:.2f}s")
    print("Result:")
    for k, v in data2.items():
        print(f"  {k}: {v}")
        
    assert data1['cached'] is False, "First request should not be cached"
    assert data2['cached'] is True, "Second request should be cached"
    assert time2 < 0.1, "Cached request should be very fast"
    
    print("\nTest passed successfully!")

if __name__ == "__main__":
    test_caching()
