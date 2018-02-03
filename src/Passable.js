// @flow

import enforce from './enforce';
import passRunner from './pass_runner';
import ResultObject from './result_object';
import { passableArgs, root, runtimeError, buildSpecificObject } from 'Helpers';
import { Errors } from 'Constants';

const WARN: Severity = 'warn';
const ERROR: Severity = 'error';

class Passable {

    specific: SpecificObject;
    custom: Rules;
    res: ResultObject;

    constructor(name: string, specific: Specific, passes: Passes, custom?: Rules) {
        if (typeof name !== 'string') {
            throw runtimeError(Errors.INVALID_FORM_NAME, typeof name);
        }
        const computedArgs: PassableRuntime = passableArgs(specific, passes, custom),
            globalRules: Rules = root.customPassableRules || {};

        this.specific = computedArgs.specific;
        this.custom = Object.assign({}, globalRules, computedArgs.custom);
        this.res = new ResultObject(name);

        computedArgs.passes(
            this.pass,
            this.warn,
            (value: AnyValue) => enforce(value, this.custom)
        );

        return this.res;
    }

    warn = (fieldName: string, statement: string, fn: Pass): BoolNull => (
        this.test(fieldName, statement, WARN, fn)
    )

    pass = (fieldName: string, statement: string, fn: Pass): BoolNull => (
        this.test(fieldName, statement, ERROR, fn)
    )

    test = (fieldName: string, statement: string, severity: Severity, fn: Pass): BoolNull => {
        const { only, not }: { [filter: string]: Set<string>} = this.specific;
        const notInOnly: boolean = only.size > 0 && !only.has(fieldName);

        if (notInOnly || not.has(fieldName)) {
            this.res.addToSkipped(fieldName);
            return null;
        }

        this.res.initFieldCounters(fieldName);

        if (typeof fn !== 'function') {
            return true;
        }

        const isValid: boolean = passRunner.call(this, fn);

        if (!isValid) {
            // on warning/error, bump up the counters
            this.res.fail(fieldName, statement, severity);
        }

        this.res.bumpTestCounter(fieldName);
        return isValid;
    }
}

export default Passable;