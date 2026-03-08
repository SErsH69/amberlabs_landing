const Header = class Header {
    constructor({someVareible}){
        this.someVareible = someVareible;
    }
    someMethod() {
        console.log(this.someVareible);
    }
    init() {
        this.someMethod();
    }
}

export default Header;