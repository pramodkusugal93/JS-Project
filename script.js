

let menuButton = document.getElementById("menuButton");

let closeButton = document.getElementById("closeButton");

let sideMenu = document.getElementById("sideMenu");

let categoryList = document.getElementById("categoryList");

let categoryCards = document.getElementById("categoryCards");

let search = document.getElementById('searchInput');

let categories = [];



menuButton.addEventListener("click", function () {

    sideMenu.classList.add("active");

});




closeButton.addEventListener("click", function () {

    sideMenu.classList.remove("active");

});




fetch("https://www.themealdb.com/api/json/v1/1/categories.php")


    .then(function (response) {

        return response.json();

    })


    .then(function (data) {


        



         categories = data.categories;
        categories.forEach(function (category) {


            categoryList.innerHTML += `

                <div
                    class="category-item"
                    data-category="${category.strCategory}"
                >

                    ${category.strCategory}

                </div>

            `;



            /*  CATEGORY CARD */

            categoryCards.innerHTML += `

                <div class="col-3 mb-3">

                    <div
                        class="category-card"
                        data-category="${category.strCategory}"
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

        console.log("Error:", error);

    });


// search item


// let categories = document.getElementById('categories')

search.addEventListener('input',()=>{
    let values = search.value.toLowerCase();

    categoryCards.innerHTML = "";

    categories.forEach((product)=>{
        if (product.strCategory.toLowerCase().includes(values)) {

            categoryCards.innerHTML += `

                <div class="col-3 mb-3">

                    <div
                        class="category-card"
                        data-category="${product.strCategory}"
                    >

                        <img
                            src="${product.strCategoryThumb}"
                            alt="${product.strCategory}"
                        >


                        <div class="category-name">

                            ${product.strCategory}

                        </div>

                    </div>

                </div>

            `;
        }
    })

})





