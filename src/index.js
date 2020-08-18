//#1 
//let num = Math.floor(Math.random()*100)
for (let num=1; num<50; num++)
//for (num; num<num+5; num++)
fetch(`http://localhost:3000/artists/${num}`)
.then(response => response.json())
.then(artist => {renderArtist(artist)})


//#2
function getTracks(num) {
    fetch(`http://localhost:3000/songs/${num}`) 
    .then(response => response.json())
    .then(tracklist => {
        tracklist.data.forEach(track => {
            const artistItem = document.querySelector(`div[data-id="${num}"]`)
            const trackList = document.createElement('ul')
            trackList.innerHTML = `
                 <h3>Title: ${track.title}</h3> 
                 <h4>Album: ${track.album.title}</h4>
                <h6><audio id="audio" src=${track.preview} controls> </h6>  
                <button id="fav"> ❤ </button>
            `
            artistItem.append(trackList) 
        })
    })
}




//#2 
const artistList = document.querySelector("#songs-collection")
function renderArtist(artist) {
    const artistItem = document.createElement('div')
    artistItem.className = 'artist-card'
    artistItem.innerHTML = `
        <h2>${artist.name}</h2>
        <img src = ${artist.picture_medium}>
        <br>
        <button class='info'>Top Hits !</button>
    `
    artistItem.dataset.id = artist.id
    artistList.append(artistItem)
}

    function addFavorite(){
        const favoritesUl = document.getElementById('playlist')
        console.log(favoritesUl)



    }


//#3
document.addEventListener('click', e => {
    if (e.target.className === 'info') {
        getTracks(parseInt(e.target.parentNode.dataset.id))
    }
})