var albumsList = [];
var searchTerm = null;
var offset = 0;

//DOMselectors
const albumSearch = document.querySelector("#album__search-action");
const albumContent = document.querySelector("#album__content");
const albumMoreBtn = document.querySelector("#album__search-more");

//setEvents
function addAlbumEvent() {
  albumSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    searchTerm = albumSearch.elements.query.value;

    if (searchTerm) {
      displayLoading();
      fetchJsonp(
        `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=20&offset=0`
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          albumArray = json.results;
          albums = albumArray;
          console.log(albums);
          hideLoading();
          renderAlbum(albums);
          albumMoreBtn.classList.remove("album__hide");
          offset = 20;
          console.log("initial offset: " + offset);
        });
      albumSearch.elements.query.value = "";
    }
  });
}

function moreBtnAlbumEvent() {
  albumMoreBtn.addEventListener("click", (e) => {
    if (searchTerm) {
      let searchURL = `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=10&offset=${offset}`;
      displayLoading();
      fetchJsonp(searchURL)
        .then((response) => response.json())
        .then((json) => {
          offset = offset + 10;
          // console.log(json);
          albumArray = json.results;
          albums = albumArray;
          // console.log(albums);
          hideLoading();
          renderAlbum(albums);
          // console.log("offset: " + offset);
          if (albums.length == 0) {
            alert("No more results");
            albumMoreBtn.classList.add("album__hide");
          } else if (albumsList.length > 49) {
            alert("You reached maximum capacity");
            albumMoreBtn.classList.add("album__hide");
          }
        });
    }
  });
}

// addAlbumEvent();
moreBtnAlbumEvent();

//loop over images
function renderAlbum(albums) {
  for (let i = 0; i < albums.length; i++) {
    // let startIndex = 0;

    if (albums[i].artworkUrl100) {
      //create elements
      const albumCard = document.createElement("div");
      const albumImage = document.createElement("img");
      const albumName = document.createElement("div");
      const albumLi = document.createElement("li");

      //set attributes
      albumCard.setAttribute("class", "album__content-card");
      albumName.setAttribute("class", "album__content-name");
      albumLi.setAttribute("class", "album__content-li");

      //content
      albumImage.src = albums[i].artworkUrl100;
      albumContent.append(albumLi);
      albumLi.append(albumCard);
      albumCard.appendChild(albumImage);
      albumName.innerText = albums[i].collectionCensoredName;
      albumCard.appendChild(albumName);
      albumsList.push(albums[i]);
    }
  }
  replaceAlbumHeader();
}
// <!-- loading spinner -->

//select DOM element
const albumInput = document.querySelector("#album__search-query");
const albumButton = document.querySelector("#album__search-button");
const albumHeader = document.querySelector("#album__header");

//selecting loading div
const loader = document.querySelector("#loading");

//adding event listener to button
albumButton.addEventListener("click", addAlbumEvent);
// albumMoreBtn.addEventListener("click", moreBtnAlbumEvent);

//showing loading
function displayLoading() {
  loader.classList.add("display");
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}

//hiding loading
function hideLoading() {
  loader.classList.remove("display");
}

// <!-- number of results -->

//replace album header
function replaceAlbumHeader() {
  albumHeader.innerText = `${albumsList.length} results for "${albumsList[0].artistName}"`;
}
