"use strict";

movies.splice(100);

// ------ NORMALIZE ALL MOVIES--------//

const AllMovies = movies.map((movies) => {
    return {
        title: movies.title,
        year: movies.year,
        lang: movies.language,
        category: movies.categories,
        id: movies.imdbId,
        time: ` ${Math.floor(movies.runtime / 60)}h ${movies.runtime % 60}m`,
        summary: movies.summary,
        link: `https://www.youtube.com/embed/${movies.youtubeId}`,
        maxImg: movies.bigThumbnail,
        minIMG: movies.smallThumbnail,
        rating: movies.imdbRating,
    }
})



// ------------ RENDER MOVIES FUNCTION ------------//



function renderAllMovies() {
    AllMovies.forEach((el) => {
        const card = createElement('div', 'card shadow-lg', `
    <img src="${el.minIMG}" alt="img" class="card-img">
    <div class="card-body">
       <h4 class="card-title">
          ${el.title}   
       </h4>
       <ul class="list-unstyled">
       <li> <strong>Year:  ${el.year} </strong> </li>
       <li> <strong>Language:  ${el.lang} </strong></li>
       <li> <strong>Rating:   ${el.rating} </strong></li>
       <li> <strong>Category:  ${el.category} </strong></li>
       <li> <strong>Runtime:  ${el.time} </strong></li>
    </ul>
       <div class="social d-flex">
          <button class=" btn__1  m-1">
             Trailers
          </button>
          <button class=" btn__1 m-1">
             Read more ... 
          </button>
          <button class=" btn__1 m-1">
             Add bookmark
          </button>
       </div>
    </div>`);

        $('.wrapper').appendChild(card)

    })
}

renderAllMovies()



// ------------ FIND FILMS FUNCTION ------------ //



const findFilm = (regexp, rating) => {

    console.log(regexp);
    return AllMovies.filter((film) => {
        return film.title.match(regexp) && film.rating >= rating;
    })

}

//  ------------ FIND FILMS LISTENER ------------  //

$('#submitForm').addEventListener('submit', () => {

    $('.wrapper').innerHTML = 
    `
<h1 class="loader__title">
    <span class="let1">l</span>  
    <span class="let2">o</span>  
    <span class="let3">a</span>  
    <span class="let4">d</span>  
    <span class="let5">i</span>  
    <span class="let6">n</span>  
    <span class="let7">g</span>  
</h1>
    `;

    const searchValue = $('#filmName').value;
    const filmRating = $('#filmRating').value;

    const regexp = new RegExp(searchValue, "gi");
    const searchResult = findFilm(regexp, filmRating);



    setTimeout(() => {
        if (searchResult.length > 0) {
            searchResultsRender(searchResult);
            $('.card-res').classList.remove('d-none');

            if (searchResult.length == 1) {
                $('#res').innerHTML = `<strong >${searchResult.length}</strong> ta malumot toplidi`;
            } else {
                $('#res').innerHTML = `<strong >${searchResult.length}</strong> ta malumot toplidi`
            }
            if (searchValue.length === 0) {
                $('.card-res').classList.add('d-none');
            }

        } else {
            $('.card-res').classList.add('d-none');
            $('.wrapper').innerHTML = `<h1 class="text-center fond__title ">MALUMOT TOPILMADI</h1>`;
        }
    }, 2000)



})

function searchResultsRender(data = []) {
    $('.wrapper').innerHTML = ""
    data.forEach((el) => {
        const card = createElement('div', 'card shadow-lg', `
       
       <img src="${el.minIMG}" alt="img" class="card-img">
       <div class="card-body">
          <h4 class="card-title">
             ${el.title}   
          </h4>
          <ul class="list-unstyled">
             <li> <strong>Year:  ${el.year}   </strong>
             </li>
             <li> <strong>Language:  ${el.lang} </strong></li>
             <li> <strong>Rating:   ${el.rating} </strong></li>
             <li> <strong>Category:  ${el.category}  </strong></li>
             <li> <strong>Runtime:  ${el.time} </strong></li>
          </ul>
   
          <div class="social d-flex">
             <button class="btn btn-danger m-2">
                Trailers
             </button>
             <button class="btn btn-primary m-2">
                Read more . . .
             </button>
   
             <button class="btn btn-warning m-2">
                Add bookmark
             </button>
          </div>
       </div>`);

        $('.wrapper').appendChild(card)

    })
}