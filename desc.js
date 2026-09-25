let menuButton = document.getElementById("menuButton");
let closeButton = document.getElementById("closeButton");
let categoryCards = document.getElementById("categoryCards");
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

                    <a href="">${category.strCategory}</a>

                </div>

            `;


        });


    })


    .catch(function (error) {

        console.log("Category Error:", error);

    });
