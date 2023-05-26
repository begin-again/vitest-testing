import {describe, expect, test } from 'vitest';

/**
 *
 * @param  {number[]} numbers
 * @returns {number} sum of numbers
 */
function sum(...numbers){
    return numbers.reduce((acc, num) => acc + num, 0);
}

describe('sum', () => {
    test('1+1', () => {
        expect(sum(1,1)).toEqual(2);
    });
    test('empty', () => {
        expect(sum()).toEqual(0);
    });
    test('single', () => {
        expect(sum(1)).toEqual(1);
    });
});
