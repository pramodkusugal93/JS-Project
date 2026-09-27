let menuButton = document.getElementById("menuButton");
let closeButton = document.getElementById("closeButton");
let sideMenu = document.getElementById("sideMenu");
let categoryList = document.getElementById("categoryList");
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
                    <a href="descpage.html?category=${category.strCategory}">${category.strCategory}</a>
                </div>
            `;

        });

    })


    .catch(function (error) {

        console.log("Category Error:", error);

    });


    
/* GET CATEGORY FROM URL */
let urlParams = new URLSearchParams(window.location.search);

let categoryName = urlParams.get("category");

console.log(categoryName);


/* HTML ELEMENTS */
let categoryTitle = document.getElementById("categoryTitle");

let categoryDescription =
    document.getElementById("categoryDescription");

let mealCards =
    document.getElementById("mealCards");


/* CATEGORY API */
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then(function (response) {

        return response.json();

    })

    .then(function (data) {

        data.categories.forEach(function (category) {

            if (category.strCategory === categoryName) {

                /* CATEGORY NAME */

                categoryTitle.innerText =
                    category.strCategory;


                /* CATEGORY DESCRIPTION */

                categoryDescription.innerText =
                    category.strCategoryDescription;

            }

        });

    })

    .catch(function (error) {

        console.log("Category Error:", error);

    });


/* MEALS API */
fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
)

    .then(function (response) {

        return response.json();

    })

    .then(function (data) {

        data.meals.forEach(function (meal) {

            mealCards.innerHTML += `

                <div>

                    <div class="card meal-card">

                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${meal.strMeal}
                            </h5>
                        </div>

                    </div>

                </div>

            `;

        });

    })

    .catch(function (error) {

        console.log("Meal Error:", error);

    });


