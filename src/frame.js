module.exports = class Frame {
  constructor() {
    this.rolls = [];
  }
  addRoll(pins) {
    this.rolls.push(pins);
  }

  isComplete() {
    if (this.isStrike()) return true;
    return this.rolls.length == 2;
  }

  isStrike() {
    return this.rolls.length == 1 && this.rolls[0] == 10;
  }
};
