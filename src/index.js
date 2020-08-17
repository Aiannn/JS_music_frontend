//#1 
//let num = Math.floor(Math.random()*100)
for (let num=1; num<6; num++)
//for (num; num<num+5; num++)
fetch(`http://localhost:3000/artists/${num}`)
.then(response => response.json())
.then(artist => {
    renderArtist(artist)
})


//#2
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
                <button id="fav">To Favorite</button>
            `
        artistItem.append(trackList) 
        })
    })
}




//#2 
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


//#3
document.addEventListener('click', e => {
    if (e.target.className === 'info') {
        getTracks(parseInt(e.target.parentNode.dataset.id))
    }
})