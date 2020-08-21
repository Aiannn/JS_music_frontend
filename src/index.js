//#1 Fetching from artist show page and render the artists
for (let num=1; num<13; num++) //12 times make request
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




//#4 Just rendering artists
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


//#5 click -> show ; click -> hide
document.addEventListener('click', e => {
    if (e.target.className === 'info') {
        getTracks(parseInt(e.target.parentNode.dataset.id))
        e.target.className = 'hide'                     
    }                                                   
    else if (e.target.className === 'hide') {     //I think it's not good practice to remove objects and then again make request, but we're running out of time            
        e.target.parentNode.children[3].remove()   //the reason I delete just one object is that it's not one object, when i delete an object #3 the next object becomes #3
        e.target.parentNode.children[3].remove() 
        e.target.parentNode.children[3].remove() 
        e.target.parentNode.children[3].remove() 
        e.target.parentNode.children[3].remove()               
        e.target.className = 'info'                      
    }                                                   
})



//#6 Post request to rails server, adding to favorite (at the backend it creates new song instance with body params and then creates a favorite instance and then renders this song instance as json)
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

//#7 delete from favorites 
document.addEventListener('click', e => {
    if (e.target.className === 'remove-fav') {
        num = parseInt(e.target.parentNode.dataset.song_id)
        fetch(`http://localhost:3000/tracks/${num}`, {
            method: 'DELETE'
        })
        e.target.parentNode.remove()
    }
})

//#8 Search Bar directly from API 
const searchBar = document.getElementById("searchbar")
const searchResults = document.querySelector('#search-results')
searchBar.addEventListener('keyup', e => {
    const searchString = e.target.value 
    const name = searchString
    fetch(`https://api.deezer.com/artist/${name}`)
    .then(response => response.json()) 
    .then(artist => {
        searchResults.innerHTML = `
        <span>${artist.name}</span>
        <img class="search-pics" src = ${artist.picture_medium}>
        <button class='info-from-search'>Top Tracks</button>
        `
        searchResults.dataset.artist_id = artist.id
    })
})

//#9 get request to find top5 songs of specific artist and then rendering
document.addEventListener('click', e => {
    if (e.target.className === 'info-from-search') {
        const num = parseInt(e.target.parentNode.dataset.artist_id)
        fetch(`http://localhost:3000/songs/${num}`)
        .then(response => response.json())
        .then(tracklist => {
            tracklist.data.forEach(track => {
                const searchResult = document.querySelector('#search-results')
                const tracklist = document.createElement('div')
                tracklist.innerHTML = `
                    <span>${track.title}</span> <span>|</span>
                    <span>${Math.floor((track.duration)/60)}:${track.duration%60}</span> <span>|</span>
                    <span>${track.album.title}</span> <span>|</span>
                    <audio id="audio" src=${track.preview} controls></audio>
                    <button class="fav">To Favorite</button>
                `
                searchResult.append(tracklist)
            })
        })
    }
})

renderFavs()