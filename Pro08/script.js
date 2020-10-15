const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealContainer = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const selectedMeal = document.getElementById('selected-meal');

// Function to search meal from API and fetch the data
function searchMeal(e){
    e.preventDefault();

    // Get the search term from input field
    const term = search.value;

    // Check if search term exists
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;

            if(data.meals === null){
                resultHeading.innerHTML = `<p>There are no search results for '${term}'. Please try a different search</p>`
            } else{
                mealContainer.innerHTML = data.meals.map( meal =>`
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                    </div>
                ` )
                .join('');
            }
        })
    }
    else{
        alert("Please enter a valid search");
    }

    // Clear Search Term 
     search.value = '';
}

// Event Listner
// 1. Submit
submit.addEventListener('submit', searchMeal);