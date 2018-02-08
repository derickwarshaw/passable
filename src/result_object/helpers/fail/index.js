// @flow
import PassableResponse from '../../index';

type CountName = 'failCount' | 'warnCount';
type ObjectName = 'validationErrors' | 'validationWarnings';
type ValidationName = 'hasValidationErrors' | 'hasValidationWarnings';

function fail(fieldName: string, statement: string, warn?: boolean): PassableResponse {

    const countName: CountName = warn ? 'warnCount' : 'failCount',
        objectName: objectName = warn ? 'validationWarnings' : 'validationErrors',
        validationName: ValidationName = warn ? 'hasValidationWarnings' : 'hasValidationErrors';

    this[validationName] = true;
    this[objectName][fieldName] = this[objectName][fieldName] || [];
    this[objectName][fieldName].push(statement);
    this[countName]++;
    this.testsPerformed[fieldName][countName]++;

    return this;
}

export default fail;