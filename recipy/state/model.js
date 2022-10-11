import { action } from "easy-peasy";

export default {
    ingredients: [
        {name: 'apple', key: '1'},
        {name: 'banana', key: '2'},
        {name: 'pear', key: '3'},
        {name: 'apple cider', key: '4'},
        {name: 'mango', key: '5'},
        {name: 'peach', key: '7'},
        {name: 'coconut', key: '8'},
        {name: 'apricot', key: '9'},
        {name: 'pickle', key: '10'},
        {name: 'plum', key: '11'},
        {name: 'prune', key: '12'},
        {name: 'bison', key: '13'},
        {name: 'berry', key: '14'},
    ],
    selectedIngredients: [],
    refresh: false,
    // Actions
    setSelectedIngredients: action((state, list) => {
        state.selectedIngredients = list;
    }),
    setRefresh: action((state, refreshed) => {
        state.refresh = refreshed;
    }),
}