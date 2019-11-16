

var database;
var drawing = [];
var isDrawing = false;

function setup() {
  canvas = createCanvas(500, 500);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);
  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);
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
   console.log(firebase);
 
  /*canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);*/



  
  
  
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
  background(0);
  if(isDrawing) {
    var point = {
      x: mouseX,
      y:mouseY
    }
    currentPath.push(point);
  }
  
  stroke(255);
  strokeWeight(4);
  noFill();
  for (var i = 0; i < drawing.length; i++){
    var path = drawing[i];
    beginShape();
    for (var j = 0; j < path.length; j++){
      vertex(path[j].x,path[j].y)
    }
    endShape();
    
  }
  
}

function saveDrawing(){
  var ref= database.ref('drawings');
  var data = {
    name: "Doo",
    drawing: drawing
  }
  var result = ref.push(data, dataSent);
  console.log(result.key);
  function dataSent(status) {
    console.log(status);
  }
}

// Initialize Firebase
  



  /*var params = getURLParams();
  console.log(params);
  if (params.id) {
    console.log(params.id);
    showDrawing(params.id);
  }


  var ref = database.ref('drawings');
  ref.on('value', gotData, errData);
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
  background(0);

  if (isDrawing) {
    var point = {
      x: mouseX,
      y: mouseY
    }
    currentPath.push(point);
  }

  stroke(255);
  strokeWeight(4);
  noFill();
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y)
    }
    endShape();
  }


}


function saveDrawing() {
  var ref = database.ref('drawings');
  var data = {
    name: "Dan",
    drawing: drawing
  }
  var result = ref.push(data, dataSent);
  console.log(result.key);

  function dataSent(err, status) {
    console.log(status);
  }
}

function gotData(data) {

  // clear the listing
  var elts = selectAll('.listing');
  for (var i = 0; i < elts.length; i++) {
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
    perma.style('padding', '4px');

    li.parent('drawinglist');
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(key) {
  //console.log(arguments);
  if (key instanceof MouseEvent) {
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


function clearDrawing() {
  drawing = [];
}*/