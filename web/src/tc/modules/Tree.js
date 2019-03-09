
class Tree {

    constructor() {
        this.trees = [];
        this.attrs = new Map();
        this.actionType = null;
        this.action = null;
        this.id = null;
    }

    setName(title) {
        this.title = title;
    }

    setAttribute(attrKey, attrValue) {
        this.attrs.set(attrKey, attrValue);
    }

    setActionType(actionType) {
        this.actionType = actionType;
    }

    setAction(action) {
        this.action = action;
    }

    add(tree) {
        this.trees.push(tree);
    }

    setId(id){
        this.id = id;
    }

}

export { Tree }