// @flow
import Passable from './Passable';
import Enforce, { enforce } from './Enforce';
import validate from './validate';
import { version } from '../version.json';

function passable(name: string, specific: Specific, passes: Passes) {
    return new Passable(name, specific, passes);
}
passable.VERSION = version;
passable.enforce = enforce;
passable.Enforce = Enforce;
passable.validate = validate;

export default passable;