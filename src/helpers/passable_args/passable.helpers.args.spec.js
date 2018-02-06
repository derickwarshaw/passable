'use strict';

import passableArgs from './index';
import { expect } from 'chai';

const generalArgsError = "[Passable]: Failed to execute 'passableArgs': Unexpected set of arguments. Expected: Specific, Passes.";

describe('Test Passable arguments logic', () => {
    const noop = () => undefined;

    it('Should throw an exception when given no arguments', () => {
        expect(passableArgs.bind(null, [])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected 'undefined', expected passes to be a function.");
    });

    it('Should throw an exception when given only a single argument', () => {
        expect(passableArgs.bind(null, ['basic'])).to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected 'undefined', expected passes to be a function.");
    });

    it('Should throw an exception when passes is not a function', () => {
        expect(passableArgs.bind(null, [], 'noop'))
            .to.throw("[Passable]: Failed to execute 'passableArgs': Unexpected 'string', expected passes to be a function.");
    });

    it('Should throw an exception when specific does not follow convention', () => {
        expect(passableArgs.bind(null, undefined, noop)).to.throw(generalArgsError);
        expect(passableArgs.bind(null, noop, noop)).to.throw(generalArgsError);
        expect(passableArgs.bind(null, true, noop)).to.throw(generalArgsError);
    });

    it('Should return given "passes", default specific to an array', () => {
        const value = passableArgs(null, noop);
        expect(value).to.deep.equal({
            passes: noop,
            specific: {
                only: new Set(),
                not: new Set()
            }
        });
    });

    it('Should return all attrs, not use default values', () => {
        const value = passableArgs(['noop'], noop);
        expect(value).to.deep.equal({
            specific: {
                only: new Set(['noop']),
                not: new Set()
            },
            passes: noop
        });
    });

    it('Should return specific and passes', () => {
        const value = passableArgs(['Yo'], noop);
        expect(value).to.deep.equal({
            specific: {
                only: new Set(['Yo']),
                not: new Set()
            },
            passes: noop
        });
    });

    it('Should return passes, default on specific', () => {
        const value = passableArgs(null, noop);
        expect(value).to.deep.equal({
            specific: {
                only: new Set(),
                not: new Set()
            },
            passes: noop
        });
    });

    it('Should throw an exception if specific is of a wrong type', () => {
        expect(passableArgs.bind(null, true, noop)).to.throw(generalArgsError);
        expect(passableArgs.bind(null, 1, noop)).to.throw(generalArgsError);
    });
});
