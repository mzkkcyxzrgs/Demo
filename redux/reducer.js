import {
    SET_LIST_FILTER
} from './action';
import {
    cloneDeep
} from 'lodash';
let initialState = {
    data: [{
            key: 'a',
            person: 'a',
            urgency: 'a1',
            address: 'a2',
            number: 'a3',
            state: 'a4'
        },
        {
            key: 'b',
            person: 'b',
            urgency: 'b1',
            address: 'b2',
            number: 'b3',
            state: 'b4'
        },
        {
            key: 'c',
            person: 'c',
            urgency: 'c1',
            address: 'c2',
            number: 'c3',
            state: 'c4'
        },
        {
            key: 'd',
            person: 'd',
            urgency: 'd1',
            address: 'd2',
            number: 'd3',
            state: 'd4'
        },
        {
            key: 'e',
            person: 'e',
            urgency: 'e1',
            address: 'e2',
            number: 'e3',
            state: 'e4'
        }
    ],
    filteredData: []
};

function setListFilter(state = initialState, action) {
    let newState = cloneDeep(state)
    switch (action.type) {
        case SET_LIST_FILTER:
            return Object.assign({}, newState, action.obj)
        default:
            return newState
    }
}

export default setListFilter;