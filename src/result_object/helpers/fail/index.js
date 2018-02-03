// @flow
import PassableResponse from '../../index';

const WARN: string = 'warn';
type CountName = 'errorCount' | 'warnCount';
type ObjectName = 'validationErrors' | 'validationWarnings';
type ValidationName = 'hasValidationErrors' | 'hasValidationWarnings';

function fail(fieldName: string, statement: string, severity: Severity): PassableResponse {
    const isError: boolean = (severity !== WARN);

    const countName: CountName = isError? 'errorCount' : 'warnCount',
        objectName: objectName = isError? 'validationErrors' : 'validationWarnings',
        validationName: ValidationName = isError? 'hasValidationErrors' : 'hasValidationWarnings';

    this[validationName] = true;
    this[objectName][fieldName] = this[objectName][fieldName] || [];
    this[objectName][fieldName].push(statement);
    this[countName]++;
    this.testsPerformed[fieldName][countName]++;

    return this;
}

export default fail;