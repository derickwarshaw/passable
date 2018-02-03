// @flow

declare type AnyValue = any; // eslint-disable-line flowtype/no-weak-types

declare type Rules = {
    [name: string]: Function
};

declare type Tests = {
    [name: string]: AnyValue
};

declare type ArrayOrStringOfArrays = Array<string> | string;

declare type Specific = Array<string> | string | {
    only?: ArrayOrStringOfArrays,
    not?: ArrayOrStringOfArrays
} | null;

declare type PassRunnerCallback = {
    valid: boolean
} | void | null;

declare type NumStrBool = number | string | boolean;

declare type MapType = Map<mixed, mixed>;

declare type EnforceSelf = {
    [testRunner: string]: Function,
    fin: Function,
    valid?: boolean
};

declare type Severity = 'warn' | 'error';
declare type BoolNull = boolean | null;
declare type Pass = () => void;
declare type Enforce = (AnyValue, Rules) => EnforceSelf;

declare type TestFunction = (fieldName: string, statement: string, fn: Function) => BoolNull;
declare type Passes = (pass: TestFunction, warn: TestFunction, enforce: Enforce) => void;

declare type PassableRuntime = {
    specific: SpecificObject,
    passes: Passes,
    custom: Rules
};

declare type ValidityObject = {
    valid: boolean,
    message?: string
};

declare type SpecificObject = {
    only: Set<string>,
    not: Set<string>
};