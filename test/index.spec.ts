import * as index from '../src/index';

describe('index', () => {
    describe('Public exports', () => {
        it('should export expected symbols', () => {
            const keys = Object.keys(index);
            expect(keys).toEqual([
                'guard',
                'Alert',
                'Confirm',
                'Loader',
                'ErrorStrategy'
            ]);
        });
    });
});
