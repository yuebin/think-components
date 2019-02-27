import HttpUtil from "../../../httpUtil/HttpUtil";
// import USER_STORE from "./user_store_mutation_type"

const state = {
    userInfo: {},
    login: false
}

// console.error(USER_STORE);

// getters
const getters = {
    userInfo: (state,getters, rootState) => {
        console.error('userInfo change');
    }
}

// actions
const actions = {
    login(context, userInfo) {
        // /admin/login
        HttpUtil.getHttpUtil().postAppData("Login",{}, userInfo).then(function (response) {
            context.commit('login', response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
}

// mutations
const mutations = {
    login(state, userInfo) {
        state.userInfo = userInfo;
        return userInfo;
    }
}


export default {
    namsespaced: true,
    state,
    getters,
    actions,
    mutations
}