// @flow
import {getSize} from '../../helpers';

const largerThan: Function = (value: mixed, arg1: mixed): boolean => getSize(value) > getSize(arg1);

export default largerThan;