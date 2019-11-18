var radius;
var c;
var database;
var myCanvas = document.getElementById("defaultCanvas0");
function setup() {
  createCanvas(700, 500);
  canvas.parent('canvascontainer');
  createP();

  slider = createSlider(1, 20, 10);
  slider.parent('sliders');
  eraser = createButton("clear");
  eraser.mousePressed(changeBG);
  eraser.parent('clearbutton');
  checkbox = createCheckbox('Erase', false);
  checkbox.parent('eraserbutton');
  c = color(255, 0, 0);
  background(255);
  colorMode(RGB);
  createColorPicker();

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
  if (mouseX < 700) {
    strokeWeight(slider.value());
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function changeBG() {
  background(255);
  createColorPicker();
}

function createColorPicker() {
  colorPicker = createImage(100, height);
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
  image(colorPicker, 800, 0);
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
  var dataURL = canvas.toDataURL('image/png', 0.5);
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
