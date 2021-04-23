async function plantSearchHandler(event) {
  event.preventDefault();

  const searchedWord = document.querySelector('#search-text').value;
  console.log('BUTTON');
  const searchResults = await fetch(`/search/${searchedWord}`);
  const searchJson = await searchResults.json();
  console.log(searchJson);
}


document
  .querySelector('.search-form')
  .addEventListener('submit', plantSearchHandler);
