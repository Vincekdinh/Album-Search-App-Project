let albums = [];

//DOMselectors
const albumSearch = document.querySelector("#album__search-action");
const albumContent = document.querySelector("#album__content");

//setEvents
function addAlbumEvent() {
  displayLoading();
  albumSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = albumSearch.elements.query.value;
    fetchJsonp(
      `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=200`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        albumArray = json.results;
        albums = albumArray;
        console.log(albums);
        replaceAlbumHeader(albums);
        hideLoading();
        renderAlbum(albums);
      });
    albumSearch.elements.query.value = "";
  });
}

//addAlbumEvent();

//loop over images
function renderAlbum(albums) {
  return albums.map(function (album) {
    if (album.artworkUrl100) {
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
      albumImage.src = album.artworkUrl100;
      albumContent.append(albumLi);
      albumLi.append(albumCard);
      albumCard.appendChild(albumImage);
      albumName.innerText = album.collectionCensoredName;
      albumCard.appendChild(albumName);
    }
  });
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
function replaceAlbumHeader(albums) {
  albumHeader.innerText = `"${albums.length} results"`;
}
