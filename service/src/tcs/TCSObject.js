export class TCSObject {
    
    constructor() {
    }

    /**
     * 
     * @param {初始化数据集合} initObj 
     * @param  {...any} props 
     */
    defaultProps(initObj = {}, ...props) {
        props.forEach((item)=>{
            item && initObj &&  (this[item] = initObj[item]);
        });
    }

    /**
     * 
     * @param {数据库格式初始化数据集合} dbInitObj
     * @param  {...any} props 
     */
    dbFiledProps(dbInitObj = {}, ...props){
        props.forEach((item) => {
            let lineKey = item.toUnderline();
            item && dbInitObj && (this[item] = dbInitObj[lineKey]);
        });
    }

}
