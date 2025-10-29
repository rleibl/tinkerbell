

const sleepNow = 
    (delay) => new Promise((resolve) => setTimeout(resolve, delay));

var running = false;

function startstop() {
    b = document.getElementById('btnstart');

    if( !running) {
        b.textContent = "Stop";
        tinkerbell();
        running = true;
    } else {
        b.textContent = "Start";
        running = false;
    }

}

function reset() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.reset();
}

function log(message) {

    d = document.getElementById("log");
    t = d.innerHTML;
    d.innerHTML = message + "<br>" + t
}

function setstatus(message) {

    d = document.getElementById("status");
    d.innerHTML = message;
}

async function tinkerbell() {

  const iterations = document.getElementById('iterations').value;
  const delay = document.getElementById('delay').value;

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // save strokeStyle
  stroke = ctx.strokeStyle;
  ctx.strokeStyle = "rgb(200 200 200)";

  ctx.beginPath();
  ctx.moveTo(500,30);
  ctx.lineTo(500, 970);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(30, 500);
  ctx.lineTo(970, 500);
  ctx.stroke();

  // restore strokeStyle
  ctx.strokeStyle = stroke;

  var a = 0.9;
  var b = -0.6013;
  var c = 2.0;
  var d = 0.50;

  var x = -0.72;
  var y = -0.64;


  for( let i=1; i<=iterations; i++ ) {

          x_tmp = x*x - y*y + a*x + b*y;
          y = 2*x*y + c*x + d*y;
          x = x_tmp;

          var x_draw = x * 300;
          var y_draw = y * 300;
              
          drawPoint(ctx, x_draw+500, y_draw+500);
          if( i % 10 == 0 ) {
              setstatus(i + " Dots")
          }
          await sleepNow(delay);
          if( !running) {
              return;
          }
  }

  startstop()
}

function drawPoint(context, x, y) {
  context.beginPath();
  context.arc(x, y, 1, 0, 2 * Math.PI, true);
  context.stroke();
}
