import { me,me_v2 ,me_v3,ankur,Harsh} from "./lib/dat.js";
import {Complex,curve} from "./lib/complex.js";
import { epicycles,drawCurve } from "./lib/draw.js";

const canvas = document.querySelector("#my_image");
const container = document.querySelector("#canvas-container");
console.log(container.height)
console.log(100)
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
//canvas.height = container.height
//canvas.width = container.width

const dimension = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

var stopID;
let drawflag=true;
let circleStroke = 1.1;
let lineStroke = 1.3;
let fps = 60;
let dt = 0.0015;
//let curveColor = "#e55d47";
let colorTheme = ["black","white","white"]; 

let mycurve = new curve(me_v3,"#my_image");

//let edgeOfCanvas = window.innerHeight*0.85
//if (window.innerHeight<window.innerWidth){
//  canvas.height = edgeOfCanvas;
//  canvas.width = edgeOfCanvas;
//} 
//else { 
//  canvas.height = edgeOfCanvas;
//  canvas.width = window.innerWidth*0.9;
//}

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const startDrawing = (inptcurve,x= me_v3.width/5 ,y= me_v3.height /5) => {
  const points = epicycles(ctx,x, y,inptcurve.t,0.5, 0, inptcurve.coeffs, colorTheme, [circleStroke*0.7,circleStroke],drawflag );
  if (inptcurve.t<=1.1) {
    inptcurve.graphpoints.unshift(points);
  }
  drawCurve(ctx, inptcurve.graphpoints,colorTheme[0], lineStroke);
}

const update = (inptcurve,dt) => {
  inptcurve.t += dt; // move time t += dt if t!=0
  //if (inptcurve.t >= 0.2) {window.cancelAnimationFrame( stopID ); drawflag = false; };
}

const render = (inptcurve) => {
  clearCanvas();
  startDrawing(mycurve,canvas.width/2.04,canvas.height/2);  
}

;(function () {
  function main( tFrame ) {
    stopID = window.requestAnimationFrame( main );
    update(mycurve,dt);
    render(mycurve);
    //setTimeout(render, 1000/fps, mycurve);
  }
  var fps = 4;
  var ticklength = 1000/fps;
  //setInitialState();
  main(); // Start the cycle
})();