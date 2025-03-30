// Function to fetch data from the API
function fetchCryptoData() {
    const apiUrl = 'https://https://api.coincap.io/v2/assets';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract Bitcoin price from the API response
            const bitcoinPrice = data.bitcoin.usd;

            // Display the price in the console or update the DOM
            console.log(`Bitcoin Price: $${bitcoinPrice}`);
            const priceElement = document.getElementById('cryptoPrice');
            if (priceElement) {
                priceElement.textContent = `Bitcoin Price: $${bitcoinPrice}`;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    fetchCryptoData();
});