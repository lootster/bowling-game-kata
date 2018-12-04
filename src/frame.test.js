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

describe("test calculating score of a frame", () => {
  test("an incompete frame does not have a score", () => {
    let frame = new Frame();
    expect(() => frame.frameScore()).toThrow("The frame is not completed yet");
  });

  test("score of a normal frame is just the sum of the pins in all rolls", () => {
    let frame = new Frame();
    let nextFrame = new Frame();
    frame.setNextFrame(nextFrame);

    frame.addRoll(1);
    frame.addRoll(1);

    expect(frame.frameScore()).toBe(2);
  });

  test("score of a last frame is just the sum of the pins in all rolls", () => {
    let frame = new Frame();

    frame.addRoll(10);
    frame.addRoll(1);
    frame.addRoll(1);

    expect(frame.frameScore()).toBe(12);
  });
  test("score of a spare frame is the sum of the pins in all rolls, plus the pins in the next roll", () => {
    let frame = new Frame();
    let nextFrame = new Frame();
    frame.setNextFrame(nextFrame);

    frame.addRoll(5);
    frame.addRoll(5);
    nextFrame.addRoll(2);

    expect(frame.frameScore()).toBe(12);
  });

  describe("score of a strike frame is the sum of the pins in all rolls, plus the pins in the next two rolls", () => {
    test("when the next frame is not a spike", () => {
      let frame = new Frame();
      let nextFrame = new Frame();
      frame.setNextFrame(nextFrame);

      frame.addRoll(10);
      nextFrame.addRoll(1);
      nextFrame.addRoll(1);

      expect(frame.frameScore()).toBe(12);
    });
    test("when the next frame is a spike", () => {
      let frame = new Frame();
      let secondFrame = new Frame();
      let thirdFrame = new Frame();
      frame.setNextFrame(secondFrame);
      secondFrame.setNextFrame(thirdFrame);

      frame.addRoll(10);
      secondFrame.addRoll(10);
      thirdFrame.addRoll(10);

      expect(frame.frameScore()).toBe(30);
    });
  });
});
