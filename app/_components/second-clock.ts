type SecondClockOptions = {
  onTick: (now: Date) => void;
  now: () => Date;
  isVisible: () => boolean;
  subscribeVisibility: (listener: () => void) => () => void;
  setTimeout: (callback: () => void, delay: number) => number;
  clearTimeout: (id: number) => void;
  setInterval: (callback: () => void, delay: number) => number;
  clearInterval: (id: number) => void;
};

export function startSecondClock(options: SecondClockOptions) {
  let timeoutId: number | undefined;
  let intervalId: number | undefined;

  const clearTimers = () => {
    if (timeoutId !== undefined) options.clearTimeout(timeoutId);
    if (intervalId !== undefined) options.clearInterval(intervalId);
    timeoutId = undefined;
    intervalId = undefined;
  };

  const start = () => {
    clearTimers();
    if (!options.isVisible()) return;

    const current = options.now();
    options.onTick(current);
    const delayToNextSecond = 1_000 - current.getMilliseconds();
    timeoutId = options.setTimeout(() => {
      options.onTick(options.now());
      intervalId = options.setInterval(() => options.onTick(options.now()), 1_000);
    }, delayToNextSecond);
  };

  const unsubscribeVisibility = options.subscribeVisibility(start);
  start();

  return () => {
    clearTimers();
    unsubscribeVisibility();
  };
}
