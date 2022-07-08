import { Complex } from "./complex.js";

const drawCircle = (ctx, x, y, r, strokeWidth = 1, color) => {
    ctx.beginPath();
    ctx.lineWidth = strokeWidth * 0.2;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
};
    
const drawLine = (ctx, x1, y1, x2, y2, stroke = 1, color) => {
    ctx.beginPath();
    ctx.lineWidth = stroke;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
};
    
const drawCurve = (ctx, pointsArr, curveColor, lineStroke) => {
    for (let i = 0; i < pointsArr.length; i++) {
      if (pointsArr[i + 1])
        drawLine(ctx, pointsArr[i].x, pointsArr[i].y, pointsArr[i + 1].x, pointsArr[i + 1].y, lineStroke, curveColor);
    }
};
  
const epicycles = (ctx, x,y,time,scale,rotation,fourier,colors=["black","white","white"],strokewidth, drawflag=true) => {
    for (let i = 0; i < fourier.length; i++) {
      const prevX = x;
      const prevY = y;
  
      const freq = fourier[i][3];
      const radius = fourier[i][2]*scale;
      const loc =  new Complex(fourier[i][0],fourier[i][1]);
      const phase = loc.phase() 
  
      x += radius * Math.cos(2 * Math.PI* freq * time + phase + rotation);
      y += radius * Math.sin(2 * Math.PI* freq * time + phase + rotation);
      if (drawflag) {
        drawLine(ctx, prevX, prevY, x, y, strokewidth[0], colors[2]);
        drawCircle(ctx, prevX, prevY, radius, strokewidth[1],colors[1]);
      };
    }
    return { x, y };
};

export {epicycles,drawCurve};