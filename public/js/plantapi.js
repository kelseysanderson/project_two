async function plantSearchHandler(event) {
  event.preventDefault();

  const searchedWord = document.querySelector('#search-text').value;
  console.log('BUTTON');
  const searchResults = await fetch(`/search/${searchedWord}`);
  document.location.replace('/search');
}


document
  .querySelector('.search-form')
  .addEventListener('submit', plantSearchHandler);
