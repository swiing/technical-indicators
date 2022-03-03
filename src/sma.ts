/**
 * Simple moving average
 * @param data
 * @param period
 * @returns
 */
export default function* sma(data: Float64Array, period: number) {
  const len = data.length;
  let ma = 0;
  let i = 0;

  if (period <= 0) throw new RangeError('Period must be a positive integer');

  if (len < period)
    throw new RangeError('Specified period is too big for computing sma');

  while (i < period) {
    ma += data[i];
    i += 1;
  }

  // code coverage will be confused here - https://github.com/kulshekhar/ts-jest/issues/332
  /* istanbul ignore next */ // does not work
  // while (true) {
  for (;;) {
    yield ma / period;
    if (i >= len) return;
    ma += data[i] - data[i - period];
    i += 1;
  }
}
