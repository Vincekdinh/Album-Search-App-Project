const todolistCheckbox = document.querySelector(".btn-remove");
const todolistAddItem = document.querySelector(".add-item");
const todolistAddBtn = document.querySelector(".add-btn");

let albums = [];

//DOMselectors
const albumSearch = document.querySelector("#album_search--term");
const albumContent = document.querySelector(".content");

//setEvents
function addAlbumEvent() {
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
        renderAlbum(albums);
      });
    albumSearch.elements.query.value = "";
  });
}

addAlbumEvent();

//loop over images
function renderAlbum(albums) {
  albums.map(function (album) {
    if (album.artworkUrl100) {
      //selectors
      let card = document.createElement("div");
      let image = document.createElement("img");
      let albumName = document.createElement("div");

      //content
      image.src = album.artworkUrl100;
      albumContent.append(card);
      card.appendChild(image);
      albumName.innerText = album.collectionCensoredName;
      card.appendChild(albumName);
    }
  });
}
