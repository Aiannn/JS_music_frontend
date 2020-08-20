//#1 Fetching from artist show page and render the artists
for (let num=1; num<10; num++)
fetch(`http://localhost:3000/artists/${num}`)
.then(response => response.json())
.then(artist => {
    renderArtist(artist)
})

//#2 Fetching the favorites and render the favorites
const songItems = document.querySelector('.menuview')
function renderFavs() {
    fetch('http://localhost:3000/favorites')
    .then(response => response.json())
    .then(favs => {
        favs.forEach(fav => {
            const songItem = document.createElement('div')
            songItem.innerHTML = `
            ${fav.song.title}
            <audio src=${fav.song.preview} controls></audio>
            <button class="remove-fav">Remove</button>
        `
            songItem.dataset.song_id = fav.song.id 
            songItems.append(songItem)
        })
    })
}





//#3 Fetching the songs and rendering songs
function getTracks(num) {
    fetch(`http://localhost:3000/songs/${num}`) //num is artist_id (look up at songs controller)
    .then(response => response.json())          // so this fetch gives you a top 5 songs (not just 1 song)
    .then(tracklist => {
        tracklist.data.forEach(track => {
            const artistItem = document.querySelector(`div[data-id="${num}"]`)
            const trackList = document.createElement('div')
            trackList.innerHTML = `
                <span>${track.title}</span> <br>
                <span>${Math.floor((track.duration)/60)}:${track.duration%60}</span> <br>
                <span>${track.album.title}</span> <br>
                <audio id="audio" src=${track.preview} controls></audio>
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
        <button class='info'>Top Tracks</button>
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
            duration: e.target.parentNode.children[2].innerText,
            album: e.target.parentNode.children[4].innerText,
            preview: e.target.parentNode.children[6].src
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
            const songItem = document.createElement('div')
            songItem.innerHTML = `
                ${object.title}
                <audio src=${object.preview} controls></audio>
                <button class="remove-fav">Remove</button>
            `
            songItem.dataset.song_id = object.id 
            songItems.append(songItem)
        })
    }
})

//#7
document.addEventListener('click', e => {
    if (e.target.className === 'remove-fav') {
        num = parseInt(e.target.parentNode.dataset.song_id)
        fetch(`http://localhost:3000/tracks/${num}`, {
            method: 'DELETE'
        })
        e.target.parentNode.remove()
    }
})

//# ATTEMPT TO MAKE A SEARCH BAR 
// const searchBar = document.getElementById("searchBar")
// searchBar.addEventListener('keyup', e => {
//     const searchString = e.target.value 
// })


// fetch(`http://localhost:3000/artists/${num}`)






renderFavs()