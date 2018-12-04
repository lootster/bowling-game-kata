const Game = require("./game");

describe("game score is calculated by summing up the socre of each frame", () => {
  test("game score is 0 for a gutter game session", () => {
    let game = new Game();
    rollNTimes(game, 20, 0);
    expect(game.score()).toBe(0);
  });

  test("game score is 20 for a game session with 20 rolls of 1 pin", () => {
    let game = new Game();
    rollNTimes(game, 20, 1);
    expect(game.score()).toBe(20);
  });
  test("game score is 16 for a game session with first frame as spare", () => {
    let game = new Game();
    game.roll(5);
    game.roll(5);
    game.roll(3);
    rollNTimes(game, 17, 0);
    expect(game.score()).toBe(16);
  });
  test("game score is 14 for a game session with first frame as spike", () => {
    let game = new Game();
    game.roll(10);
    game.roll(1);
    game.roll(1);
    rollNTimes(game, 16, 0);
    expect(game.score()).toBe(14);
  });
});

function rollNTimes(game, times, pins) {
  for (let i = 0; i < times; i++) {
    game.roll(pins);
  }
}
