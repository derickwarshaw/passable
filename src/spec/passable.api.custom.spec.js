'use strict';

import passable from '../index.js';
import { expect } from 'chai';

describe('Test rule extensions', () => {
    it('Should perform three tests', () => {
        expect(noSnuffles.testCount).to.equal(3);
    });

    it('Should fail one test', () => {
        expect(noSnuffles.errorCount).to.equal(1);
    });
});

const noSnuffles = passable('ExtendTests', null, (pass, warn, enforce) => {
    pass('NoSnuffles', 'should pass', () => {
        enforce('The name is Snowball').no_slave_name();
    });

    pass('NoSnuffles', 'should Fail', () => {

        enforce('The name is Snuffles').allOf({
            no_slave_name: {},
            largerThan: 5
        }, 'here').fin();
    });

    pass('regularTest', 'should pass', () => {
        enforce(55).allOf({
            largerThan: 42
        });
    });

}, {
    no_slave_name: (v) => v.indexOf('Snuffles') === -1
});
