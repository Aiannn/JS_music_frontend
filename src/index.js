//#1 
for (let num=1; num<6; num++)
fetch(`http://localhost:3000/artists/${num}`)
.then(response => response.json())
.then(artist => {
    renderArtist(artist)
})


//#2
function getTracks(num) {
    fetch(`https://api.deezer.com/artist/${num}/top?limit=5`)
    .then(response => response.json())
    .then(tracklist => {
        // console.log(tracklist)
        tracklist.forEach(track => {//it doesn't work!!
            const artistItem = document.querySelector(`div[data-id=${num}]`)
            const trackList = document.createElement('ul')
            trackList.innerHTML = `
                <li>${track.title}</li>
                <li>${track.duration}</li>
                <li>${track.album}</li>
                <li>${track.release_date}</li>
                <li>${track.preview}</li>
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
        <img src = ${artist.picture_medium} >
        <p>top songs: ${artist.tracklist}</p>
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