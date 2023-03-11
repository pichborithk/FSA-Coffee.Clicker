const coffeeMakers = [
  {
    id: 0,
    name: 'Chemex',
    cost: 10,
    isVisible: false,
    rate: 1,
    quantity: 0,
  },
  {
    id: 1,
    name: 'French Press',
    cost: 50,
    isVisible: false,
    rate: 2,
    quantity: 0,
  },
  {
    id: 2,
    name: 'Mr. Coffee',
    cost: 100,
    isVisible: false,
    rate: 5,
    quantity: 0,
  },
  {
    id: 3,
    name: 'Ten Cup Urn',
    cost: 500,
    isVisible: false,
    rate: 10,
    quantity: 0,
  },
  {
    id: 4,
    name: 'Espresso Machine',
    cost: 1000,
    isVisible: false,
    rate: 20,
    quantity: 0,
  },
  {
    id: 5,
    name: 'Ten Gallon Urn',
    cost: 5000,
    isVisible: false,
    rate: 50,
    quantity: 0,
  },
  {
    id: 6,
    name: 'Coffee Shop',
    cost: 10000,
    isVisible: false,
    rate: 75,
    quantity: 0,
  },
  {
    id: 7,
    name: 'Coffee Factory',
    cost: 50000,
    isVisible: false,
    rate: 100,
    quantity: 0,
  },
  {
    id: 8,
    name: 'Coffee Fountain',
    cost: 100000,
    isVisible: false,
    rate: 200,
    quantity: 0,
  },
  {
    id: 9,
    name: 'Coffee River',
    cost: 500000,
    isVisible: false,
    rate: 500,
    quantity: 0,
  },
  {
    id: 10,
    name: 'Coffee Ocean',
    cost: 1000000,
    isVisible: false,
    rate: 1000,
    quantity: 0,
  },
  {
    id: 11,
    name: 'Coffee Planet',
    cost: 5000000,
    isVisible: false,
    rate: 2000,
    quantity: 0,
  },
];

if (!localStorage.getItem('username')) {
  localStorage.setItem('username', prompt('Please enter your name'));
}
const name = localStorage.getItem('username');
const scoreDisplay = document.querySelector('#score');
const rateDisplay = document.querySelector('#rate');
const coffeeBtn = document.querySelector('#coffee');
const producersList = document.querySelector('#producers-list');
const audio = document.querySelector('audio');
totalScore = 0;
score = 0;
rate = 0;

document.querySelector('#name').innerText = name;

function handleClickOnCoffee() {
  totalScore++;
  score++;
  scoreDisplay.innerText = score;
}

function createProducer(producer) {
  const brandName = document.createElement('h3');
  const buyButton = document.createElement('button');
  const quantityText = document.createElement('p');
  const rateText = document.createElement('p');
  const costText = document.createElement('p');
  const leftDiv = document.createElement('div');
  const rightDiv = document.createElement('div');
  const container = document.createElement('div');
  container.className = 'coffee-maker';
  buyButton.innerText = 'Buy';
  buyButton.dataset.id = producer.id;
  buyButton.addEventListener('click', handleBuyProducer);
  brandName.innerText = producer.name;
  quantityText.className = 'quantity';
  quantityText.innerText = `Quantity: ${producer.quantity}`;
  rateText.innerText = `Coffee/second: ${producer.rate}`;
  costText.className = 'cost';
  costText.innerText = `Cost: ${producer.cost} coffee`;
  leftDiv.appendChild(brandName);
  leftDiv.appendChild(buyButton);
  rightDiv.appendChild(quantityText);
  rightDiv.appendChild(rateText);
  rightDiv.appendChild(costText);
  container.appendChild(leftDiv);
  container.appendChild(rightDiv);
  producersList.appendChild(container);
}

function renderProducersList() {
  for (let producer of coffeeMakers) {
    if (!producer.isVisible && totalScore >= Math.floor(producer.cost * 0.7)) {
      createProducer(producer);
      producer.isVisible = true;
    }
  }
}

function handleBuyProducer(event) {
  const producer = event.target.parentNode.parentNode;
  const quantityText = producer.querySelector('.quantity');
  const costText = producer.querySelector('.cost');
  const index = event.target.dataset.id;
  if (score < coffeeMakers[index].cost) {
    alert('Not enough coffee!!!');
    return;
  }
  score -= coffeeMakers[index].cost;
  rate += coffeeMakers[index].rate;
  coffeeMakers[index].quantity++;
  coffeeMakers[index].cost = Math.floor(coffeeMakers[index].cost * 1.25);
  rateDisplay.innerText = rate;
  scoreDisplay.innerText = score;
  quantityText.innerText = `Quantity: ${coffeeMakers[index].quantity}`;
  costText.innerText = `Cost: ${coffeeMakers[index].cost} coffee`;
  audio.currentTime = 0;
  audio.play();
}

setInterval(function () {
  if (rate > 0) {
    totalScore += rate;
    score += rate;
    scoreDisplay.innerText = score;
    renderProducersList();
  }
}, 1000);

coffeeBtn.addEventListener('click', () => {
  handleClickOnCoffee();
  renderProducersList();
});
