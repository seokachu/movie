/* api 불러오기 */
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWNjY2I1ZDc3NmI5YjliYWU0NzQ5MmQyOGMxOWEzOCIsInN1YiI6IjY1OTNiNjI4MDY5ZjBlNDRhMjIxNTczNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rdMqnqX7eza-iQQfPXo0nv8mea9jvRHnGwwY8kNkMGs'
    }
};

const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KO&page=1&sort_by=popularity.desc';
const myAPI_KEY = '&api_key=99cccb5d776b9b9bae47492d28c19a38';

/* api 호출 */
function getMovies() {
    fetch(url, options)
        .then(response => response.json())
        .then(data => showMovies(data.results))
        .catch(err => console.error(err));
}
getMovies();



// 변수 선언
const movieListContainer = document.querySelector('.card-list'); // ul
const img_url = 'https://image.tmdb.org/t/p/w500';

/* 영화 이미지, 타이틀, 내용 불러오기 */
function showMovies(data) {

    console.log(data);
    data.forEach((movie) => {
        const { id, title, poster_path, overview, vote_average } = movie; //각각 객체를 movie라는 이름으로 받아와서 사용함.(객체분해할당해줬음)
        const movieList = document.createElement('li');
        movieList.classList.add('movie-list');
        movieList.innerHTML = `
            <a href="#" data-id="${id}">
                <img src="${img_url + poster_path}" alt="${title}">
                <div class="card-title-list">
                    <h2>${title}</h2>
                    <p class="average">- 평점 : ${vote_average}</p>
                    <p>${overview}</p>
                </div>
            </a>
        `;
        movieListContainer.appendChild(movieList);
    });
 
    // 클릭시 id 알럿창 띄우기
    const movieId = document.querySelectorAll('.movie-list a'); //li a

    movieId.forEach( id => {
        id.addEventListener('click', function (e) {
            e.preventDefault();
            const result = id.getAttribute('data-id');
            alert(`ID명은 ${result} 입니다.`);
            console.log("ID명은",result,"입니다.");
        });
    });
}


/* 영화검색창 보이기 */
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click',function(){
    let searchTxt = document.getElementById('search-text').value;
    let card = document.querySelectorAll('.card-list > li > a');
    console.log(card);

    for (let i = 0; i < card.length; i++) {
        let title = card[i].querySelector('h2').textContent;
        console.log(title);
    }
    //검색어로 영화를 검색하기
    // console.log(val);
    // showMovies(val);


});