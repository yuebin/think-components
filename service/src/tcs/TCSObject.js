class TCSObject {

    constructor(){    
    }

    defaultProps(initObj={},...props){
        props.forEach((item)=>{
            item && (this[item] = initObj[item]);
        });
    }
}

export { TCSObject }