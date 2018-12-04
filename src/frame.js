module.exports = class Frame {
  constructor() {
    this.rolls = [];
  }
  addRoll(pins) {
    this.rolls.push(pins);
  }

  isTheLastOne() {
    return this.nextFrame === undefined;
  }

  setNextFrame(nextFrame) {
    this.nextFrame = nextFrame;
  }

  isComplete() {
    if (this.isTheLastOne()) {
      if (this.firstRollHitTenPins()) {
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
};
