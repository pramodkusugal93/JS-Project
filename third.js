/* GET ELEMENTS */

let menuButton = document.getElementById("menuButton");
let closeButton = document.getElementById("closeButton");
let sideMenu = document.getElementById("sideMenu");
let categoryList = document.getElementById("categoryList");

let mealDetails = document.getElementById("mealDetails");
let detailCategoryCards = document.getElementById("detailCategoryCards");


/* OPEN HAMBURGER */

menuButton.addEventListener("click", function () {
    sideMenu.classList.add("active");
});


/* CLOSE MENU */

closeButton.addEventListener("click", function () {
    sideMenu.classList.remove("active");
});


/* GET MEAL ID FROM URL */

let urlParams = new URLSearchParams(window.location.search);
let mealId = urlParams.get("id");



/* LOAD CATEGORY MENU */

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        data.categories.forEach(function (category) {

            categoryList.innerHTML += `
                <div class="category-item">
                    <a href="descpage.html?category=${category.strCategory}">
                        ${category.strCategory}
                    </a>
                </div>
            `;

            detailCategoryCards.innerHTML += `
                <div class="col-6 col-md-4 col-lg-3 col-xl-2 mb-3">

                    <div
                        class="category-card"
                        onclick="openCategory('${category.strCategory}')"
                    >

                        <img
                            src="${category.strCategoryThumb}"
                            alt="${category.strCategory}"
                        >

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

/* OPEN CATEGORY PAGE */

function openCategory(categoryName) {
    window.location.href =
        `descpage.html?category=${encodeURIComponent(categoryName)}`;
}


/* CHECK MEAL ID */

if (!mealId) {

    mealDetails.innerHTML = `
        <p>Meal not found. Please select a meal from the previous page.</p>
    `;

}
else {

    /* FETCH MEAL DETAILS */

    fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(mealId)}`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            if (!data.meals) {
                mealDetails.innerHTML = "<p>Meal not found.</p>";
                return;
            }

            let meal = data.meals[0];


            /* GET INGREDIENTS AND MEASUREMENTS */

            let ingredientsHTML = "";

            for (let i = 1; i <= 20; i++) {

                let ingredient = meal["strIngredient" + i];
                let measure = meal["strMeasure" + i];

                if (ingredient && ingredient.trim() !== "") {

                    ingredientsHTML += `
                        <div class="ingredient-item">
                            <i class="fa-solid fa-check"></i>
                            <span>${ingredient}</span>
                        </div>
                    `;

                }
            }


            /* GET MEASUREMENTS */

            let measurementsHTML = "";

            for (let i = 1; i <= 20; i++) {

                let ingredient = meal["strIngredient" + i];
                let measure = meal["strMeasure" + i];

                if (ingredient && ingredient.trim() !== "") {

                    measurementsHTML += `
                        <div class="measure-item">
                            <span>${measure || "As required"}</span>
                            <span>${ingredient}</span>
                        </div>
                    `;

                }
            }


            /* GET TAGS */

            let tagsHTML = "";

            if (meal.strTags) {

                meal.strTags.split(",").forEach(function (tag) {
                    tagsHTML += `<span class="meal-tag">${tag}</span>`;
                });

            }
            else {
                tagsHTML = "<span>No tags available</span>";
            }


            /* SHOW MEAL DETAILS */

            mealDetails.innerHTML = `

                <div class="meal-detail-card">

                    <div class="meal-detail-top">

                        <div class="meal-detail-image">
                            <img
                                src="${meal.strMealThumb}"
                                alt="${meal.strMeal}"
                            >
                        </div>

                        <div class="meal-detail-info">

                            <h3>${meal.strMeal}</h3>

                            <p>
                                <strong>Category:</strong>
                                ${meal.strCategory || "Not available"}
                            </p>

                            <p>
                                <strong>Area:</strong>
                                ${meal.strArea || "Not available"}
                            </p>

                            <p>
                                <strong>Tags:</strong>
                                <span class="tags-container">
                                    ${tagsHTML}
                                </span>
                            </p>

                            <h4>Ingredients</h4>

                            <div class="ingredients-list">
                                ${ingredientsHTML}
                            </div>

                        </div>

                    </div>


                    <div class="meal-measures">

                        <h4>Measure</h4>

                        <div class="measure-list">
                            ${measurementsHTML}
                        </div>

                    </div>


                    <div class="meal-instructions">

                        <h4>Instructions</h4>

                        <div class="instructions-text">
                            ${meal.strInstructions
                                ? meal.strInstructions
                                    .split(/\r?\n/)
                                    .filter(function (step) {
                                        return step.trim() !== "";
                                    })
                                    .map(function (step) {
                                        return `<p>${step}</p>`;
                                    })
                                    .join("")
                                : "<p>No instructions available.</p>"
                            }
                        </div>

                        ${
                            meal.strYoutube
                                ? `<a
                                    href="${meal.strYoutube}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="youtube-button"
                                >
                                    <i class="fa-brands fa-youtube"></i>
                                    Watch Recipe
                                </a>`
                                : ""
                        }

                    </div>

                </div>

            `;

        })
        .catch(function (error) {

            console.log("Meal Details Error:", error);

            mealDetails.innerHTML = `
                <p>Unable to load meal details. Please try again.</p>
            `;

        });

}