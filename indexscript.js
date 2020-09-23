var MovieList = "";
var imdbid = '';
async function searchfunction(key) {
    if(key.keyCode === 13) {
        if(document.getElementById('MovieType').value === 'Movies')
            SearchMovie();
        if(document.getElementById('MovieType') === 'Songs'){
            alert('Songs Api is Missing');
        }
        if(document.getElementById('MovieType') === 'Web Series'){
            alert('Web Series is not Added');
        }
        console.log(document.getElementById('Input_Field').value);
    }
}

async function SearchBtn(){
    if(document.getElementById('MovieType').value === 'Movies'){
        SearchMovie();
    }
    if(document.getElementById('MovieType') === 'Songs'){
        alert('Songs Api is Missing');
    }
    if(document.getElementById('MovieType') === 'Web Series'){
        alert('Web Series is not Added');
    }
}

const SearchMovie = async () => {
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=3de1df4d&s='+document.getElementById('Input_Field').value.trim(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const Apidata = await response.json(); 
    console.log(Apidata);
    MovieList = Apidata;
    if(Apidata.Response === "True") {
        var divclass='<div class="row">';
        for(var i = 0; i < Apidata.Search.length; i++){
            if(Apidata.Search[i].Poster === "N/A" )
                divclass += '<div class="col" id="'+Apidata.Search[i].imdbID+'" style="background-color: silver; margin: 5px; text-align: center; padding-top: 10px; padding-bottom: 10px; border-radius: 10px;"><img src="NoMovie.jpg" alt="'+Apidata.Search[i].Title+'"><h3>'+Apidata.Search[i].Title+'</h3><button type="button" class="btn btn-info" onclick="MovieDetails('+i+')">Movie Details</button></div>';
            else
                divclass += '<div class="col" id="'+Apidata.Search[i].imdbID+'"style="background-color: silver; margin: 5px; text-align: center; padding-top: 10px; padding-bottom: 10px; border-radius: 10px;"><img src="'+Apidata.Search[i].Poster+'" alt="'+Apidata.Search[i].Title+'"><h3>'+Apidata.Search[i].Title+'</h3><button type="button" class="btn btn-info" onclick="MovieDetails('+i+')">Movie Details</button></div>';
        }
        document.getElementById('EnterMovieName').style.display='none';
        document.getElementById('Fill_Detaile').innerHTML = divclass+"</div>";
    } 
    else {
        alert(Apidata.Error);
    }
}


const MovieDetails = async (Movieindex) => {
    console.log(Movieindex);
    console.log(MovieList["Search"][Movieindex].imdbID);
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=3de1df4d&i='+MovieList["Search"][Movieindex].imdbID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const particularMovieJson = await response.json(); 
    //const particularMovieJson = JSON.parse('{"Title":"OMG: Oh My God!","Year":"2012","Rated":"Not Rated","Released":"28 Sep 2012","Runtime":"125 min","Genre":"Comedy, Drama, Fantasy","Director":"Umesh Shukla","Writer":"Bhavesh Mandalia (screenplay and dialogue), Umesh Shukla (screenplay)","Actors":"Paresh Rawal, Akshay Kumar, Mithun Chakraborty, Mahesh Manjrekar","Plot":"A shopkeeper takes God to court when his shop is destroyed by an earthquake.","Language":"Hindi, English","Country":"India","Awards":"6 wins & 10 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMGNhYjUwNmYtNDQxNi00NDdmLTljMDAtZWM1NDQyZTk3ZDYwXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.1/10"},{"Source":"Rotten Tomatoes","Value":"74%"}],"Metascore":"N/A","imdbRating":"8.1","imdbVotes":"48,948","imdbID":"tt2283748","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"Grazing Goat Pictures, Viacom 18 Motion Pictures, Playtime","Website":"N/A","Response":"True"}')
    console.log(particularMovieJson);
    
    document.getElementById('moviedetails').style.display = 'block';
    document.getElementById('genre').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;">Genre:</span> &nbsp;'+particularMovieJson.Genre;
    document.getElementById('released').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;">Released:</span> &nbsp;'+particularMovieJson.Released;
    document.getElementById('rated').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;">Rated:</span> &nbsp;'+particularMovieJson.Rated;
    document.getElementById('imdb').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;">IMBD Rating:</span> &nbsp;'+particularMovieJson.imdbRating;
    document.getElementById('writer').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;">Writer:</span> &nbsp;&nbsp;'+particularMovieJson.Director;
    document.getElementById('director').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;">Director:</span> &nbsp;&nbsp;'+particularMovieJson.Writer;
    document.getElementById('actors').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;">Actors:</span> &nbsp;&nbsp;'+particularMovieJson.Actors;
    document.getElementById('plot').innerHTML = particularMovieJson.Plot;
    document.getElementById('image').src = particularMovieJson.Poster;
}
//