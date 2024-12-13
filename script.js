const apiKey = "d0e17c08c38f394ab85ec3b145015006";

function fetchMovies(searchText) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}&language=en-US&include_adult=false&include_video=false`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        document.querySelector(".row").innerHTML = `
        <h1>Tidak Ada Bro!</h1>`
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
        let card = ``;
        let cards = data.results;
        console.log(cards)
        if (cards.length == 0) {
            document.querySelector(".row").innerHTML =  `
            <h1>TIDAK ADA BRO!, CARI YANG LAIN</h1>`
        }
      for (let i = 0; i < cards.length; i++) {
        card += `
         <div class="card">
                <img alt="gambar.jpg" 
                    src="https://image.tmdb.org/t/p/w500${
                      cards[i].poster_path
                    }"/>
                <div class="card-content">
                    <div class="card-title">
                        ${cards[i].title.toUpperCase()}
                    </div>
                    <div class="card-description">
                      ${cards[i].overview}
                    </div>
                    <button onclick='tonton()' class='btn-prank'>Nonton?</button>
                </div>
            </div>
        `;
        document.querySelector(".row").innerHTML = card;
        document.getElementById("userInput").value = '';
      }

    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}

document.getElementById("cari").addEventListener("click", () => {
  const userInput = document.getElementById("userInput").value;

  fetchMovies(userInput);
});

//Tampilan awal
function tampilanAwal() {
  const row = document.querySelector(".row");

  const movie = fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=d0e17c08c38f394ab85ec3b145015006&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
  )
    .then((data) => {
      return data.json();
    })
    .then((movie) => {
      let cards = movie.results;
      console.log(cards[0]);
      let card = ``;
      for (let i = 0; i < cards.length; i++) {
        card += `
         <div class="card">
                <img alt="gambar.jpg" 
                    src="https://image.tmdb.org/t/p/w500${
                      cards[i].poster_path
                    }"/>
                <div class="card-content">
                    <div class="card-title">
                        ${cards[i].title.toUpperCase()}
                    </div>
                    <div class="card-description">
                      ${cards[i].overview}
                    </div>
                      <button onclick='tonton()' class='btn-prank'>Nonton?</button>
                </div>
            </div>
        `;
        row.innerHTML = card;
      }
    });
}

tampilanAwal();

 // hamburger menu
document.getElementById('hamburger').addEventListener('click', function() {
    const menu = document.getElementById('menu');

    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});

function tonton() {
    alert('Karena Ini Hanya Demo Kamu Gak Bisa Nonton, .....')
}