// @flow
import { runtimeError, isSpecific, buildSpecificObject } from 'Helpers';
import { Errors } from 'Constants';

/**
 * Get Passable configuration settings
 * specific - whitelist of tests to run
 * passes - The function which runs the validations
 *
 * @param {Array | String | Object} specific
 * @param {passes} Function
 * @return {object} Passable configuration settings
 */
function passableArgs(specific: Specific, passes: Passes): PassableRuntime {

    if (!arguments.length) {
        throw runtimeError(Errors.PASSABLE_ARGS_NO_ARGS);
    }

    if (typeof passes !== 'function') {
        throw runtimeError(Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_1, typeof passes);
    }

    if (!isSpecific(specific)) {
        throw runtimeError(Errors.PASSABLE_ARGS_UNEXPECTED_ARGS_2);
    }

    return {
        specific: buildSpecificObject(specific),
        passes
    };
};

export default passableArgs;
