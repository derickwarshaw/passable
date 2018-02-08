// @flow

import passRunner from './pass_runner';
import ResultObject from './result_object';
import { passableArgs, runtimeError, buildSpecificObject } from 'Helpers';
import { Errors } from 'Constants';

const defaultWarn: TestReturn = {
    warn: () => undefined
};

class Passable {

    specific: SpecificObject;
    res: ResultObject;
    test: TestFunc;

    constructor(name: string, specific: Specific, passes: Passes) {
        if (typeof name !== 'string') {
            throw runtimeError(Errors.INVALID_FORM_NAME, typeof name);
        }
        const computedArgs: PassableRuntime = passableArgs(specific, passes);

        this.specific = computedArgs.specific;
        this.res = new ResultObject(name);

        computedArgs.passes(this.test);

        return this.res.seal();
    }

    test = (fieldName: string, statement: string, pass: PassCB) => {
        const { only, not }: { [filter: string]: Set<string>} = this.specific;
        const notInOnly: boolean = only.size > 0 && !only.has(fieldName);

        if (notInOnly || not.has(fieldName)) {
            this.res.addToSkipped(fieldName);
            return defaultWarn;
        }

        if (typeof pass !== 'function') {
            return defaultWarn;
        }

        this.res.initField(fieldName);

        const isValid: boolean = passRunner(pass);

        const testData = {
            fieldName,
            statement,
            isValid
        };

        this.res.setTest(testData);

        return {
            warn: () => testData.warn = true
        };
    }
}

export default Passable;