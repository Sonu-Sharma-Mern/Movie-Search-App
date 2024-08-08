const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
  
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


   const getMovies = async (URL) => {
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        } else {
            const data = await response.json()
            showMovies(data.results)
        }
        
    } catch (error) {
        console.error("Error:",error.message);
        
    }
  }

  const languageMap = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'hi': 'Hindi'
    // Add more language codes and their full names as needed
};


  const showMovies =  (movies) => {
    const main = document.getElementById("main")
    main.innerHTML = ""
    movies.forEach(movie => {
        console.log(movie);
        const createDiv = document.createElement("div")
        createDiv.classList.add("movie")
        const {poster_path, title, overview, vote_average, release_date, original_language} = movie
        const language = languageMap[original_language] || original_language; // Fallback to code if not found!
        createDiv.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="movie-info">
                <h4>Released on ${release_date}</h4>
            </div>
            <div class="movie-info">
                <h4>Language: ${language}</h4>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            <div>`;
        main.appendChild(createDiv)
        
    });
  }

  getMovies(APIURL)

  const getClassByRate = (vote) => {
    if(vote >= 10){
        return "green"
    }else if(vote >=6){
        return "orange"
    } else{
        return "yellow"
    }
  }



// const form = document.getElementById("form")
const search = document.getElementById("search")
const btn = document.getElementById("btn")

btn?.addEventListener("click", (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if(searchTerm === ""){
        alert("Please Enter the Movie Name...");
    }else{
        console.log(searchTerm);
        getMovies(SEARCHAPI + searchTerm)
        search.value = ""
    }
})