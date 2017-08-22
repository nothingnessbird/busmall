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

var startButton = function () {
  button.style.visibility = 'hidden';
  productShower();
};

var incrementProductsShowImgs = function (event) {
  if (clicks < 24) {
    if (event.target.id === 'product1') {
      var index = lastImageArray[0];
      productArray[index].clickCounter++;
    } else if (event.target.id === 'product2') {
      var index = lastImageArray[1];
      productArray[index].clickCounter++;
    } else {
      var index = lastImageArray[2];
      productArray[index].clickCounter++;
    }
    clicks++;
    productShower();
  } else {
    var products = document.getElementById('products');
    products.style.display = 'none';
    // displayList();
  }
};

var button = document.getElementById('start-button');
var productImg = document.getElementsByClassName('productImg');

button.addEventListener('click',startButton);
for (var i = 0; i < productImg.length; i++) {
  productImg[i].addEventListener('click',incrementProductsShowImgs);
}

// var displayList = function () {
//   for (var i = 0; i < productArray.length; i++) {
//     var list = document.getElementById('list');
//     var listItem = document.createElement('li');
//     listItem.innerHTML = productArray[i].clickCounter + ' votes for the ' + productArray[i].name;
//     list.appendChild(listItem);
//   }
// };
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

clickedAndShownData();

var chartConfig = {
  type: 'horizontalBar',
  data: {
    labels: nameArray, // x-axis labels for every entry in your data set. It should match up with the number of things you're plotting (if it's a bar chart)
    datasets: [{ // <-- notice that this can be an array of multiple data sets.
      // each data set is its own object literal.
      label: '# of Votes', // <-- the label of this one data set
      data: clickedDataArray, // <-- where your data actually goes. just the numbers
      backgroundColor: [ // <-- this can be either one single color or a color for each item in your bar chart.
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
        'rgba(25, 197, 164, 0.4)'
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
        'rgba(25, 197, 164, 1)'
      ],
      borderWidth: 1 // border width in pixels
    }]
  },
  options: {
    maintainAspectRatio: true,
    animation: {
      duration: 1000
    },
    title: {
      display: true,
      text: 'Your Favorite Products'
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

var myChart = new Chart(ctx, chartConfig);
