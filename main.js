import { me,me_v2 ,me_v3,ankur,Harsh} from "./dat.js";
import { Complex,curve} from "./complex.js";

const canvas = document.querySelector("#my_image");
canvas.height =  window.innerHeight;
canvas.width = window.innerWidth;

const dimension = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

let stopID; 
let graphPoints = [];
let circleStroke = 1.1;
let lineStroke = 1.3;
let fps = 60;
let dt = 0.0015;
let time = 0;
let curveColor = "#e55d47";
let circleColor = "grey";
let lineColor = "grey";

let mycurve = new curve(me_v3,"#my_image");
mycurve.mode =  1;


const drawCircle = (x, y, r, strokeWidth = 1, s = false, color=circleColor) => {
  ctx.beginPath();
  ctx.lineWidth = strokeWidth * 0.2;
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  if (s) {
    ctx.fillStyle = color;
    ctx.fill();
    return;
  }
  ctx.strokeStyle = color;
  ctx.stroke();
};
  
const drawLine = (x1, y1, x2, y2, stroke = 1, color = lineColor) => {
  ctx.beginPath();
  ctx.lineWidth = stroke;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.stroke();
};
  
const drawCurve = (pointsArr) => {
  for (let i = 0; i < pointsArr.length; i++) {
    if (pointsArr[i + 1])
      drawLine(pointsArr[i].x, pointsArr[i].y, pointsArr[i + 1].x, pointsArr[i + 1].y, lineStroke, curveColor);
  }
};

const epicycles = (x, y,time, rotation, fourier,draw=true) => {
  for (let i = 0; i < fourier.length; i++) {
    const prevX = x;
    const prevY = y;

    const freq = fourier[i][3];
    const radius = fourier[i][2];
    const loc =  new Complex(fourier[i][0],fourier[i][1]);
    const phase = loc.phase() 

    x += radius * Math.cos(2 * Math.PI* freq * time + phase + rotation);
    y += radius * Math.sin(2 * Math.PI* freq * time + phase + rotation);
    if (draw) {
      drawLine(prevX, prevY, x, y, circleStroke * 0.2);
      drawCircle(prevX, prevY, radius, circleStroke);
    };
  }
  return { x, y };
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const startDrawing = (inptcurve,x= me_v3.width/5 ,y= me_v3.height /5) => {
  const points = epicycles(x, y,inptcurve.t, 0, inptcurve.coeffs);
  if (inptcurve.t<=1.1) {
    inptcurve.graphpoints.unshift(points);
  }
  drawCurve(inptcurve.graphpoints);
}

const update = (inptcurve,dt) => {
  inptcurve.t += dt; // move time t += dt if t!=0
  if (inptcurve.t == 1.1) {window.cancelAnimationFrame( stopID );};
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