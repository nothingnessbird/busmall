'use strict';

var productFiles = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

function Product(name,fileLink) {
  name = this.name;
  fileLink = this.fileLink;
};

var productArray = [];

var productMaker = function () {
  for (var i = 0; i < productFiles.length; i++) {
    fileNamer = productFiles[i].slice(0,-4);
    fileLinker = productFiles[i];
    productArray.push(new Product(fileNamer,fileLinker));
  }
};
