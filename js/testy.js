var radius;
var c;
var database;
//var myCanvas = document.getElementById("defaultCanvas0");
function setup() {
  var canvas = createCanvas(700, 500);
  canvas.parent('canvasContainer');
  canvas.id('main');
  //saveDino = createGraphics(600,500);
  //mainCanvas.parent('canvasContainer');
 var secondCanvas = document.createElement('canvas'); 
secondCanvas.width = 600;
secondCanvas.height = 500;
/*secondCanvas.getContext('2d').drawImage(canvas,0,0,700,500,0,0,600, 500);*/


  slider = select('#bWidth');
  clearBtn = select("#clearButton");
  clearBtn.mousePressed(changeBG);
  checkbox = select('#eraseBox');
  c = color(255, 0, 0);
  background(255);
  colorMode(RGB);
  createColorPicker();
  var downloadButton = select('#downloadButton');
  downloadButton.mousePressed(downloadDrawing); 
  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);
  //console.log(dataURL);
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCHpEE0BJ4VJeozU7pGxoeD95hti0dTcLM",
    authDomain: "d1no-club.firebaseapp.com",
    databaseURL: "https://d1no-club.firebaseio.com",
    projectId: "d1no-club",
    storageBucket: "d1no-club.appspot.com",
    messagingSenderId: "623680606310",
    appId: "1:623680606310:web:579795658bc9ba9449dda7",
    measurementId: "G-SXZ489X6X9"
  };
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();

  var params = getURLParams();
  console.log(params);
  if (params.id) {
    console.log(params.id);
    showDrawing(params.id);
  }

  var ref = database.ref('drawings');
  //for to list data
  ref.on('value', gotData, errData);
  //ref.on('value', errData);
}

function draw() {
  radius = slider.value();
  //image(saveDino, 600, 500);
  /*
  if (mouseIsPressed && mouseX<400) {
    for (y = 0; y < height; y++) {
      for (x = 0; x < width-50; x++) {
        var distance = dist(x, y, mouseX, mouseY);
        if (distance < radius) {
          set(x,y, c);
        }
      }
    }
  }
      updatePixels()
  */
}

function mouseClicked() {
  if (mouseX > 500) {
    c = get(mouseX, mouseY);
checkbox.checked(false);
  }else{
    stampRectangle(c);
  }
}

function mouseDragged() {
  if (checkbox.checked()){
    stroke(255);
  }else{
    stroke(c);
  }
  if (mouseX < 600) {
    strokeWeight(slider.value());
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function changeBG() {
  background(255);
  createColorPicker();
}

function createColorPicker() {
   //var colorPickerCanvas = createCanvas(100, 500);
  var colorPicker = createImage(100, height);
  //colorPicker.parent('colorPickerContainer');
  
  var myWidth = colorPicker.width/3;
  //colorPicker.parent('pickercontainer');
  colorPicker.loadPixels();
  from = color(0, 255, 0);
  to = color(255, 0, 0);
  console.log(hue(from));
  for (var y = 0; y < height; y++) {
    for (x = 0; x < myWidth; x++) {
      color1 = lerpColor(from, to, y / height);
      colorPicker.set(x, y, color1);
    }
  }
  from = color(0, 0, 255);
  to = color(0, 255, 0);
  console.log(hue(from));
  for (var y = 0; y < height; y++) {
    for (x = myWidth; x < myWidth* 2; x++) {
      color1 = lerpColor(from, to, y / height);
      colorPicker.set(x, y, color1);
    }
  }
  from = color(255, 0, 0);
  to = color(0, 255, 255);
  console.log(hue(from));
  for (var y = 0; y < height; y++) {
    for (x = myWidth*2; x < myWidth * 3; x++) {
      color1 = lerpColor(from, to, y / height);
      colorPicker.set(x, y, color1);
    }
  }
  colorPicker.updatePixels();
  image(colorPicker, 600, 0);
}

function stampRectangle(c){
  fill(c);
  noStroke();
  ellipse(mouseX,mouseY,slider.value(),slider.value());
}

function eraserSwitch(){
 //
}

function saveDrawing(){
  var dataURL = secondCanvas.toDataURL('image/png', 0.5);
  console.log(dataURL);
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  var ref= database.ref('drawings');
  var data = {
    drawing: dataURL
  }
  var result = ref.push(data, dataSent);
  console.log(result.key);
  function dataSent(err, status) {
    console.log(status);
  }
}
//for to list data
// Initialize Firebase
function gotData(data){

  //clear the listing

  var elts = selectAll('.listing');
  for (var i = 0; i < elts.length; i++){
    elts[i].remove();
  }
  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    //console.log(key);
    var li = createElement('li', '');
    li.class('listing');
    var ahref = createA('#', key);
    ahref.mousePressed(showDrawing);
    ahref.parent(li);

    var perma = createA('?id=' + key, 'permalink');
    perma.parent(li);
    perma.style('padding', '10px');

    li.parent('drawingList');
  }

}

function errData(err){
  console.log(err);
}

function showDrawing(key) {
  console.log(arguments);
  if (!key) {
    key = this.html();
  }

  var ref = database.ref('drawings/' + key);
  ref.once('value', oneDrawing, errData);

  function oneDrawing(data) {
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing;
    //console.log(drawing);
  }

}

function downloadDrawing() {
  //image(colorPicker, 1000,0);
  save(saveDino, 'jpg');
}

// The crop function
var crop = function(canvas, offsetX, offsetY, width, height, callback) {
  // create an in-memory canvas
  var buffer = document.createElement('canvas');
  var b_ctx = buffer.getContext('2d');
  // set its width/height to the required ones
  buffer.width = 600;
  buffer.height = 500;
  // draw the main canvas on our buffer one
  // drawImage(source, source_X, source_Y, source_Width, source_Height, 
  //  dest_X, dest_Y, dest_Width, dest_Height)
  b_ctx.drawImage(canvas, 0, 0, 700, 500,
                  0, 0, buffer.width, buffer.height);
  // now call the callback with the dataURL of our buffer canvas
  callback(buffer.toDataURL());
};


// #main canvas Part

var canvas = document.getElementById('main');
var img = new Image();
img.crossOrigin = "Anonymous";

img.onload = function() {
  canvas.width = this.width;
  canvas.height = this.height;
  canvas.getContext('2d').drawImage(this, 0, 0);
  // set a little timeout before calling our cropping thing
  setTimeout(function() {
    crop(canvas, 100, 70, 70, 70, callback)
  }, 1000);
};

//img.src = "https://dl.dropboxusercontent.com/s/1alt1303g9zpemd/UFBxY.png";

// what to do with the dataURL of our cropped image
var callback = function(dataURL) {
  ;
}
/*
{
  "rules": {
    
    ".write": "auth != null",
    "drawings": {
       "$uid": {
         ".read": "$uid === 'c6ixqlhgt4gxxV8VnjRb6F8YmgS2'",
         ".write": "!data.exists()"
       }
     }
  }
}*/