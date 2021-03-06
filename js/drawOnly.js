var radius;
var c = 255;
var database;

function setup() {
  let canvas = createCanvas(1000, 600);
  let canvasWidth = windowWidth /1.45;
  let canvasHeight = windowHeight /1.5;
  resizeCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvasContainer');
  canvas.id('main');
  slider = select('#bWidth');
  clearBtn = select("#clearButton");
  clearBtn.mousePressed(changeBG);
  checkbox = select('#eraseBox');
  drawAgain = select("#drawAgainButton");
  drawAgain.mousePressed(changeBG);
  color_picker = createColorPicker("black");
  color_picker.parent("strokeColor");

  background(255);
  colorMode(RGB);
  
  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);
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

}

function draw() {
  radius = slider.value();
  c= color_picker.color();

}


function mouseReleased() {
  locked = false;
}

function mouseDragged() {
  if (checkbox.checked()){
    stroke(255);
  }else{
    stroke(c);
  }
  if (mouseX < (windowWidth /1.45) && mouseY < (windowHeight /1.5)) {
    strokeWeight(slider.value());
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function changeBG() {
  background(255);
}


function stampRectangle(c){
  fill(c);
  noStroke();
  ellipse(mouseX,mouseY,slider.value(),slider.value());
}

function saveDrawing(){
  var completionCode = 'D1no_' + int(random(999)) + int(millis()) + "_" + day() + minute();
  var submitTime = month() + "/" + day() +" " + hour() + ":"+ minute();
  var dataURL = canvas.toDataURL('image/png');
  var compCode = createSpan(completionCode);
  compCode.parent(completeCode);
  $('#thanksModal').modal();
  $('#thanksModal').modal('open');

  console.log(dataURL);
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  var ref= database.ref('drawings');
  var data = {
    drawing: dataURL,
    time: submitTime,
    code: completionCode
  }
  var result = ref.push(data, dataSent);
  console.log(result.key);
  function dataSent(err, status) {
    console.log(status);
  }
}


function errData(err){
  console.log(err);
}


//materialize stuffs  - modals and tabs
$(document).ready(function(){
    $('#welcomeModal').modal();
    $('#welcomeModal').modal('open');

 });


