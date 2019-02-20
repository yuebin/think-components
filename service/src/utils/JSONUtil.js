
export default class JSONUtil{

    static get(json,key){
        if(json){
            return json[key];
        }else{
            return null;
        }
    }


}