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
    displayList();
  }
};

var button = document.getElementById('start-button');
var productImg = document.getElementsByClassName('productImg');

button.addEventListener('click',startButton);
for (var i = 0; i < productImg.length; i++) {
  productImg[i].addEventListener('click',incrementProductsShowImgs);
}

var displayList = function () {
  for (var i = 0; i < productArray.length; i++) {
    var list = document.getElementById('list');
    var listItem = document.createElement('li');
    listItem.innerHTML = productArray[i].clickCounter + ' votes for the ' + productArray[i].name;
    list.appendChild(listItem);
  }
};
