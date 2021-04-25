
import { attackService } from './../../services/attackService';

// Creators
const _setAttacks = (attacks) => ({ type: 'SET_ATTACKS', attacks });
const _setFilter = (filterBy) => ({ type: 'SET_FILTER', filterBy });
const _setCommonTagAttacks = (attacksWithDataSource) => ({ type: 'SET_COMMON_TAGS_ATTACK', attacksWithDataSource });


// Dispatchers
// THUNK
export function loadAttacks(filterBy) {
    return async (dispatch) => {
        try {
            const attacks = await attackService.query(filterBy);
            dispatch(_setAttacks(attacks));
        }
        catch (err) {
            console.log('Error with set attacks ', err)
        }
    }
}

export function setFilter(filterBy) {
    return (dispatch) => dispatch(_setFilter(filterBy));
}

export function setCommonTagAttacks(attacks, dataSource) {
    return (dispatch) => dispatch(_setCommonTagAttacks({ attacks, dataSource }));
}


