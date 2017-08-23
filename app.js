'use strict';

var productFiles = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

function Product(name,fileLink) {
  this.name = name;
  this.fileLink = fileLink;
  this.shownCounter = 0;
  this.clickCounter = 0;
};

var productArray = [];

var productMaker = function () {
  for (var i = 0; i < productFiles.length; i++) {
    var fileNamer = productFiles[i].slice(0,-4);
    var fileLinker = productFiles[i];
    productArray.push(new Product(fileNamer,fileLinker));
  }
};

productMaker();

function randomizer(){
  return Math.floor(Math.random() * productFiles.length);
};

var imgArray = ['product1','product2','product3'];
var lastImageArray = [];

var productShower = function () {
  var currentImageArray = [];
  for (var i = 0; i < imgArray.length; i++) {
    var currentProduct = randomizer();
    if (!currentImageArray.includes(currentProduct) && !lastImageArray.includes(currentProduct)) {
      currentImageArray.push(currentProduct);
      var displayImage = document.getElementById(imgArray[i]);
      displayImage.setAttribute('src','img/' + productArray[currentProduct].fileLink);
      productArray[currentProduct].shownCounter++;
    } else {
      i--;
    }
  }
  lastImageArray = currentImageArray;
};

var clicks = 0;

var products = document.getElementById('products');
var buttonDiv = document.getElementById('buttonDiv');

var startButton = function () {
  buttonDiv.style.display = 'none';
  products.style.display = 'block';
  productShower();
};

var imageLister = function () {
  var imgList = document.getElementById('imgList');
  for (var i = 0; i < productFiles.length; i++) {
    var figure = document.createElement('figure');
    imgList.appendChild(figure);
    var figImg = document.createElement('img');
    figImg.setAttribute('src','img/' + productArray[i].fileLink);
    figure.appendChild(figImg);
    var figCaption = document.createElement('figcaption');
    figCaption.innerHTML = productArray[i].name;
    figure.appendChild(figCaption);
  }
};

var remainingClicks = document.getElementById('remainingClicks');

var showUntil25ThenGraphAndImages = function (event) {
  if (clicks < 24) {
    if (event.target.id === 'product1') {
      var index = lastImageArray[0];
      productArray[index].clickCounter++;
      remainingClicks.innerHTML = 'You have ' + (24 - clicks) + ' votes remaining.';
    } else if (event.target.id === 'product2') {
      var index = lastImageArray[1];
      remainingClicks.innerHTML = 'You have ' + (24 - clicks) + ' votes remaining.';
      productArray[index].clickCounter++;
    } else {
      var index = lastImageArray[2];
      remainingClicks.innerHTML = 'You have ' + (24 - clicks) + ' votes remaining.';
      productArray[index].clickCounter++;
    }
    clicks++;
    productShower();
  } else {
    products.style.display = 'none';
    chartData();
    var myChart = new Chart(ctx, chartConfig);
    imageLister();
  }
};

var button = document.getElementById('start-button');
var productImg = document.getElementsByClassName('productImg');

button.addEventListener('click',startButton);
for (var i = 0; i < productImg.length; i++) {
  productImg[i].addEventListener('click',showUntil25ThenGraphAndImages);
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var clickedDataArray = [];
var shownDataArray = [];
var nameArray = [];

var chartData = function () {
  for (var i = 0; i < productArray.length; i++) {
    clickedDataArray.push(productArray[i].clickCounter);
    shownDataArray.push(productArray[i].shownCounter);
    nameArray.push(productArray[i].name);
  }
};

var chartConfig = {
  type: 'horizontalBar',
  data: {
    labels: nameArray,
    datasets: [{
      label: '# of Votes',
      data: clickedDataArray,
      backgroundColor: [
        'rgba(255, 99, 132, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(20, 109, 164, 0.4)',
        'rgba(55, 59, 254, 0.4)',
        'rgba(205, 180, 94, 0.4)',
        'rgba(150, 255, 64, 0.4)',
        'rgba(205, 109, 204, 0.4)',
        'rgba(30, 200, 164, 0.4)',
        'rgba(228, 15, 294, 0.4)',
        'rgba(255, 30, 64, 0.4)',
        'rgba(255, 200, 24, 0.4)',
        'rgba(130, 250, 114, 0.4)',
        'rgba(90, 255, 150, 0.4)',
        'rgba(100, 25, 255, 0.4)',
        'rgba(160, 160, 204, 0.4)',
        'rgba(25, 197, 104, 0.4)',
        'rgba(240, 100, 75, 0.4)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(20, 109, 164, 1)',
        'rgba(55, 59, 254, 1)',
        'rgba(205, 180, 94, 1)',
        'rgba(150, 255, 64, 1)',
        'rgba(205, 109, 204, 1)',
        'rgba(30, 200, 164, 1)',
        'rgba(228, 15, 294, 1)',
        'rgba(255, 30, 64, 1)',
        'rgba(255, 200, 24, 1)',
        'rgba(130, 250, 114, 1)',
        'rgba(90, 255, 150, 1)',
        'rgba(100, 25, 255, 1)',
        'rgba(160, 160, 204, 1)',
        'rgba(25, 197, 104, 1)',
        'rgba(240, 100, 75, 1)'
      ],
      borderWidth: 1
    },
    {
      label: '# of Times Shown',
      data: shownDataArray,
      backgroundColor: [
        'rgba(255, 99, 132, 0.1)',
        'rgba(54, 162, 235, 0.1)',
        'rgba(255, 206, 86, 0.1)',
        'rgba(75, 192, 192, 0.1)',
        'rgba(153, 102, 255, 0.1)',
        'rgba(20, 109, 164, 0.1)',
        'rgba(55, 59, 254, 0.1)',
        'rgba(205, 180, 94, 0.1)',
        'rgba(150, 255, 64, 0.1)',
        'rgba(205, 109, 204, 0.1)',
        'rgba(30, 200, 164, 0.1)',
        'rgba(228, 15, 294, 0.1)',
        'rgba(255, 30, 64, 0.1)',
        'rgba(255, 200, 24, 0.1)',
        'rgba(130, 250, 114, 0.1)',
        'rgba(90, 255, 150, 0.1)',
        'rgba(100, 25, 255, 0.1)',
        'rgba(160, 160, 204, 0.1)',
        'rgba(25, 197, 104, 0.1)',
        'rgba(240, 100, 75, 0.1)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 0.3)',
        'rgba(54, 162, 235, 0.3)',
        'rgba(255, 206, 86, 0.3)',
        'rgba(75, 192, 192, 0.3)',
        'rgba(153, 102, 255, 0.3)',
        'rgba(20, 109, 164, 0.3)',
        'rgba(55, 59, 254, 0.3)',
        'rgba(205, 180, 94, 0.3)',
        'rgba(150, 255, 64, 0.3)',
        'rgba(205, 109, 204, 0.3)',
        'rgba(30, 200, 164, 0.3)',
        'rgba(228, 15, 294, 0.3)',
        'rgba(255, 30, 64, 0.3)',
        'rgba(255, 200, 24, 0.3)',
        'rgba(130, 250, 114, 0.3)',
        'rgba(90, 255, 150, 0.3)',
        'rgba(100, 25, 255, 0.3)',
        'rgba(160, 160, 204, 0.3)',
        'rgba(25, 197, 104, 0.3)',
        'rgba(240, 100, 75, 0.3)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    maintainAspectRatio: true,
    responsive: false,
    animation: {
      duration: 1000
    },
    title: {
      display: true,
      text: 'Product Graph'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
};
