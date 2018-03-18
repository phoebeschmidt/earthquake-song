import { expect } from 'chai';
import { scaleFunc, scaleArray } from '../services/dataTransformer';
import config from '../config';

describe('dataTransformer tests', () => {
    describe('scaleFunc', () => {
        it('should scale given number', () => {
            let result = scaleFunc(20, 0, 10, 0, 100);
            expect(result).to.equal(2);
        });

        it('should scale floats', () => {
            let result = scaleFunc(33.3, 0.0, 10.0, 0.0, 100.0);
            expect(result).to.equal(3.33);
        });
    });

    describe('scaleArray', () => {
        it('should scale all values to between provided max and min', () => {
            const now = Date.now();
            let times = [now];
            for (let i = 1; i < 10; i++) {
                times.push(now - (i * 10));
            }
            let result = scaleArray(times, config.TIMESCALE_MIN, config.TIMESCALE_MAX);
            result.forEach(x => {
                expect(x <= config.TIMESCALE_MAX).to.equal(true);
                expect(x >= config.TIMESCALE_MIN).to.equal(true);
            });
        });
    });
})
