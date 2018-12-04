const Frame = require("./frame");

describe("Test if a frame is the last one", () => {
  test("a frame is the last one if it does not have the following frame", () => {
    let frame = new Frame();
    expect(frame.isTheLastOne()).toBe(true);
  });
  test("a frame is not the last one if it has a following frame", () => {
    let currentFrame = new Frame();
    let nextFrame = new Frame();
    currentFrame.setNextFrame(nextFrame);

    expect(currentFrame.isTheLastOne()).toBe(false);
  });
});

describe("Test completeness of frame", () => {
  test("an incomplete frame", () => {
    let frame = new Frame();
    expect(frame.isComplete()).toBeFalsy();
  });

  test("a normal complete frame", () => {
    let frame = new Frame();
    let nextFrame = new Frame();
    frame.setNextFrame(nextFrame);

    frame.addRoll(0);
    frame.addRoll(0);
    expect(frame.isComplete()).toBeTruthy();
  });

  test("a complete strike frame", () => {
    let frame = new Frame();
    let nextFrame = new Frame();
    frame.setNextFrame(nextFrame);

    frame.addRoll(10);
    expect(frame.isComplete()).toBeTruthy();
  });

  test("a complete last frame with 3 rolls", () => {
    let lastFrame = new Frame();
    lastFrame.addRoll(10);
    lastFrame.addRoll(10);
    lastFrame.addRoll(10);
    expect(lastFrame.isComplete()).toBeTruthy();
  });
  test("a complete last frame with 2 rolls", () => {
    let lastFrame = new Frame();
    lastFrame.addRoll(0);
    lastFrame.addRoll(0);
    expect(lastFrame.isComplete()).toBeTruthy();
  });
  test("a complete last frame with spare", () => {
    let lastFrame = new Frame();
    lastFrame.addRoll(5);
    lastFrame.addRoll(5);
    lastFrame.addRoll(3);
    expect(lastFrame.isComplete()).toBeTruthy();
  });
});
