function plantSearchHandler(event){
  event.preventDefault()

  const searchedWord = document.querySelector('#search-text').value;
    $.ajax({
        url:`https://trefle.io/api/v1/plants/search?q=${searchedWord}&token=oAC1gBhoTITc0LexBLXeOfr4ix2qc-DiGQXk1c3b2Rs`,
        method:'GET',
      }).then(function(response){
          let data = response.data
          const response = await fetch('/search', {
            method: 'POST',
            body: JSON.stringify({data}),
            headers: { 'Content-Type': 'application/json' },
          });
        });
};


document
  .querySelector('.search-form')
  .addEventListener('submit', plantSearchHandler);