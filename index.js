// Define the API URL
const apiUrl = 'https://api.coincap.io/v2/assets';

document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(apiData => {
            // Pass the fetched data to the populateNav function
            if (apiData.data && apiData.data.length > 0) {
                populateNav(apiData.data); // Call populateNav with the array of assets
            } else {
                console.error('No data available from the API.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Get references to DOM elements
    const topBar = document.getElementById('topBar');
    const compassLogo = document.getElementById('compassLogo');
    const navBar = document.getElementById('navBar');
    const name = document.getElementById('assetName');
    const symbol = document.getElementById('assetSymbol');
    const symbol2 = document.getElementById('assetSymbol2');
    const assetDescription = document.getElementById('assetDescription');
    const image = document.getElementById('assetImage');
    const assetPrice = document.getElementById('price');
    const assetMarketCap = document.getElementById('marketCap');
    const assetVolume = document.getElementById('volume');
    const assetChange = document.getElementById('change');
    const assetChangePercentage = document.getElementById('change%');

    // Clear the navigation bar
    navBar.innerHTML = "";

    // Function to change the logo to compassLight.png
    function changeLogo() {
        if (compassLogo) {
            compassLogo.src = './compassLight.png';
        } else {
            console.error("Element with ID 'compassLogo' not found.");
        }
    }

    // Function to revert the logo back to compassIcon.png
    function changeLogoback() {
        if (compassLogo) {
            compassLogo.src = './compassIcon.png';
        } else {
            console.error("Element with ID 'compassLogo' not found.");
        }
    }

    // Add event listeners to the topBar element
    if (topBar) {
        topBar.addEventListener('mouseover', changeLogo);
        topBar.addEventListener('mouseout', changeLogoback);
    } else {
        console.error("Element with ID 'topBar' not found.");
    }

    // Function to populate the navigation bar with asset names
    function populateNav(data) {
        // Limit to the first 10 assets
        const firstTenAssets = data.slice(0, 10);

        // Clear the navBar before populating
        navBar.innerHTML = "";

        firstTenAssets.forEach(asset => {
            const navItem = document.createElement('p');
            navItem.textContent = asset.symbol; // Set the text content to the asset symbol
            navBar.appendChild(navItem); // Append the <p> element to the navBar

            // Add click event listener to update asset info
            navItem.addEventListener('click', () => {
                changeAssetInfo(asset);
            });
        });
    }

    // Function to update the asset name, symbol, and other details in the DOM
    function changeAssetInfo(asset) {
        if (name && symbol && symbol2 && image && assetDescription && assetPrice && assetMarketCap && assetVolume && assetChange && assetChangePercentage) {
            name.textContent = asset.name;
            symbol.textContent = asset.symbol;
            symbol2.textContent = asset.symbol;
            assetPrice.textContent = `$${parseFloat(asset.priceUsd).toFixed(2)}`;
            assetMarketCap.textContent = `$${parseFloat(asset.marketCapUsd).toFixed(2)}`;
            assetVolume.textContent = `$${parseFloat(asset.volumeUsd24Hr).toFixed(2)}`;
            assetChange.textContent = `$${parseFloat(asset.changePercent24Hr).toFixed(2)}`;
            assetChangePercentage.textContent = `${parseFloat(asset.changePercent24Hr).toFixed(2)}%`;
            image.src = `assetImages/${asset.name}.svg`;

            // Fetch and update the asset description
            const descriptionFilePath = `assetDescriptions/${asset.name}.txt`;
            fetch(descriptionFilePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text(); // Parse the response as plain text
                })
                .then(text => {
                    assetDescription.textContent = text; // Update the asset description with the file content
                })
                .catch(error => {
                    console.error('Error fetching asset description:', error);
                    assetDescription.textContent = "Description not available."; // Fallback message
                });
        } else {
            console.error("One or more required DOM elements are not found.");
        }
    }
});
