import sma from './sma';

describe('sma test', () => {
  it('should yield simple moving average', () => {
    const input = [10, 11, 12, 13, 14, 15];
    const period = 4;
    const output = [11.5, 12.5, 13.5];

    const generator = sma(new Float64Array(input), period);

    while (output.length) expect(generator.next().value).toBe(output.shift());
    expect(generator.next().done).toBe(true);
  });

  it('should throw in case of too large period', () => {
    const input = [10, 11, 12, 13, 14, 15];
    const period = input.length + 1;

    const generator = sma(new Float64Array(input), period);
    expect(generator.next).toThrow();
  });

  it('should throw in case of non-positive period', () => {
    const input = [10, 11, 12, 13, 14, 15];
    const period = -1;

    const generator = sma(new Float64Array(input), period);
    expect(generator.next).toThrow();
  });
});
