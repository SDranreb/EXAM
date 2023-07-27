async function getCatFact() {
  const response = await fetch('https://cat-fact.herokuapp.com/facts');
  const data = await response.json();
  return data;
}


async function getDogImage() {
  const response = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await response.json();
  return data.message;
}


function displayRandomData() {
  const catFactContainer = document.getElementById('catFactContainer');
  const dogImageContainer = document.getElementById('dogImageContainer');

  
  const catFactPromise = getCatFact();

  
  const dogImagePromise = getDogImage();

  
  Promise.all([catFactPromise, dogImagePromise])
    .then(([catFactsData, dogImageUrl]) => {
      
      const randomCatIndex = Math.floor(Math.random() * catFactsData.length);
      const randomCatFact = catFactsData[randomCatIndex].text;

      
      catFactContainer.textContent = randomCatFact;

      
      dogImageContainer.innerHTML = `<img src="${dogImageUrl}" alt="Random Dog Image">`;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      catFactContainer.textContent = 'Failed to fetch data. Please try again later.';
      dogImageContainer.textContent = '';
    });
}


const getRandomDataButton = document.getElementById('getRandomData');
getRandomDataButton.addEventListener('click', displayRandomData);


displayRandomData();
