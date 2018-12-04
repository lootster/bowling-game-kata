const Frame = require("./frame");

module.exports = class Game {
  constructor() {
    this.frames = [];
    this.currentFrame = null;
    this.currentFrameIndex = 1;
  }

  roll(pin) {
    if (this.currentFrame == null) {
      const frame = new Frame(this.currentFrameIndex++);
      this.frames.push(frame);
      this.currentFrame = frame;
    }

    this.currentFrame.addRoll(pin);

    if (this.currentFrame.isComplete() && !this.currentFrame.isTheLastOne()) {
      const frame = new Frame(this.currentFrameIndex++);
      this.currentFrame.setNextFrame(frame);
      this.frames.push(frame);
      this.currentFrame = frame;
    }
  }

  score() {
    return this.frames.map(frame => frame.frameScore()).reduce((a, b) => a + b);
  }
};
