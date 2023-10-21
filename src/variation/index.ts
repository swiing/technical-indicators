/**
 * variation
 * @param data
 * @param timeshift
 */
export default function* variation(data: Float64Array, timeshift: number) {
  if (timeshift < 1)
    throw new RangeError('[variation] specified timeshift must be at least 1');

  for (let i = timeshift; i < data.length; i += 1)
    yield data[i] / data[i - timeshift] - 1;
}
