class Phasor {
  constructor(omega, r, phase = 0) {
    this.initial = [innerWidth / 2, innerHeight / 2];
    this.omega = omega;
    this.r = r / 2;
    this.phase = phase;
    this.path = new Path2D();

    this.phasor = null;

    Phasor.phasors.push(this);
  }

  addPhasor(phasor) {
    phasor.initial = [
      this.initial[0] + this.r * Math.cos(this.phase),
      this.initial[1] + this.r * Math.sin(this.phase),
    ];

    const penInitial = [
      phasor.initial[0] + phasor.r * Math.cos(phasor.phase),
      phasor.initial[1] + phasor.r * Math.sin(phasor.phase),
    ];

    phasor.path.moveTo(...penInitial);

    this.phasor = phasor;
  }

  draw(ctx, sketchCtx) {
    const x = this.r * Math.cos(this.phase);
    const y = this.r * Math.sin(this.phase);

    ctx.save();
    ctx.beginPath();
    ctx.arc(...this.initial, this.r, 0, Math.PI * 2);
    ctx.strokeStyle = "#0005";
    ctx.stroke();

    ctx.beginPath();
    ctx.translate(...this.initial);
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#0005";
    ctx.stroke();

    ctx.restore();

    if (this.phasor) return;
    sketchCtx.save();
    this.path.lineTo(this.initial[0] + x, this.initial[1] + y);
    sketchCtx.lineWidth = 1;
    sketchCtx.strokeStyle = "red";
    sketchCtx.stroke(this.path);
    sketchCtx.restore();
  }

  animate(ctx, sketchCtx) {
    this.phase += this.omega;

    const initialX = this.initial[0] + this.r * Math.cos(this.phase);
    const initialY = this.initial[1] + this.r * Math.sin(this.phase);

    if (this.phasor) {
      this.phasor.initial[0] = initialX;
      this.phasor.initial[1] = initialY;
    }

    this.draw(ctx, sketchCtx);
    this.phasor?.animate(ctx, sketchCtx);
  }

  static phasors = [];
}

export default Phasor;
