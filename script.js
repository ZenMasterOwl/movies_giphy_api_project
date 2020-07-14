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
  // Create buttons for cards
  let button1 = document.createElement("button");
  button1.textContent = "Movie Button";

  let button2 = document.createElement("button");
  button2.textContent = "Gifs Button";
  //Create the title for the card
  let title = document.createElement("p");
  title.textContent = input.value;
  card.appendChild(title);
  card.appendChild(button1);
  card.appendChild(button2);
  //Append the cards to html page
  cardContainer.appendChild(card);

  //API Request http://www.omdbapi.com/?apikey=[yourkey]&
  fetch("http://www.omdbapi.com/?apikey=c0abe2e5&" + "s=" + "batman")
    .then((response) => response.json())
    .then((data) => printMovies(data));

  // console.log(data["Search"][0]));
}

//Create the html elements

// fetching the list of movies from the API
function printMovies(data) {
  for (let i = 0; i < 12; i++) {
    if (i < data["Search"].length) {
      console.log(data["Search"][i]);
    }
  }
}
