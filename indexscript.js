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

async function SearchMovie(){
    
}