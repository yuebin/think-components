String.prototype.toUnderline = function () {
    return this.replace(/[A-Z]/g, function (match, offset, str) { 
        return "_" + match.toLocaleLowerCase(); 
    });
}

String.prototype.toHump = function(){
    return this.replace(/_\w/g, function (match, offset, str) {
        return match.replace(/_/g, "").toUpperCase(); 
    });
}