import Phasor from "./public/js/phasor";
import "./style.css";

const cnv = document.querySelector(".cnv");
const ctx = cnv.getContext("2d");

const cnvSketch = document.querySelector(".cnv-sketch");
const sketchCtx = cnvSketch.getContext("2d");

cnv.width = innerWidth;
cnv.height = innerHeight;

cnvSketch.width = innerWidth;
cnvSketch.height = innerHeight;

const { sin, cos, PI: pi, log, abs} = Math;

const phasors = [];

for (let i = 1, len = 400; i < len; i += 1) {
  // phasors.push([i * Math.PI / 10, 100/i]);
  // phasors.push([(i + 1) / 1000, 100 / (i + 1)]);
  // phasors.push([i * cos(i * pi / 100) / 500, 10 * sin(i * pi / 100) ** 2]);
  // phasors.push([log(i) / 100, log(i / 10) ** 2 * 10]);
  phasors.push([sin(i) / 10, sin(i * pi / len) * 10]);
}

// const phasors = [
//   [.01, 100],
//   [.02, 20],
//   [.03, 30],
//   [-.01, 30],
//   [-.02, 20],
//   [-.03, 10, -Math.PI / 4],
// ];
//
// const phasors = [
//   [0.01, 100],
//   [-0.02, 50],
//   //[0.02, 30],
//   [-0.03, 20],
//   [0.03, 20, Math.PI / 5],
//   [-0.04, 20, Math.PI / 4],
//   [0.02, 200, Math.PI / 3],
//   [0.1, 20, Math.PI / 2],
//   [0.2, 10, Math.PI / 1],
//   [-0.1, 200],
//   [-0.1, 20],
//   [-0.02, 4],
//   jk,
//   [jk],
//   [-0.02, 4],
// ];
//
const p1 = phasors
  .map((p) => new Phasor(...p))
  .map((p, i, self) => {
    if (i < self.length - 1) p.addPhasor(self[i + 1]);

    return p;
  })[0];

let frames;

addEventListener("click", () => cancelAnimationFrame(frames));

(function animate() {
  frames = requestAnimationFrame(animate);

  ctx.clearRect(0, 0, innerWidth, innerHeight);
  sketchCtx.clearRect(0, 0, innerWidth, innerHeight);

  p1.animate(ctx, sketchCtx);
})();
