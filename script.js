/*  GET ELEMENTS */

let menuButton = document.getElementById("menuButton");
let closeButton = document.getElementById("closeButton");
let sideMenu = document.getElementById("sideMenu");
let categoryList = document.getElementById("categoryList");
let categoryCards = document.getElementById("categoryCards");
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let mealCards = document.getElementById("mealCards");
let searchTitle = document.getElementById("searchTitle");



/* OPEN HAMBURGER  */

menuButton.addEventListener("click", function () {
    sideMenu.classList.add("active");
});



/*  CLOSE MENU  */

closeButton.addEventListener("click", function () {
    sideMenu.classList.remove("active");
});




/* CATEGORY API */


fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then(function (response) {
        return response.json();
    })

    .then(function (data) {

        /*  CATEGORY MENU  */

        data.categories.forEach(function (category) {

            categoryList.innerHTML += `

                <div class="category-item">

                    ${category.strCategory}

                </div>

            `;



            /*  CATEGORY CARD  */

            categoryCards.innerHTML += `

                <div class="col-3 mb-3">

                    <div
                        class="category-card"
                        data-category="${category.strCategory}"
                    >

                        <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
                        <div class="category-name">
                            ${category.strCategory}
                        </div>
                    </div>

                </div>

            `;


        });


    })


    .catch(function (error) {

        console.log("Category Error:", error);

    });



/* SEARCH MEALS */

let mealsSection = document.getElementById("mealsSection");


searchButton.addEventListener("click", function () {

    /* Get search value */

    let searchValue = searchInput.value.trim();

    /* Check empty input */

    if (searchValue === "") {
        alert("Please enter a meal name");
        return;
    }


    /* Show MEALS section */

    mealsSection.classList.add("show");

    /* Show loading */

    mealCards.innerHTML = `

        <div class="col-12">
            <p>Loading meals...</p>
        </div>

    `;

    /* API CALL */

    fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
    )

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            /* Clear previous meals */

            mealCards.innerHTML = "";

            /* Check if meals found */

            if (data.meals === null) {
                searchTitle.innerText = "MEALS";
                mealCards.innerHTML = `

                    <div class="col-12">
                        <p>
                            No meals found for "${searchValue}"
                        </p>
                    </div>

                `;

                return;

            }

            /* MEALS heading */

            searchTitle.innerText = "MEALS";

            /* Create meal cards */

            data.meals.forEach(function (meal) {
                mealCards.innerHTML += `

    <div class="mealAll">
        <div class="meal-card">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-category">
                ${meal.strCategory}
            </div>
            <div class="meal-info">
                <p>
                    ${meal.strArea}
                </p>
                <h3>
                    ${meal.strMeal}
                </h3>
            </div>
        </div>
    </div>

`;
            });
        })

        .catch(function (error) {
            console.log("Search Error:", error);
        });

});