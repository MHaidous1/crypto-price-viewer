
document.addEventListener('DOMContentLoaded', function () {

    // Get the select element
    const cryptoSelect = document.getElementById('cryptoSelect');
    const cryptoDetailsDiv = document.getElementById('cryptoDetails');
    const iconElem = document.getElementById('cryptoIcon');

    const url = 'https://api.coincap.io/v2/assets';

    

    // Ensuring the select element exists before proceeding
    if (!cryptoSelect) {

        console.error('Select element not found!');
        return;

    }

    // Function to fetch cryptocurrency data
    function fetchCryptoData() {
        console.log(`Inside ${fetchCryptoData.name}`);

        fetch(url)
            .then(response => response.json())              // Convert response to JSON
            .then(json => loadCryptoData(json.data))        // Pass the 'data' array to loadCryptoData
            .catch(err => console.log('Error fetching data:', err));

    }

    // Function to load cryptocurrency data into the select element
    function loadCryptoData(cryptoData) {

        console.log(`Inside ${loadCryptoData.name}`);

        // Remove only the dynamically loaded options, keeping the "Select" option intact
        while (cryptoSelect.options.length > 1) {
            cryptoSelect.remove(1);  // Keep the first option (index 0, which is "Select")
        }


        cryptoData.forEach(crypto => {
            const opt = document.createElement('option');
            opt.text = crypto.name;         // Set the name of the cryptocurrency
            opt.value = crypto.id;          // Set the ID 
            cryptoSelect.options.add(opt);  // Add option to the select element
        });

    }

    // Event listener for when the selected cryptocurrency changes
    function onCryptoChange() {
        console.log(`Inside ${onCryptoChange.name}`);
        const selectedOption = cryptoSelect.options[cryptoSelect.selectedIndex].value;
        console.log(`Selected cryptocurrency ID: ${selectedOption}`);
    
        if (selectedOption) {
            // Log the URL you're about to call
            const fetchUrl = `https://api.coincap.io/v2/assets/${selectedOption}`;
            console.log(`Fetching details from URL: ${fetchUrl}`);
    
            fetch(fetchUrl)
                .then(response => {
                    // Log the HTTP status to ensure the API call was successful
                    console.log(`HTTP status: ${response.status}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Log the detailed data received for the selected cryptocurrency
                    console.log('Received data:', data);
    
                    // Call the function to display the data
                    displayCryptoDetails(data.data);
                })
                .catch(err => console.log('Error fetching specific crypto:', err));
        }
    }
    
    

    // Function to display the cryptocurrency details
        // Function to display the cryptocurrency details, including the icon
    function displayCryptoDetails(crypto) {
        if (!crypto) {
            console.error('No cryptocurrency data to display');
            return;
        }

        console.log('Displaying cryptocurrency details:', crypto);

        const nameElem = document.getElementById('cryptoName');
        const symbolElem = document.getElementById('cryptoSymbol');
        const supplyElem = document.getElementById('cryptoSupply');
        const priceElem = document.getElementById('cryptoPrice');
        const percentChangeElem = document.getElementById('cryptoPercentChange');
        const iconElem = document.getElementById('cryptoIcon');

        // Check if the required elements exist
        if (!nameElem || !symbolElem || !supplyElem || !priceElem || !percentChangeElem) {
            console.error('Some display elements are missing from the HTML');
            return;
        }

        // Update the text content of the HTML elements with the cryptocurrency data
        nameElem.innerText = `${crypto.name}`;
        symbolElem.innerText = `Symbol: ${crypto.symbol}`;
        supplyElem.innerText = `Supply: ${Math.round(crypto.supply)}`;
        priceElem.innerText = `Price (USD): $${parseFloat(crypto.priceUsd).toFixed(2)}`;

        const percentChange = parseFloat(crypto.changePercent24Hr).toFixed(2);
        percentChangeElem.innerText = `24h Change: ${percentChange}%`;

        // Dynamically set the cryptocurrency icon using the symbol (if available)
        const cryptoSymbol = crypto.symbol.toLowerCase();
        iconElem.src = `./node_modules/cryptocurrency-icons/svg/color/${cryptoSymbol}.svg`; // Use the SVG icon
        iconElem.alt = `${crypto.name} icon`;  // Set alt text for accessibility

        // Handle missing icons - hide image if it doesn't load
        iconElem.onerror = function() {
            this.style.display = 'none';  // Hide the icon if not found
        };

        // Show the icon if it's available
        iconElem.style.display = 'block';
    }

    
    

    // Attach event listener for the change event (hooks backend to frontend interface)
    cryptoSelect.addEventListener('change', onCryptoChange);

    // Fetch data when the DOM is fully loaded
    fetchCryptoData();
});
