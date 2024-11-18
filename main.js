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

const phasors = [
  new Phasor(0.02, 40, Math.PI / 3),
  new Phasor(0.2, 4, Math.PI / 2),
  new Phasor(0.02, 20, Math.PI / 3),
  new Phasor(-0.05, 70, Math.PI),
  new Phasor(-0.04, 30),
  new Phasor(-0.03, 20, Math.PI / 3),
  new Phasor(0.02, 40),
  new Phasor(0.01, 100),
  new Phasor(0.1, 4),
];

const p1 = phasors.reduce((a, b) => {
  b.addPhasor(a);
  return b;
});

let frames;

addEventListener("click", () => cancelAnimationFrame(frames));

(function animate() {
  frames = requestAnimationFrame(animate);

  ctx.clearRect(0, 0, innerWidth, innerHeight);
  sketchCtx.clearRect(0, 0, innerWidth, innerHeight);

  p1.animate(ctx, sketchCtx);
})();
