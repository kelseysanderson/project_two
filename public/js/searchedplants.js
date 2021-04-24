const card = document.querySelector('.plant');

const handleCardClick = async (event) => {
  const plantId = card.dataset.plantid
  // save plant
  // POST to /api/plants/plantId
};

card.addEventListener('click', handleCardClick);

