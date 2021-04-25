const initialState = {
    attacks: null,
    dataSource:null,
    filterBy: {
        name: '',
        description: ''
    }
}

export function attackReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ATTACKS':
            return { ...state, attacks: action.attacks }
        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy,dataSource:action.dataSource }
        case 'SET_COMMON_TAGS_ATTACK':
            return { ...state, attacks: action.attacksWithDataSource.attacks,dataSource:action.attacksWithDataSource.dataSource }
        default:
            return state
    }
}