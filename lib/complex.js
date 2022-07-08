
class Complex {
    constructor(x, y) {
      this.re = x;
      this.im = y;
    }
  
    add(other) {
      const re = this.re + other.re;
      const im = this.im + other.im;
      return new Complex(re, im);
    }
  
    multiply(other) {
      const re = this.re * other.re - this.im * other.im;
      const im = this.re * other.im + this.im * other.re;
      return new Complex(re, im);
    }
  
    divide(other) {
      const re = (this.re * other.re + this.im * other.im) / (other.re * other.re + other.im * other.im);
      const im = (this.im * other.re - this.re * other.im) / (other.re * other.re + other.im * other.im);
      return new Complex(re, im);
    }
  
    amplitude() {
      return Math.sqrt(this.re * this.re + this.im * this.im);
    }
  
    phase() {
      return Math.atan2(this.im, this.re);
    }
  }
  
  
class curve {
    constructor (x,id){
      this.coeffs = x;
      this.graphpoints = [];
      this.mode = 1  ;
      this.canvas = document.querySelector(id);
      this.t = 0 ;
      this.id = 0;
      this.stopflag = 0;  
  }
  }

  export {Complex,curve};