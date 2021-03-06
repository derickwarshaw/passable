// @flow
function findArrayValuesInObjectKeys(array: Array<NumStrBool>, object: Object): boolean { // eslint-disable-line flowtype/no-weak-types

    return array.every((element) => object && object.hasOwnProperty(element));
}

export default findArrayValuesInObjectKeys;