import assert from "node:assert/strict";
import test from "node:test";

import { startSecondClock } from "../app/_components/second-clock.ts";

test("ticks every second while visible and pauses while the page is hidden", () => {
  let visible = true;
  let visibilityListener;
  let timeoutCallback;
  let intervalCallback;
  let timeoutClears = 0;
  let intervalClears = 0;
  const ticks = [];
  const times = [
    new Date("2026-10-08T12:00:00.250Z"),
    new Date("2026-10-08T12:00:01.000Z"),
    new Date("2026-10-08T12:00:02.000Z"),
    new Date("2026-10-08T12:00:05.400Z"),
  ];

  const stop = startSecondClock({
    onTick: (time) => ticks.push(time.toISOString()),
    now: () => times.shift(),
    isVisible: () => visible,
    subscribeVisibility: (listener) => {
      visibilityListener = listener;
      return () => { visibilityListener = undefined; };
    },
    setTimeout: (callback, delay) => {
      assert.equal(delay, ticks.length === 1 ? 750 : 600);
      timeoutCallback = callback;
      return 1;
    },
    clearTimeout: () => { timeoutClears += 1; },
    setInterval: (callback, delay) => {
      assert.equal(delay, 1_000);
      intervalCallback = callback;
      return 2;
    },
    clearInterval: () => { intervalClears += 1; },
  });

  assert.deepEqual(ticks, ["2026-10-08T12:00:00.250Z"]);
  timeoutCallback();
  intervalCallback();
  assert.deepEqual(ticks, [
    "2026-10-08T12:00:00.250Z",
    "2026-10-08T12:00:01.000Z",
    "2026-10-08T12:00:02.000Z",
  ]);

  visible = false;
  visibilityListener();
  assert.equal(timeoutClears, 1);
  assert.equal(intervalClears, 1);

  visible = true;
  visibilityListener();
  assert.equal(ticks.at(-1), "2026-10-08T12:00:05.400Z");

  stop();
  assert.equal(timeoutClears, 2);
  assert.equal(intervalClears, 1);
  assert.equal(visibilityListener, undefined);
});
