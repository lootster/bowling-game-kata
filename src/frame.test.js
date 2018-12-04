const Frame = require("./frame");

describe("Test completeness of frame", () => {
  test("an incomplete frame", () => {
    let frame = new Frame();
    expect(frame.isComplete()).toBeFalsy();
  });

  test("a normal complete frame", () => {
    let frame = new Frame();
    frame.addRoll(0);
    frame.addRoll(0);
    expect(frame.isComplete()).toBeTruthy();
  });

  test("a complete strike frame", () => {
    let frame = new Frame();
    frame.addRoll(10);
    expect(frame.isComplete()).toBeTruthy();
  });
});
