
const favoriteButton = $('#favorite');

const favoriteButtonHandler = async (event) => {
  const plant = /\d+$/.exec(document.location)[0];

  if (favoriteButton.hasClass('btn2-remove')) {
    // is in garden
    favoriteButton.removeClass('btn2-remove');
    favoriteButton.text('Add to My Garden');
    const removedGarden = await fetch('/api/gardens', {
      method: 'DELETE',
      body: JSON.stringify({ plant }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(removedGarden);
  } else {
    // not in garden
    favoriteButton.addClass('btn2-remove');
    favoriteButton.text('Remove from My Garden');

    // when click, save plant and user to db
    const response = await fetch('/api/gardens', {
      method: 'POST',
      // what *user is favoriting what *plant?
      body: JSON.stringify({ plant }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      console.log('error saving to garden');
    }
  }
};

document
  .querySelector('.btn2')
  .addEventListener('click', favoriteButtonHandler);

