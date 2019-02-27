import HttpUtil from "../../httpUtil/HttpUtil";

let _currentLang ="cn";


const i18nCache = {
    cn:new Map(),
    en:new Map()
};

let _i18nOnce = false;

const install = function(Vue){
    Vue.prototype.$i18n = function (langKey) {
        return (i18nCache[_currentLang].get(langKey) ? i18nCache[_currentLang].get(langKey) : "");
    };
}

let _component = false;
let _componentCbList = [];
const loadFinished = function(cb){
    if (_component){
        cb();
    }else{
        _componentCbList.push(cb);
    }
}

const init = function () {
    if (!_i18nOnce){
        _i18nOnce = true;
        HttpUtil.getHttpUtil().getAppData("i18n").then(res=> {
            if(res.data.code ==="SUCCESS"){
                res.data.data.map((item) => {
                    i18nCache.cn.set(`${item.domain}_${item.keys}`, item.cn);
                    i18nCache.en.set(`${item.domain}_${item.keys}`, item.en);
                });
                _component = true;
                _componentCbList.map(cb => cb());
                _componentCbList = [];
            }
        }).catch(error=> {
            _component = true;
            _componentCbList.map(cb => cb());
            _componentCbList = [];
        });
    }    
}

export {
    install,
    loadFinished,
    init
}