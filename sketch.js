/*  const colorInput = document.getElementById('inputColor');
const weight = document.getElementById('weight');*/

new P5();
var database;
var drawing = [];
var currentPath = [];
var isDrawing = false;


function setup() {
  var canvas = createCanvas(700, 500);
  canvas.parent('#canvasContainer');
  //var dinoName = select('#dinoName').value();
  canvas.mousePressed(startPath);
  //
  canvas.mouseReleased(endPath);
  var strokeColor = select("#inputColor").value();
  var strokeWeight = select("#weight").value();
  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);
  console.log(strokeColor, strokeWeight);
  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);

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

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}

function draw() {
  strokeColor = "#676890";
  weight = 50;
  noFill();
  
  background(255);
  if(isDrawing) {
    var point = {
      x: mouseX,
      y:mouseY,
      color: strokeColor,
      weight: strokeWeight
    };
    currentPath.push(point);
   } 
  for (var i = 0; i < drawing.length; i++){
    var path = drawing[i];
    beginShape();

    for (var j = 0; j < path.length; j++){
      stroke(point.color);
      strokeWeight(point.weight);
      vertex(path[j].x,path[j].y);
    }
    endShape();
    
  }
  
}


function saveDrawing(){
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  var ref= database.ref('drawings');
  var data = {
    name: "color",
    drawing: drawing
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
    var dinoImg = createImg(dbdrawing);
    drawing = dbdrawing.drawing;
    //console.log(drawing);
  }

}

function clearDrawing() {
  drawing = [];
}