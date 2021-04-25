
const favoriteButtonHandler = async (event) => {
  const plant = /\d+$/.exec(document.location);

  // when click, save plant and user to db
  const response = await fetch('/api/gardens', {
    method: 'POST',
    // what *user is favoriting what *plant?
    body: JSON.stringify({ plant }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log(response);
    // update visual if favourited or not
    console.log('api response received');
  } else {
    console.log('aaah');
  }
};

document
  .querySelector('.btn2')
  .addEventListener('click', favoriteButtonHandler);

