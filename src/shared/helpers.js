class Deferrable {
    constructor(props) {
        this.actions = [];
    }

    add(action) {
        if (typeof action !== "function") {
            throw "Can only add functions to a Deferrable";
        }
        this.actions.push(action);
    }

    execute() {
        while (this.actions.length) {
            const action = this.actions.pop();
            action();
        }
    }
}

HTMLCollection.prototype.forEach = function (func) {
    for (let i = 0; i < this.length; i++) {
        func(this[i], i, this);
    }
}



HTMLElement.prototype.removeChildren = function (selector) {
    this.children.forEach(x => {
        if (!selector || x.matches(selector)) {
            x.remove();
        }
    });
}
