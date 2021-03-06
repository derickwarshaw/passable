export default (passable) => {

    /*
        Test cases:
            * chained Rules
            * Chained custom rules
    */

    const response = passable('case_c', (pass, enforce) => {
        pass('field_1', 'should be a string of 5 chars', () => {
            enforce('hello').allOf({
                sizeEquals: 5,
                isString: true
            });
        });

        pass('field_2', 'must be a number smaller than 90', () => {
            enforce(99).smallerThan(90).isNumber();
        });

        pass('field_3', 'must be the string "hi"', () => {
            enforce('a').stringEquals('hi');
        });

        pass('field_4', 'should be the string "c"', () => {
            enforce('c').allOf({
                matches: /c/
            });
        });

        pass('field_5', 'Must be an empty array', () => {
            enforce(['log']).allOf({
                isArray: true,
                isEmpty: true
            });
        });

        pass('field_5', 'May either be an empty array or larger than 3', () => {
            enforce([0, 1, 2, 3, 4, 5]).allOf({
                isArray: true
            }).anyOf({
                isEmpty: true,
                largerThanOrEquals: 4
            });
        });
    }, {
        stringEquals: (value, arg1) => typeof value === 'string' && arg1 === value
    });

    const expect = {
        name: 'case_c',
        hasValidationErrors: true,
        hasValidationWarnings: false,
        failCount: 3,
        warnCount: 0,
        testCount: 6,
        testsPerformed: {
            field_1: {
                testCount: 1,
                failCount: 0,
                warnCount: 0
            },
            field_2: {
                testCount: 1,
                failCount: 1,
                warnCount: 0
            },
            field_3: {
                testCount: 1,
                failCount: 1,
                warnCount: 0
            },
            field_4: {
                testCount: 1,
                failCount: 0,
                warnCount: 0
            },
            field_5: {
                testCount: 2,
                failCount: 1,
                warnCount: 0
            }
        },
        validationErrors: {
            field_2: [
                'must be a number smaller than 90'
            ],
            field_3: [
                'must be the string "hi"'
            ],
            field_5: [
                'Must be an empty array'
            ]
        },
        validationWarnings: {},
        skipped: []
    };

    return {
        response,
        expect
    };
};