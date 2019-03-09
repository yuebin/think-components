import HttpUtil from "../../../httpUtil/HttpUtil";
import { Tree } from "../../../tc/modules/Tree";

const DOMAIN = "config";
// initial state
const state = {
    domain:[]
}

// getters
const getters = {}

// actions
const actions = {
    getPackages({ commit }) {
        HttpUtil.getHttpUtil().getDevData("packages", { domain: DOMAIN }).then((res) => {
            commit("buildPackages", res.data.data)
        });
    }
}

// mutations
const mutations = {
    setPackages(state, packages) {
        state.packages = packages;
    },
    buildPackages(state, packages) {
        if (packages) {
            //dbuildTree(packages[0], packages);
            let index = 0;
            for (let i = 0; i < packages.length; i++) {
                if (!packages[i].parent_id) {
                    index = i; break;
                }
            }
            state.packages = packages;
            state.packageTree = getTree(packages, index);
            console.error(state.packageTree);
        }
    },
    decrementProductInventory(state, { id }) {
        const product = state.all.find(product => product.id === id)
        product.inventory--;
    }
}

const getTree = function (list, index) {
    let tree = new Tree();
    let item = list[index];
    let packageId = item.package_id
    tree.setId(packageId);
    tree.setName(item.name);

    for (let i = 0; i < list.length; i++) {
        let parentId = list[i].parent_id;
        if (packageId === parentId) {
            tree.add(getTree(list, i));
        }
    }
    return tree;
}



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}