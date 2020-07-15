// Declare variables for interacting with html elements
let form = document.getElementById("form");
let input = document.getElementById("search-keyword");
let searchButton = document.getElementById("search-button");
let cardContainer = document.getElementById("card-container");

// Add event listener on the search button; when clicked, call a function to create cards with movies and giphys buttons
searchButton.addEventListener("click", createSearchCard);

// A callback function for a click event
//It creates multiple elements that make up a card and appends that to the card-container div
function createSearchCard(event) {
  event.preventDefault();
  // Create the card div
  let card = document.createElement("div");
  card.setAttribute("class", "card");

  // Create the card body div - put it inside of the card div
  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  card.appendChild(cardBody);

  // Create the title for the card - put it inside of the card body
  let title = document.createElement("h5");
  title.setAttribute("class", "card-title");
  title.textContent = input.value;
  cardBody.appendChild(title);

  // Create buttons for cards - put them inside of the card body (same level as the title)
  let button1 = document.createElement("button");
  button1.setAttribute("class", "btn btn-primary");
  button1.textContent = "Movie Button";
  cardBody.appendChild(button1);
  // Add an event listener to this button; when clicked call a function that handles movies api
  button1.addEventListener("click", handleMovies);

  let button2 = document.createElement("button");
  button2.textContent = "Giphys Button";
  button2.setAttribute("class", "btn btn-primary");
  cardBody.appendChild(button2);
  // Add an event listener to this button; when clicked call a function that handles giphy api
  button2.addEventListener("click", handleGiphys);

  // The entire card is complete - now, we append the card the card container in our html page
  cardContainer.appendChild(card);
}

// A callback function for a click event
// This function makes a GIPHY API call and sends data to another function that creates more cards
function handleGiphys(event) {
  event.preventDefault();

  // Get the text content of the button that was clicked so we can know how to handle later events
  let buttonIndicator = event.target.innerText;
  // Do a weird workaround to find the title text of an earlier created card
  // When button is clicked, we can get its parent
  let parentNode = event.target.parentNode;
  // After we have the parent, we can access the first child (a title element) and get its text content
  let searchKey = parentNode.childNodes.item(0).innerText;

  // Make an call to the giphy api - concatenate our search key into the url to retrieve our filtered object
  fetch(
    "https://api.giphy.com/v1/gifs/search?api_key=1QIQZ2tszBBgdGd7J5k0FM0O67A68ZeM&q=" +
      searchKey +
      "&limit=12&offset=0&rating=pg&lang=en"
  )
    .then((response) => response.json())
    // The api passes a data object into a function that creates cards
    .then((data) => createResultsCard(data, buttonIndicator));
}

// A callback function for a click event
// This function makes an OMDB API call and sends data to another function that creates more cards
function handleMovies(event) {
  event.preventDefault();
  // Get the text content of the button that was clicked so we can know how to handle later events
  let buttonIndicator = event.target.innerText;
  // Do a weird workaround to find the title text of an earlier created card
  // When button is clicked, we can get its parent
  let parentNode = event.target.parentNode;
  // After we have the parent, we can access the first child (a title element) and get its text content
  let searchKey = parentNode.childNodes.item(0).innerText;

  // Make an call to the omdb api - concatenate our search key into the url to retrieve our filtered object
  fetch("https://www.omdbapi.com/?apikey=c0abe2e5&" + "s=" + searchKey)
    .then((response) => response.json())
    // The api passes a data object into a function that creates cards
    .then((data) => createResultsCard(data, buttonIndicator));
}

// This function receives api data and uses that data to create more cards - each card has an image and a title
// This function also has a button indicator passed into it for deciding how to retrieve values from the data objects
function createResultsCard(data, buttonIndicator) {
  // Declare local variables that we use to inject content into elements we will create within each card
  let imgURL;
  let resultsTitle;

  // Check which button was clicked
  // If the title of the card whose button was clicked has text that starts with "G", assign giphy object values -
  // If it starts with "M", assign omdb object values
  if (buttonIndicator.startsWith("G")) {
    // Navigate through the giphy api json object when assigning these variables
    imgURL = data["data"][0]["images"]["original"]["url"];
    resultsTitle = data["data"][0]["title"];
  } else if (buttonIndicator.startsWith("M")) {
    // Navigate through the omdb api json object when assigning these variables
    imgURL = data["Search"][0]["Poster"];
    resultsTitle = data["Search"][0]["Title"];
  }

  let card = document.createElement("div");
  card.setAttribute("class", "card");

  // Create the image for the card - put it inside of the card div
  let img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  // Use the imgURL value that we retrieved from the api to set the src attribute for this image
  img.setAttribute("src", imgURL);
  card.appendChild(img);

  // Create the card body div - put it inside of the card div
  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  card.appendChild(cardBody);

  //Create the title for the card - put it inside of the card body
  let title = document.createElement("h5");
  title.setAttribute("class", "card-title");
  // Use the resultsTitle value that we retrieved from the api to set the text content for the title element
  title.textContent = resultsTitle;
  cardBody.appendChild(title);

  // The entire card is complete - now, we append the card the card container in our html page
  cardContainer.appendChild(card);
}
