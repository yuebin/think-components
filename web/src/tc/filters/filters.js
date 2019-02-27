
let capitalize = function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
};

const filters = [capitalize];

const init = function (Vue) {
    filters && filters.forEach((filter) => {
        Vue.filter(filter.name, filter);
    });
}

export default init;