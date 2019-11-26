var data;
function preload() {
  // Get the dinos!
  data =loadJSON('json/dinos.json');
  console.log(data);
}

function setup(){
	noCanvas();
	//var dinos = data.drawings;
  	/*console.log(drawings);
  	for (var i = 0; i < data.length; i++) {
	    for (var key in data[i]) {
	        console.log(key + ":" + data[i][key]);
	    }
	}*/
  	gotData(data);
}

function draw(){
	
}

function gotData(data){
	
  //clear the listing
  //var stuff = data[0][]
 /* var elts = selectAll('.listing');
  for (var i = 0; i < elts.length; i++){
    elts[i].remove();
  }*/
 /* for (var i = 0; i < data.length; i++) {
    for (var key in data[i]) {
        console.log(key + ":" + data[i][key]);
    }
}*/
var ul = document.getElementById('dinoList');
for(var item in data.drawings) {
	var dinoDrawing = data.drawings[item];
  	var dinoCode = dinoDrawing.code;
  	var dinoURI = dinoDrawing.drawing;
  	var dinoDate = dinoDrawing.time;
  	//console.log(dinoURI);
  	var li = document.createElement('li');
  	//var dinospan = document.createElement('span');
  	//dinospan.textContent = dinoCode;
  	var image = new Image();
  	image.src = dinoURI;
  	image.alt = dinoCode;
  	image.title = dinoDate;
    li.appendChild(image);
    //li.appendChild(dinoCode);
    ul.appendChild(li);

  //li.innerHTML = dinoURI;
  
  
  
}

/*var ul = document.querySelector('ul');
for (var index in )
for (var index in data.drawings[i]) {
  var li = document.createElement('li')
  ul.appendChild(li);
  li.innerHTML = index + ": " + data.drawings[index];
   
}*/

//console.log(data[0]);
  //var drawings =;
  /*var keys = Object.keys(data);
  console.log(keys);
  console.log(keys[1]);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    console.log(key);
    var li = createElement('img', '');
    li.class('listing');*/
    /*var ahref = createA('#', key);
    ahref.mousePressed(showDrawing);
    ahref.parent(li);*/
/*
    var perma = createA('?id=' + key, 'permalink');
    perma.parent(li);
    perma.style('padding', '10px');*/

    //li.parent('drawingList');
  }

function downloadDrawing() {
  //image(colorPicker, 1000,0);
  saveCanvas(canvas, 'd1no' + int(random(2000)),'jpg');
}
 $(document).ready(function(){
    $('#galleryModal').modal();
  });