//#1 
for (let num=1; num<6; num++)
fetch(`http://localhost:3000/artists/${num}`)
.then(response => response.json())
.then(artist => {
    renderArtist(artist)
})

//#2
const songItems = document.querySelector('.favs-list')
function renderFavs() {
    fetch('http://localhost:3000/favorites')
    .then(response => response.json())
    .then(favs => {
        favs.forEach(fav => {
            console.log(fav)
            const songItem = document.createElement('li')
            songItem.innerText = fav.song.title
            songItems.append(songItem)
        })
    })
}





//#3
function getTracks(num) {
    fetch(`http://localhost:3000/songs/${num}`) 
    .then(response => response.json())
    .then(tracklist => {
        tracklist.data.forEach(track => {
            const artistItem = document.querySelector(`div[data-id="${num}"]`)
            const trackList = document.createElement('ul')
            trackList.innerHTML = `
                <li>${track.title}</li>
                <li>${track.duration}</li>
                <li>${track.album.title}</li>
                <li>${track.release_date}</li>
                <li><audio id="audio" src=${track.preview} controls></li>
                <button class="fav">To Favorite</button>
            `
        artistItem.append(trackList) 
        })
    })
}




//#4
const artistList = document.querySelector("#songs-collection")
function renderArtist(artist) {
    const artistItem = document.createElement('div')
    artistItem.innerHTML = `
        <p>${artist.name}</p>
        <img src = ${artist.picture_medium}>
        <button class='info'>INFO</button>
    `
    artistItem.dataset.id = artist.id
    artistList.append(artistItem)
}


//#5
document.addEventListener('click', e => {
    if (e.target.className === 'info') {
        getTracks(parseInt(e.target.parentNode.dataset.id))
    }
})


//#6 
document.addEventListener('click', e => {
    if (e.target.className === "fav") {
        let body = {
            title: e.target.parentNode.children[0].innerText,
            duration: e.target.parentNode.children[1].innerText,
            album: e.target.parentNode.children[2].innerText,
            preview: e.target.parentNode.children[4].children[0].src
        }
        const obj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch(`http://localhost:3000/favorites`, obj)
        .then(response => response.json()) 
        .then(object => {
            console.log(object)
            const songItem = document.createElement('li')
            songItem.innerText = object.title
            songItems.append(songItem)
        })
    }
})

renderFavs()