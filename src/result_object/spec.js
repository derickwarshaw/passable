'use strict';

import ResultObject from './index';
import { expect } from 'chai';

describe('Test PassableResponse class', () => {
    it('Should return correct initial object from constructor', () => {
        expect(new ResultObject('FormName')).to.deep.equal({
            name: 'FormName',
            hasValidationErrors: false,
            hasValidationWarnings: false,
            failCount: 0,
            warnCount: 0,
            testCount: 0,
            tempStorage: [],
            testsPerformed: {},
            validationErrors: {},
            validationWarnings: {},
            skipped: []
        });
    });

    describe('Test initField method', () => {
        let testObject;
        beforeEach(() => testObject = new ResultObject('FormName').initField('example'));
        it('Should add new fields and its counters to `testsPerformed`', () => {

            expect(testObject.testsPerformed).to.deep.equal({
                example: {
                    failCount: 0,
                    testCount: 0,
                    warnCount: 0
                }
            });
        });

        it('Should keep field counters untouched if they already exist', () => {
            Object.assign(testObject.testsPerformed.example, {
                failCount: 5,
                testCount: 5
            });

            expect(testObject.testsPerformed).to.deep.equal({
                example: {
                    failCount: 5,
                    testCount: 5,
                    warnCount: 0
                }
            });
        });
    });

    describe('Test bumpTestCounters method', () => {
        let testObject;
        beforeEach(() => testObject = new ResultObject('FormName').initField('example'));

        it('Should bump test counters in `testsPerformed`', () => {
            testObject.bumpTestCounter('example');
            expect(testObject.testsPerformed).to.deep.equal({
                example: {
                    failCount: 0,
                    testCount: 1,
                    warnCount: 0
                }
            });
        });

        it('Should bump test counters in `testCount` from `0` to `1`', () => {
            expect(testObject.testCount).to.equal(0);
            testObject.bumpTestCounter('example');
            expect(testObject.testCount).to.equal(1);
        });
    });

    describe('Test addToSkipped method', () => {
        let testObject;
        beforeEach(() => testObject = new ResultObject('FormName'));

        it('Should have added field in skipped list', () => {
            testObject.addToSkipped('field_1');
            expect(testObject.tempSkipped.has('field_1')).to.equal(true);
        });

        it('Should have added fields in skipped list', () => {
            testObject.addToSkipped('field_1').addToSkipped('field_2');
            expect(testObject.tempSkipped.has('field_1')).to.equal(true);
            expect(testObject.tempSkipped.has('field_2')).to.equal(true);
        });

        it('Should uniquely add each field', () => {
            testObject
                .addToSkipped('field_1')
                .addToSkipped('field_2')
                .addToSkipped('field_1')
                .addToSkipped('field_2');
            expect(testObject.tempSkipped.size).to.equal(2);
        });
    });

    describe('Test getErrors method', () => {
        let testObject;
        beforeEach(() => {
            testObject = new ResultObject('FormName')
                .initField('example')
                .initField('example_2')
                .fail('example', 'Error string');
        });

        it('Should return errors array for a field with errors', () => {
            expect(testObject.getErrors('example')).to.deep.equal(['Error string']);
        });

        it('Should return empty array for a field with no errors', () => {
            expect(testObject.getErrors('example_2')).to.deep.equal([]);
        });

        it('Should return all errors object when no field specified', () => {
            expect(testObject.getErrors()).to.deep.equal({
                example: ['Error string']
            });
        });
    });

    describe('Test getErrors method', () => {
        let testObject;
        beforeEach(() => {
            testObject = new ResultObject('FormName')
                .initField('example')
                .initField('example_2')
                .fail('example', 'Error string', 'warn');
        });

        it('Should return errors array for a field with errors', () => {
            expect(testObject.getWarnings('example')).to.deep.equal(['Error string']);
        });

        it('Should return empty array for a field with no errors', () => {
            expect(testObject.getWarnings('example_2')).to.deep.equal([]);
        });

        it('Should return all errors object when no field specified', () => {
            expect(testObject.getWarnings()).to.deep.equal({
                example: ['Error string']
            });
        });
    });
});