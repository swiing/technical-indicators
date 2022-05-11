/**
 * rsi - relative strength indicator
 * @param data
 * @param period
 * @returns
 */
// https://school.stockcharts.com/doku.php?id=technical_indicators:relative_strength_index_rsi

export default function* rsi(data: Float64Array, period: number) {
  const periodMinus1 = period - 1;
  let avGain = 0;
  let avLoss = 0;
  let delta;

  if (period <= 0) throw new RangeError('Period must be a positive integer');

  if (period > data.length)
    throw new RangeError('Specified period is too big for computing rsi');

  for (let i = 1; i < period; i += 1) {
    delta = data[i] - data[i - 1];
    if (delta > 0) avGain += delta;
    else avLoss -= delta;
  }

  if (periodMinus1) {
    avGain /= periodMinus1;
    avLoss /= periodMinus1;
  }

  for (let i = period; i < data.length; i += 1) {
    delta = data[i] - data[i - 1];

    // In principle, the calculation does not need /period, however in practice
    // I need to make sure avGain does not overflow (because without /period,
    // avGain would grow dramatically over iterations).
    avGain = (periodMinus1 * avGain + Math.max(delta, 0)) / period;
    avLoss = (periodMinus1 * avLoss - Math.min(delta, 0)) / period;

    yield 100 - 100 / (1 + avGain / avLoss);
  }
}
