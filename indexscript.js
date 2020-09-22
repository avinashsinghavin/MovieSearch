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
    var divclass='<div class="row">';
    for(var i = 0; i < Apidata.response.length; i++){
        divclass += ''
        if(i % 3 === 0)
            divclass += ''
    }
  }