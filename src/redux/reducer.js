import {
    COMPUTE_INVOICE, 
    ADD_LINE_ITEM, 
    REMOVE_SELECTED_LINE_ITEMS, 
    TOGGLE_ALL_LINE_ITEMS, 
    EDIT_LINE_ITEM,
    EDIT_DISCOUNT
} from './constants';

import {cloneObject} from '../lib/utilities';

//permet d'initialiser le reducer (on a le state de base)
const initialState = {discount: 0};

export default function reducer(state = initialState, action)
{
    switch(action.type)
    {
        case ADD_LINE_ITEM:
        {
            let lineItems = [...this.state.lineItems];

            lineItems.push({
                totalPrice: 0,
                isSelected: false
            });

            return cloneObject(state, {lineItems});
        }
        case EDIT_LINE_ITEM:{return}
        case COMPUTE_INVOICE:{return}
        case REMOVE_SELECTED_LINE_ITEMS:{}
        case TOGGLE_ALL_LINE_ITEMS:{return}

        case EDIT_DISCOUNT:{
            return cloneObject(state, {discount:action.discount});
        }

        default:
            return state;
    }
};