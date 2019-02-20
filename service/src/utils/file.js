import fs  from "fs";
import Logger from "logger";


export function GetJsonFile(path){
    var result = {};
    if (path instanceof string){
        try {
            result = JSON.parse(fs.readFileSync(file));
        } catch (error) {
            Logger.error(error);
        }
    }
    return result;
}