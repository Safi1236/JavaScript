// Getting elements from DOM
const currency_one_picker = document.getElementById('currency-one');
const currency_two_picker = document.getElementById('currency-two');
const currOneAmount = document.getElementById('amount-one');
const currTwoAmount = document.getElementById('amount-two');
const flipButton = document.getElementById('flip');
const rate = document.getElementById('rate');

// Fetch Exchange Rate 3rd party API and update DOM
// https://app.exchangerate-api.com/
function calculate(){
    const currency_one_code= currency_one_picker.value;
    const currency_two_code = currency_two_picker.value;
    
    fetch(`https://v6.exchangerate-api.com/v6/00a3228118516a11803a3a58/latest/${currency_one_code}`)
    .then( res => res.json() )
    .then( data => {
        // Get the exchange rate from API version 
        const exchangeRate = data.conversion_rates[currency_two_code];
        
        //Display the conversion rate 
        rate.innerText = `1 ${currency_one_code} = ${exchangeRate} ${currency_two_code}`;

        // Apply conversion Rate adn update amount 
        currTwoAmount.value = (currOneAmount.value * exchangeRate).toFixed(2);
        
    });

}

// Flip Function for flip function
function flip(){
    const temp = currency_one_picker.value;
    currency_one_picker.value = currency_two_picker.value;
    currency_two_picker.value = temp;
    calculate();

};

// Event Listeners 
currency_one_picker.addEventListener('change', calculate);
currency_two_picker.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate);
currTwoAmount.addEventListener('input',calculate);
flipButton.addEventListener('click', flip);

calculate();