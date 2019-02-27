import Vue from "vue";
// import USER_STORE from "./user_store_mutation_type"

const i18n = {
    userInfo: {},
    login: false
}

// console.error(USER_STORE);

// getters
const getters = {
    i18n: (state, getters, rootState) => {
        return state;
    }
}

// actions
const actions = {
    loadI18n(context) {
        // /admin/login
        console.error("actions loadI18n");
        Vue.prototype.$http.getAppData("i18n").then(function (res) {
            context.commit('loadedI18n', res.data.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
}

// mutations
const mutations = {
    loadedI18n(state,i18n) {
        state.i18n = i18n;
        return state.i18n;
    }
}


export default {
    namsespaced: true,
    i18n,
    getters,
    actions,
    mutations
}