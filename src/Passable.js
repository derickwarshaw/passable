// @flow

import passRunner from './pass_runner';
import ResultObject from './result_object';
import { passableArgs, runtimeError, buildSpecificObject } from 'Helpers';
import { Errors } from 'Constants';

const FAIL: Severity = 'fail';

class Passable {

    specific: SpecificObject;
    res: ResultObject;
    pass: Function;

    constructor(name: string, specific: Specific, passes: Passes) {
        if (typeof name !== 'string') {
            throw runtimeError(Errors.INVALID_FORM_NAME, typeof name);
        }
        const computedArgs: PassableRuntime = passableArgs(specific, passes);

        this.specific = computedArgs.specific;
        this.res = new ResultObject(name);
        this.pass = this.pass.bind(this);

        computedArgs.passes(this.pass);

        return this.res;
    }

    pass(fieldName: string, statement: string, ...args: [Severity, Pass]) {
        const { only, not }: { [filter: string]: Set<string>} = this.specific;
        const notInOnly: boolean = only.size > 0 && !only.has(fieldName);

        if (notInOnly || not.has(fieldName)) {
            this.res.addToSkipped(fieldName);
            return null;
        }

        this.res.initFieldCounters(fieldName);

        const lastIndex: number = args.length - 1;
        let callback: Function;

        if (typeof args[lastIndex] === 'function') {
            callback = args[lastIndex];
        } else {
            return true;
        }

        const isValid: boolean = passRunner(callback);

        if (!isValid) {
            const severity: Severity = lastIndex !== 0 ? args[0] : FAIL;

            // on failure/error, bump up the counters
            this.res.fail(fieldName, statement, severity);
        }

        this.res.bumpTestCounter(fieldName);
        return isValid;
    }
}

export default Passable;