'use strict';

var productFiles = [['bag.jpg', 'R2D2 Luggage Bag'],['banana.jpg','Banana Slicer'] ,['bathroom.jpg','While Pooping Tablet'],['boots.jpg','Toeless Rain Boots'],['breakfast.jpg','Combo Breakfast Machine'],['bubblegum.jpg','Meatball Bubblegum'],['chair.jpg','Bubble Bottom Chair'],['cthulhu.jpg','ph\'nglui mglw\'nafh Cthulhu R\'lyeh wgah\'nagl fhtagn'],['dog-duck.jpg','Duck Beak Dog Muzzle'],['dragon.jpg','Dragon Meat'],['pen.jpg','Filthy Pen Utensils'],['pet-sweep.jpg','Animal Abuse'],['scissors.jpg','Pizza Scissors'],['shark.jpg','Shark Attack Sleeping Bag'],['sweep.png','Child Abuse'],['tauntaun.jpg','Stolen ThinkGeek Taun Taun Sleeping Bag'],['unicorn.jpg','Unicorn Meat'],['usb.gif','Wiggly USB Tentacle'],['water-can.jpg','Self Watering Can'],['wine-glass.jpg','Spill On Yourself Wine Glass']];

function Product(name,description,fileLink) {
  this.name = name;
  this.description = description;
  this.fileLink = fileLink;
  this.shownCounter = 0;
  this.clickCounter = 0;
};

var productArray = [];

var productMaker = function () {
  for (var i = 0; i < productFiles.length; i++) {
    var fileNamer = productFiles[i][0].slice(0,-4);
    var fileDescriptor = productFiles[i][1];
    var fileLinker = productFiles[i][0];
    productArray.push(new Product(fileNamer,fileDescriptor,fileLinker));
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
    figCaption.innerHTML = productArray[i].description;
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
    addLocal();
    imageLister();
    percentCalc();
    chartPopulator();
    var myChart = new Chart(ctx, chartConfig);
    var mySecondChart = new Chart(ctx2, percentChartConfig);
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
var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');

var clickedDataArray = [];
var shownDataArray = [];
var nameArray = [];

var chartData = function () {
  for (var i = 0; i < productArray.length; i++) {
    clickedDataArray.push(productArray[i].clickCounter);
    shownDataArray.push(productArray[i].shownCounter);
    nameArray.push(productArray[i].description);
  }
};

var sendToLocal = function () {
  localStorage.clickData = JSON.stringify(clickTotalArray);
  localStorage.shownData = JSON.stringify(shownTotalArray);
};

var localClickData = [];
var localShownData = [];

var getFromLocal = function () {
  if (localStorage.clickData) {
    localClickData = JSON.parse(localStorage.clickData);
  }
  if (localStorage.shownData) {
    localShownData = JSON.parse(localStorage.shownData);
  }
};

var clickTotalArray = [];
var shownTotalArray = [];

var addLocal = function () {
  if (localStorage.getItem('clickData') && localStorage.getItem('shownData')) {
    getFromLocal();
    chartData();
    for (var i = 0; i < clickedDataArray.length; i++) {
      clickTotalArray.push(parseInt(clickedDataArray[i]) + parseInt(localClickData[i]));
      shownTotalArray.push(parseInt(shownDataArray[i]) + parseInt(localShownData[i]));
    }
    sendToLocal();
  } else {
    chartData();
    clickTotalArray = clickedDataArray;
    shownTotalArray = shownDataArray;
    sendToLocal();
  }
};

var chartConfig = '';

function chartPopulator (){
  chartConfig = {
    type: 'horizontalBar',
    data: {
      labels: nameArray,
      datasets: [{
        label: '# of Votes',
        data: clickTotalArray,
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
        data: shownTotalArray,
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
};

var percentsShown = [];

function percentCalc () {
  for (var i = 0; i < shownTotalArray.length; i++) {
    percentsShown.push(parseInt(clickTotalArray[i]) / parseInt(shownTotalArray[i]) * 100);
  }
};

var percentChartConfig = {
  type: 'bar',
  data: {
    labels: nameArray,
    datasets: [{
      label: 'Percent of Times Voted For When Shown',
      data: percentsShown,
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
      text: 'Percent Graph'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true,
          callback: function(value,index,values) {
            return value + '%';
          }
        }
      }]
    }
  }
};
