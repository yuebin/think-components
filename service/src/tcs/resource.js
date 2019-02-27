import { TCSObject } from "./TCSObject";
class Resource extends TCSObject {
    constructor() {
        super();
        super.defaultProps({}, 'rid');
    }
}
export { Resource };
