async function plantSearchHandler(event) {
  event.preventDefault();

  const searchedWord = document.querySelector('#search-text').value;
  console.log('BUTTON');
  document.location.replace(`/search/${searchedWord}`);
}


document
  .querySelector('.search-form')
  .addEventListener('submit', plantSearchHandler);
