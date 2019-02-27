import Vuex from 'vuex';
import user from './modules/user/user';
import i18n from "./modules/i18n/i18n";
import Vue from "vue";
import dev from "./modules/dev/devStore";

const debug = process.env.NODE_ENV !== 'production';


Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        i18n,
        user,
        dev
    },
    strict: debug
});

export default store;