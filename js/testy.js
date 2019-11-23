var radius;
var c = 255;
var database;
let dinosaurs;

/*function preload() {
  // Get the dinos!
  let url ='json/dinos.json';
  dinosaurs = loadJSON(url);
  let dinoCode = dinosaurs[0];
  let dinoDrawing = dinosaurs[1];
  let dinoTime = dinosaurs[2];
  console.log(dinosaurs);
  console.log(dinoDrawing);
  console.log(dinoTime);
}*/

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
  //console.log(submitTime);
  console.log(c);
  background(255);
  colorMode(RGB);
  //createColorPicker();
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
  c= color_picker.color()
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
  //createColorPicker();
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

function listDinos(){
  for(var i = 0; i < dinos.length; i++){

  }
}

function errData(err){
  console.log(err);
}

function showDrawing(key) {
  //console.log(drawing);
  if (!key) {
    key = this.html();
  }

  var ref = database.ref('drawings/' + key);
  ref.once('value', oneDrawing, errData);

  function oneDrawing(data) {
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing;
    console.log(drawing);
  }

}

function downloadDrawing() {
  //image(colorPicker, 1000,0);
  saveCanvas(canvas, 'd1no' + int(random(20)),'jpg');
}

//modals!
$(document).ready(function(){
    $('#welcomeModal').modal();
    $('#welcomeModal').modal('open'); 
 });