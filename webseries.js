// 1. Web Series ka Database
const webSeriesDB = [
    { 
        id: 'panchayat-s3', 
        title: 'Panchayat Season 3', 
        thumb: 'images/panchayat.jpg', 
        episodes: 8 
    },
    { 
        id: 'mirzapur-s3', 
        title: 'Mirzapur Season 3', 
        thumb: 'images/mirzapur.jpg', 
        episodes: 10 
    }
];

const wsGrid = document.getElementById('videoGrid');

// 2. Web Series load karne ka function
function loadWebSeries() {
    if(!wsGrid) return; 
    
    wsGrid.innerHTML = '';
    webSeriesDB.forEach(vid => {
        // YAHAN FIX KIYA HAI: 'movie-card' ke sath 'show' class add kar di
        wsGrid.innerHTML += `
            <div class="movie-card show" data-title="${vid.title.toLowerCase()}">
                <img src="${vid.thumb}" alt="${vid.title}" loading="lazy">
                <div class="movie-info">
                    <h3 class="movie-title">${vid.title}</h3>
                    <p class="movie-year">Hindi Audio</p>
                    <div class="download-links" style="display: flex; gap: 10px; flex-direction: column;">
                        <button class="btn-download btn-fast" style="border: none; cursor: pointer; width: 100%; font-family: inherit;" 
                                onclick="window.open('episode-list.html?id=${vid.id}&type=download&episodes=${vid.episodes}', '_blank')">
                            ⚡ Fast Server
                        </button>
                        <button class="btn-download" style="background-color: #dc3545; color: white; border: none; cursor: pointer; width: 100%; padding: 10px; border-radius: 5px; font-weight: bold; font-family: inherit;" 
                                onclick="window.open('episode-list.html?id=${vid.id}&type=stream&episodes=${vid.episodes}', '_blank')">
                            📺 Watch Live
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Page load hote hi series dikhana
loadWebSeries();

// 3. Search Functionality (Enter dabane par)
function searchVideo(event) {
    if (event.key === 'Enter') {
        let filter = document.getElementById('searchInput').value.toLowerCase();
        let cards = document.getElementsByClassName('movie-card'); 
        let found = false;

        for (let i = 0; i < cards.length; i++) {
            let title = cards[i].getAttribute('data-title');
            if (title.indexOf(filter) > -1) {
                cards[i].style.display = "";
                found = true;
            } else {
                cards[i].style.display = "none";
            }
        }
        
        let noRes = document.getElementById('noResultMsg');
        if (noRes) {
            noRes.style.display = found ? "none" : "block";
        }
    }
}