let form = document.getElementById("form");
let input = document.getElementById("search-keyword");
let searchButton = document.getElementById("search-button");
let cardContainer = document.getElementById("card-container");

//Search bar and a button, keyword button-Completed in html line 9-13

//Get the values in the search bar
searchButton.addEventListener("click", createSearchCard);

//When search button is clicked, createSearchCard function is called to create a new card
function createSearchCard(event) {
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
  button1.addEventListener("click", handleMovies);

  let button2 = document.createElement("button");
  button2.textContent = "Giphys Button";
  button2.setAttribute("class", "btn btn-primary");
  cardBody.appendChild(button2);
  button2.addEventListener("click", handleGiphys);

  //Append the cards to html page
  cardContainer.appendChild(card);
}

function createResultsCard(data, buttonIndicator) {
  // We assign the img URL differently depending on what the button indicator is
  let imgURL;
  let resultsTitle;

  if (buttonIndicator.startsWith("G")) {
    imgURL = data["data"][0]["images"]["original"]["url"];
    resultsTitle = data["data"][0]["title"];
  } else if (buttonIndicator.startsWith("M")) {
    imgURL = data["Search"][0]["Poster"];
    resultsTitle = data["Search"][0]["Title"];
  }

  let card = document.createElement("div");
  card.setAttribute("class", "card");

  let img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("src", imgURL);
  card.appendChild(img);

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  card.appendChild(cardBody);

  //Create the title for the card
  let title = document.createElement("h5");
  title.setAttribute("class", "card-title");
  // TODO: assign textcontent to movie names or gif names from api -completed?
  title.textContent = resultsTitle;
  cardBody.appendChild(title);

  cardContainer.appendChild(card);
}

function handleGiphys(event) {
  event.preventDefault();
  //api ormat: https://api.giphy.com/v1/gifs/search?api_key=1QIQZ2tszBBgdGd7J5k0FM0O67A68ZeM&q=batman&limit=12&offset=0&rating=pg&lang=en

  // let imgURLKey = data["data"]["url"];
  console.log(event.target.innerText);
  let buttonIndicator = event.target.innerText;
  let parentNode = event.target.parentNode;
  let searchKey = parentNode.childNodes.item(0).innerText;

  // TODO: change hardcoded "batman" to some search keyword
  fetch(
    "https://api.giphy.com/v1/gifs/search?api_key=1QIQZ2tszBBgdGd7J5k0FM0O67A68ZeM&q=" +
      searchKey +
      "&limit=12&offset=0&rating=pg&lang=en"
  )
    .then((response) => response.json())
    .then((data) => createResultsCard(data, buttonIndicator));

  // Get each gif obj
  // Get the image value
}

// fetching the list of movies from the API
function handleMovies(event) {
  event.preventDefault();
  let buttonIndicator = event.target.innerText;
  let parentNode = event.target.parentNode;
  let searchKey = parentNode.childNodes.item(0).innerText;

  //API Request http://www.omdbapi.com/?apikey=[yourkey]&
  fetch("http://www.omdbapi.com/?apikey=c0abe2e5&" + "s=" + searchKey)
    .then((response) => response.json())
    .then((data) => createResultsCard(data, buttonIndicator));

  // for (let i = 0; i < 12; i++) {
  //   if (i < data["Search"].length) {
  //     console.log(data["Search"][i]);
  //   }
  // }
}

/*
global scope {
  imgURL
  
            1 click search button
            2   creates cards
            3 click either movies or giphys button
            4   handleMovies
            5         create results cards()
            6               let imgURL = data["Search"][0].value          
                
            4*  handleGiphys
                  imgURL = data["data"][0]["URL"].value 
                      create results cards   
}
*/
