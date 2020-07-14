let form = document.getElementById("form");
let input = document.getElementById("search-keyword");
let searchButton = document.getElementById("search-button");
let cardContainer = document.getElementById("card-container");

//Search bar and a button, keyword button-Completed in html line 9-13
console.log("line 8");
//Get the values in the search bar
searchButton.addEventListener("click", createCard);
console.log("line 11");
//When search button is clicked, createCard function is called to create a new card
function createCard(event) {
  event.preventDefault();
  let card = document.createElement("div");
  card.setAttribute("class", "card");

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  card.appendChild(cardBody);

  //Create the title for the card
  let title = document.createElement("h5");
  title.setAttribute("class", "card-title");
  title.textContent = input.value;
  cardBody.appendChild(title);

  // Create buttons for cards
  let button1 = document.createElement("button");
  button1.setAttribute("class", "btn btn-primary");
  button1.textContent = "Movie Button";
  cardBody.appendChild(button1);

  let button2 = document.createElement("button");
  button2.textContent = "Gifs Button";
  button2.setAttribute("class", "btn btn-primary");
  cardBody.appendChild(button2);

  //Append the cards to html page
  cardContainer.appendChild(card);

  //API Request http://www.omdbapi.com/?apikey=[yourkey]&
  fetch("http://www.omdbapi.com/?apikey=c0abe2e5&" + "s=" + "batman")
    .then((response) => response.json())
    .then((data) => handleMovies(data));

  // console.log(data["Search"][0]));

  //Second API Request for Gifs
  //with format: https://api.giphy.com/v1/gifs/search?api_key=1QIQZ2tszBBgdGd7J5k0FM0O67A68ZeM&q=batman&limit=12&offset=0&rating=pg&lang=en

  // TODO: change hardcoded "batman" to some search keyword
  fetch(
    "https://api.giphy.com/v1/gifs/search?api_key=1QIQZ2tszBBgdGd7J5k0FM0O67A68ZeM&q=" +
      "batman" +
      "&limit=12&offset=0&rating=pg&lang=en"
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}

//Create the html elements

function handleGiphys(data) {
  // Get each gif obj
  // Get the image value
}

// fetching the list of movies from the API
function handleMovies(data) {
  for (let i = 0; i < 12; i++) {
    if (i < data["Search"].length) {
      console.log(data["Search"][i]);
    }
  }
}
