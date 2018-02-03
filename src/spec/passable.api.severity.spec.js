'use strict';

import passable from '../index.js';
import { expect } from 'chai';

describe('Test warn function', () => {
    it('Should warn and not fail', () => {
        expect(warnPass).to.deep.equal(warnPassExpected);
    });

    it('Should both warn and fail', () => {
        expect(warnFail).to.deep.equal(warnFailExpected);
    });

    it('Should fail but not warn', () => {
        expect(fail).to.deep.equal(failExpected);
    });
});

// Actual test data

const warnPass = passable('WarnPass', null, (pass, warn, enforce) => {
        warn('WarnPass', 'should warn', () => false);
    }),
    warnFail = passable('WarnFail', null, (pass, warn, enforce) => {
        warn('Warn', 'should warn', () => false);
        pass('Fail', 'should Fail', () => false);
    }),
    fail = passable('Fail', null, (pass, warn, enforce) => {
        warn('Warn', 'should not warn', () => true);
        pass('Fail', 'should Fail', () => false);
    });

const warnPassExpected = {
        name: 'WarnPass',
        skipped: [],
        hasValidationErrors: false,
        hasValidationWarnings: true,
        testsPerformed: {
            WarnPass: { testCount: 1, errorCount: 0, warnCount: 1 }
        },
        validationErrors: {},
        validationWarnings: { WarnPass: ['should warn'] },
        errorCount: 0,
        warnCount: 1,
        testCount: 1
    },
    warnFailExpected = {
        name: 'WarnFail',
        skipped: [],
        hasValidationErrors: true,
        hasValidationWarnings: true,
        testsPerformed: {
            Warn: { testCount: 1, errorCount: 0, warnCount: 1 },
            Fail: { testCount: 1, errorCount: 1, warnCount: 0 }
        },
        validationErrors: { Fail: ['should Fail'] },
        validationWarnings: { Warn: ['should warn'] },
        errorCount: 1,
        warnCount: 1,
        testCount: 2
    },
    failExpected = {
        name: 'Fail',
        skipped: [],
        hasValidationErrors: true,
        hasValidationWarnings: false,
        testsPerformed: {
            Warn: { testCount: 1, errorCount: 0, warnCount: 0 },
            Fail: { testCount: 1, errorCount: 1, warnCount: 0 }
        },
        validationErrors: { Fail: ['should Fail'] },
        validationWarnings: {},
        errorCount: 1,
        warnCount: 0,
        testCount: 2
    };