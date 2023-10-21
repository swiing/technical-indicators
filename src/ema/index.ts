/**
 *  ema - exponential moving average
 */

// inspired by https://stackoverflow.com/questions/40057020/calculating-exponential-moving-average-ema-using-javascript
// Note: this is not the usual implementation, whereby initiation usually
// starts with a simple average. However I prefer this version because
// early values better reflect the exponential nature of the average
// (in the long run, the difference become close to zero).
export default function* ema(data: Float64Array, range: number) {
  if (range < 1) throw new RangeError('[ema] range must be greater than 1');

  const k = 2 / (range + 1);

  // first item is just the same as the first item in the input
  // for the rest of the items, they are computed with the previous one
  for (let i = 0, prev = data[0]; i < data.length; i += 1) {
    prev = k * data[i] + (1 - k) * prev;
    yield prev;
  }
}
