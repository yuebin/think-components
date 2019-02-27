import HttpUtil from "../../../httpUtil/HttpUtil";

const DOMAIN="dev";
// initial state
const state = {
    packages: []
}

// getters
const getters = {}

// actions
const actions = {
    getPackages({ commit }) {
        HttpUtil.getHttpUtil().getDevData("packages", { domain: DOMAIN}).then((res)=>{
            commit("setPackages", res.data.data)
        });
    }
}

// mutations
const mutations = {
    setPackages(state, packages) {
        state.packages = packages;
    },
    decrementProductInventory(state, { id }) {
        const product = state.all.find(product => product.id === id)
        product.inventory--
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}