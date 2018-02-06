// @flow

declare type AnyValue = any; // eslint-disable-line flowtype/no-weak-types

declare type Tests = {
    [name: string]: AnyValue
};

declare type ArrayOrStringOfArrays = Array<string> | string;

declare type Specific = Array<string> | string | {
    only?: ArrayOrStringOfArrays,
    not?: ArrayOrStringOfArrays
};

declare type PassRunnerCallback = {
    valid: boolean
} | void | null;

declare type NumStrBool = number | string | boolean;

declare type MapType = Map<mixed, mixed>;

declare type Severity = 'warn' | 'fail';

declare type Pass = () => void;
declare type Passes = (pass: Pass) => void;

declare type PassableRuntime = {
    specific: SpecificObject,
    passes: Passes
};

declare type ValidityObject = {
    valid: boolean,
    message?: string
};

declare type SpecificObject = {
    only: Set<string>,
    not: Set<string>
};

declare type EnforceRule = (value: AnyValue, ...args: AnyValue) => boolean;
declare type EnforceRules = {
    [rule: string]: EnforceRule
};
declare type EnforceProxy = {
    [rule: string]: (value: AnyValue, ...args: AnyValue) => EnforceProxy;
};
declare type ProxiedRule = (value: AnyValue, ...args: AnyValue) => EnforceProxy;
declare type EnforceFunc = (AnyValue) => EnforceRules;