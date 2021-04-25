
const favoriteButtonHandler = async (event) =>{
    const plant = /\d+$/.exec(document.location);

    console.log( plant )
    //when click, save plant and user to db
        if (plant && username) {
            const response = await fetch('/api/gardens', {
            method: 'POST',
            //what *user is favoriting what *plant?
            body: JSON.stringify({ plant }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        document.location.replace('/');
        } else {
        alert(response.statusText);
        }
    }
}

document
  .querySelector('.btn2')
  .addEventListener('click', favoriteButtonHandler);

