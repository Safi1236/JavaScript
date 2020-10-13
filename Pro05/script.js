// Getting DOM elemnets
const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleMoneyButton = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const totalButton = document.getElementById('calculate-total');

// Initilaizing Data Array
let data = [];

// Create initial user

generateRandomUser();
generateRandomUser();
generateRandomUser();
generateRandomUser();
generateRandomUser();

// Function to fetch Random User from API
// API: https://randomuser.me/api
async function generateRandomUser(){
   const res = await fetch('https://randomuser.me/api');
   const data = await res.json();
   
   const user = data.results[0];
   
   const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      worth: Math.round(Math.random() * 1000000)
   };

     addData(newUser);

    
}
// Function to Double  the net Worth

function doubleWorth(){
   data = data.map( item => {
      return { ...item , worth: item.worth * 2}
   } );
   updateDOM();

}

// Function to sort data
function sortRiches(){
   data.sort( (a, b) => b.worth - a.worth );

   updateDOM();
}

// Function to show Millionr
function showMillionaire(){
   data = data.filter(
   item => item.worth > 1000000
   );
   updateDOM();
}

// Function to calculate total wealth
function calculateTotal(){
   const totalWorth = data.reduce(
      (acc, item) => (acc += item.worth), 0
   );

   const netWorth = document.createElement('div');
   netWorth.innerHTML = `<h3>Total Net worth: <strong>${formatCurrency(totalWorth)}</strong></h3>`;
  main.appendChild(netWorth);
}

// Add newly generated user into the Data Array
function addData(newUser){
   data.push(newUser);

   updateDOM();
}

// Function to update the UI with DOM
function updateDOM(inputData = data){
    main.innerHTML = '<h2><strong>Name</strong> Net Worth</h2>';
    
    inputData.forEach( item => {
     const element =  document.createElement('div');
     element.classList.add('name');
     element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(item.worth)}`;
     main.appendChild(element);
    });

}

// Function to formate a number as a currency
function formatCurrency(num){
   return 'PKR' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listner
// 1. Add User Event
addUserButton.addEventListener('click', generateRandomUser);
// 2. Add double Money event listner
doubleMoneyButton.addEventListener('click', doubleWorth );

// 3. Add sort Event Lintner 
sortButton.addEventListener('click', sortRiches);

// 4. add show milinior event 
showMillionaires.addEventListener('click', showMillionaire); 

// 5. Add event to calculate total wealth

totalButton.addEventListener('click', calculateTotal);