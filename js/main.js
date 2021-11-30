let randomBtn = document.querySelector("#randomBtn");
let listContainer = document.querySelector("#listContainer");
let catSelect = document.querySelector("#catSelect");
let catBreedBtn = document.querySelector("#catBreedBtn");
let errorMessage = document.querySelector("#errorMessage");

/* 
https://docs.thecatapi.com/

API was used without an API-key.

First fetch is used to get a drop-down list of the different breeds.

Second fetch is used in connection with an eventlistener for the Breed Button. 
When pressed, uses the selected option value and grabs a picture and description of the breed.

Third fetch is used for a random picture or gif.
*/


async function fetchBreedDropDown() {
    try {
        let response = await fetch("https://api.thecatapi.com/v1/breeds");
        let data = await response.json();
        for (let catBreed of data) {
            catSelect.innerHTML += `<option value="${catBreed.id}">${catBreed.name}</option>`;
        };
    } catch (err) {
        errorMessage.innerHTML = "List of cats not available, check back later :("
        console.log(err);
    };
};

async function fetchCatBreedData() {
    if (catSelect.value == "none") {
        errorMessage.innerHTML = "You have to choose a breed :)";
    } else {
        errorMessage.innerHTML = "";
        try {
            let response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${catSelect.value}`);
            let data = await response.json();
            let image = document.createElement("img");
            let container = document.createElement("div");
            container.style.height = "470px";
            container.style.width = "470px";
            container.style.display = "inline-block";
            container.innerHTML += `<p>${data[0].breeds[0].description}</p>`;
            image.style.height = "470px";
            image.style.width = "470px";
            image.src = data[0].url;
            listContainer.append(container);
            container.append(image);
        } catch (err) {
            errorMessage.innerHTML = "Something went wrong, check back later :("
            console.log(err);
        };
    };
};

async function fetchRandomCat() {
    try {
        let response = await fetch("https://api.thecatapi.com/v1/images/search");
        let data = await response.json();
        let catData = data[0];
        let image = document.createElement("img");
        let container = document.createElement("div");
        container.style.height = "470px";
        container.style.width = "470px";
        container.style.display = "inline-block";
        image.style.height = "470px";
        image.style.width = "470px";
        image.src = catData.url;
        listContainer.append(container);
        container.append(image);
    } catch (err) {
        console.log(err);
        errorMessage.innerHTML = "Something went wrong, check back later :("
    };
};

fetchBreedDropDown();
catBreedBtn.addEventListener("click", fetchCatBreedData);
randomBtn.addEventListener("click", fetchRandomCat);