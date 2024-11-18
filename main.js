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
  new Phasor(0.02, 100, Math.PI / 2),
  new Phasor(0.03, 40, Math.PI / 4),
  new Phasor(0.03, 40, -Math.PI / 4),
];

const p1 = phasors.map((p, i, self) => {
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
