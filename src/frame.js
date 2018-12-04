const NO_OF_FRAMES_IN_BOWLING_GAME = 10;

module.exports = class Frame {
  constructor(frameIndex) {
    this.rolls = [];
    this.frameIndex = frameIndex;
  }
  addRoll(pins) {
    this.rolls.push(pins);
  }

  isTheLastOne() {
    return this.frameIndex == NO_OF_FRAMES_IN_BOWLING_GAME;
  }

  setNextFrame(nextFrame) {
    this.nextFrame = nextFrame;
  }

  frameScore() {
    if (!this.isComplete()) throw new Error("The frame is not completed yet");

    if (this.isSpareFrame()) {
      return this.sumOfAllPins() + this.spareBonus();
    }
    if (this.isStrikeFrame()) {
      return this.sumOfAllPins() + this.spikeBonus();
    }
    return this.sumOfAllPins();
  }

  isStrikeFrame() {
    return this.rolls.length === 1 && this.rolls[0] === 10;
  }

  spikeBonus() {
    if (this.nextFrame.isStrikeFrame()) {
      return this.nextFrame.rolls[0] + this.nextFrame.nextFrame.rolls[0];
    } else {
      return this.nextFrame.rolls[0] + this.nextFrame.rolls[1];
    }
  }

  spareBonus() {
    return this.nextFrame.rolls[0];
  }

  sumOfAllPins() {
    return this.rolls.reduce((a, b) => a + b);
  }

  isComplete() {
    if (this.isTheLastOne()) {
      if (this.firstRollHitTenPins() || this.isSpareFrame()) {
        return this.rolls.length === 3;
      } else {
        return this.rolls.length === 2;
      }
    } else {
      if (this.firstRollHitTenPins()) return this.rolls.length === 1;
      return this.rolls.length === 2;
    }
  }

  firstRollHitTenPins() {
    return this.rolls[0] === 10;
  }

  isSpareFrame() {
    return this.rolls[0] + this.rolls[1] === 10;
  }
};
