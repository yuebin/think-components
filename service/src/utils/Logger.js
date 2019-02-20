
class Logger {

    static error(str){
        if(NODE_ENV ==="development"){
            console.error(str)
        }
    }

    static log(str){
        console.log(str);
    }
}

export { Logger }