import { TCSObject } from "../../TCSObject";

class Table extends TCSObject {
    constructor() {
        super();
        this.rows = [];
    }
    getSQL() {
    }
    getParams() {
    }
}

class Row extends TCSObject {
    constructor() {
        super();
        this.cells = new Map();
        this.operation = null;
    }
    get(key) {
        return this.cells.get(key);
    }
    set(key, value) {
        this.cells.set(key, value);
    }
}
export { Table, Row };
