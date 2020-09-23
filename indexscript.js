var MovieList = "";
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
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=85231d93&s='+document.getElementById('Input_Field').value.trim(), {
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
                divclass += '<div class="col" style="background-color: silver; margin: 5px; text-align: center; padding-top: 10px; padding-bottom: 10px; border-radius: 10px;"><img src="NoMovie.jpg" alt="'+Apidata.Search[i].Title+'"><h3>'+Apidata.Search[i].Title+'</h3><button type="button" class="btn btn-info" onclick="MovieDetails('+i+')">Movie Details</button></div>';
            else
                divclass += '<div class="col" style="background-color: silver; margin: 5px; text-align: center; padding-top: 10px; padding-bottom: 10px; border-radius: 10px;"><img src="'+Apidata.Search[i].Poster+'" alt="'+Apidata.Search[i].Title+'"><h3>'+Apidata.Search[i].Title+'</h3><button type="button" class="btn btn-info" onclick="MovieDetails('+i+')">Movie Details</button></div>';
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
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=85231d93&i='+MovieList["Search"][Movieindex].imdbID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const particularMovieJson = await response.json(); 
    console.log(particularMovieJson);
    
    document.getElementById('moviedetails').style.display = 'block';
    document.getElementById('genre').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;">Genre:</span> &nbsp;'+particularMovieJson.Genre;
    document.getElementById('released').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;"Released:</span> &nbsp;Welcome';
    document.getElementById('rated').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;"Rated:</span> &nbsp;Welcome';
    document.getElementById('imdb').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;">IMBD Rating:</span> &nbsp;Welcome';
    document.getElementById('writer').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;">Director:</span> &nbsp;Welcome';
    document.getElementById('actors').innerHTML = '<span style="font-size: 17px; font-family: sans-serif; font-weight: bold;">Writer:</span> &nbsp;Welcome';
    document.getElementById('plot').innerHTML = particularMovieJson.Plot;
}
//