/* api 불러오기 */
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWNjY2I1ZDc3NmI5YjliYWU0NzQ5MmQyOGMxOWEzOCIsInN1YiI6IjY1OTNiNjI4MDY5ZjBlNDRhMjIxNTczNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rdMqnqX7eza-iQQfPXo0nv8mea9jvRHnGwwY8kNkMGs'
  }
};

const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KO&page=1&sort_by=popularity.desc';

/* api 호출 */
function getMovies() {
  fetch(url, options)
    .then(response => response.json())
    .then(data => showMovies(data.results))
    .catch(err => console.error(err));
}

getMovies();

const movieList = document.querySelector('.card-list'); // ul
const img_url = 'https://image.tmdb.org/t/p/w500';

/* 카드 api 추가 */
function showMovies(data) {
  for (let i = 0; i < data.length; i++) {
    let title = data[i]['title'];
    let overview = data[i]['overview'];
    let poster_path = data[i]['poster_path'];
    let vote_average = data[i]['vote_average'];
    let id = data[i]['id'];

    console.log()
    let temp_html = `
      <li class="movie-list" data-id="${id}">
        <a href="#">
          <img src="${img_url + poster_path}" alt="${title}">
          <div class="card-title-list">
              <h2>${title}</h2>
              <p class="average">- 평점 : ${vote_average}</p>
              <p>${overview}</p>
          </div>
        </a>
      </li>
    `;
    movieList.insertAdjacentHTML('beforeend',temp_html);
  }


  /* 검색창 버튼 클릭시*/
  let searchBtn = document.getElementById('search-btn');
  
  searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    let searchTxt = document.getElementById('search-text').value;
    let cards = document.querySelectorAll('.movie-list');

    for (let i =0; i<cards.length; i++){
      let title = cards[i]; //각각의 요소를 가지고왔음.
      // console.log(title);
      let titleList = title.querySelector('h2'); //title에있는 h2요소를 가져옴.
      // console.log(titleList);
      let results = titleList.textContent; //다시 textContent로 담음.
      console.log(results);
      
      if (!results.includes(searchTxt)) { //검색한내용 철자와 result(title)안에 있는 내용을 비교함
        cards[i].style.display = 'none';
      }else{
        //값이 하나라도 포함되어있으면
        cards[i].style.display = 'block';
      }
    }
  });


    /* 알럿창 만들기 */
    let movieId = document.querySelectorAll('.movie-list');

    for(let j=0; j<movieId.length; j++){
      movieId[j].addEventListener('click',function(e){
        e.preventDefault();
        console.log(movieId[j]);
        const result = movieId[j].getAttribute('data-id');
        alert(`ID명은 : ${result} 입니다.`);
      });
    }

}