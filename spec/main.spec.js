'use strict';

describe('main.js', () => {
    
    describe('calcPercentage()', () => {
        it('should show a positive and negative percent value', () => {
            let fn = calcPercentage('18143089', '51638022');
            expect(fn).toEqual({negative: 26, positive: 73});
        });
    });

    describe('changeItems()', () => {
        it('should return an array with positive and negative percent value', () => {
            let fn = changeItems([{negative: '18143089', positive: '51638022'}]);
            expect(fn).toEqual([{negative: 26, positive: 73}]);
        });
    });

    describe('sortItems()', () => {
        it('should return an array sorted', () => {
            let fn = sortItems([{negative: '35', positive: '65'}, {negative: '23', positive: '77'}]);
            expect(fn).toEqual([{negative: '23', positive: '77'}, {negative: '35', positive: '65'}]);
        });
    });

});