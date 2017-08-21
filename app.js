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

var productShower = function () {
  var currentImageArray = [];
  for (var i = 0; i < imgArray.length; i++) {
    var currentProduct = randomizer();
    if (!currentImageArray.includes(currentProduct)) {
      currentImageArray.push(currentProduct);
      var displayImage = document.getElementById(imgArray[i]);
      displayImage.setAttribute('src','img/' + productArray[currentProduct].fileLink);
    } else {
      i--;
    }
  }
};

// productShower();

var products = document.getElementById('products');

products.addEventListener('click',productShower);
