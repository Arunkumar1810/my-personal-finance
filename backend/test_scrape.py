import requests
from bs4 import BeautifulSoup

def test_scrape():
    url = "https://www.moneycontrol.com/india/stockpricequote/refineries/relianceindustries/RI"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Let's try to find price. Usually in a div with id="nsecp" or class="inprice1"
    price = soup.find('div', {'id': 'nsecp'})
    if not price:
        price = soup.find('div', {'id': 'bsecp'})
        
    print("Price:", price.text if price else "Not found")
    
    # Let's try 52-week high/low.
    # Moneycontrol often puts it in a span id like nse_52high or in a table.
    high_52 = soup.find('span', {'id': 'n_52h'}) or soup.find('div', {'id': 'n_52h'}) or soup.find(id='nse_52high') or soup.find(id='bse_52high')
    low_52 = soup.find('span', {'id': 'n_52l'}) or soup.find('div', {'id': 'n_52l'}) or soup.find(id='nse_52low') or soup.find(id='bse_52low')
    
    # 52 Week High and Low are usually in tables.
    high_td = soup.find('td', string=lambda t: t and '52 Week High' in t)
    low_td = soup.find('td', string=lambda t: t and '52 Week Low' in t)
    
    if high_td:
        # Depending on structure, the value might be in the next td or in a div inside next td
        val = high_td.find_next_sibling('td')
        if val: print("52H (td sibling):", val.text)
        
    if low_td:
        val = low_td.find_next_sibling('td')
        if val: print("52L (td sibling):", val.text)
        
    # Also check IDs n_52h and n_52l
    high_52 = soup.find(id='n_52h') or soup.find(id='b_52h')
    low_52 = soup.find(id='n_52l') or soup.find(id='b_52l')
    
    print("52H ID:", high_52.text if high_52 else "Not found")
    print("52L ID:", low_52.text if low_52 else "Not found")
    
    # Some basic volatility metrics
    vol = soup.find(id='nse_vol') or soup.find(id='bse_vol')
    print("Vol:", vol.text if vol else "Not found")

if __name__ == "__main__":
    test_scrape()
