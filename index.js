import { PerformanceObserver } from "perf_hooks";

const formatTime = (ms) => new Date(ms).toLocaleString();

console.log(`time origin: ${formatTime(performance.timeOrigin)}`);

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach(({ entryType, startTime }) => {
    // gc performance entries aren't relative to timeOrigin
    console.log(entryType, formatTime(startTime + performance.timeOrigin));
  });
});
observer.observe({
  entryTypes: ["mark", "gc"],
});

// Mark entries are relative to timeOrigin
performance.mark("foo");

// Create some objects
setInterval(() => {
  const arr = new Array(1_000_000).fill(0);
  for (let i = 0; i < arr.length; i++) {
    arr[i] += 1;
  }
}, 1_000);
