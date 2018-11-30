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
const initialState = {
    discountRate:0,  //saisie dans le champs inout
    discountTotal: 0,  // calcul de la remise
    lineItems : [], 
    subTotal : 0 , 
    tva: 0, 
    grandTotal: 0};

export default function reducer(state = initialState, action)
{
    console.log(state, action);

    switch(action.type)
    {
        case ADD_LINE_ITEM:
        {
            let lineItems = [...state.lineItems];

            lineItems.push({
                totalPrice: 0,
                isSelected: false,
                unitPrice:0,
                quantity:1,
                name:""
            });

            return cloneObject(state, {lineItems});
        }

        case EDIT_LINE_ITEM:
        {
            let lineItems = [...state.lineItems];

            for(const propertyName of [ 'isSelected', 'name', 'quantity', 'totalPrice', 'unitPrice' ])
            {
                if(action[propertyName] !== undefined)
                {
                    lineItems[action.lineItemId][propertyName] = action[propertyName];
                }
            }
            

            return cloneObject(state, {lineItems});
        }

        case COMPUTE_INVOICE:
        {
            let subTotal = 0;
            let tva;
            let grandTotal;
            let discountTotal;

            for(const item of state.lineItems) 
            {
                subTotal += item.totalPrice;
            }

            discountTotal = subTotal * state.discountRate / 100;

            tva = (subTotal - discountTotal) *0.2;
            grandTotal = (subTotal -discountTotal )+ tva;

            return cloneObject(state, { tva, subTotal, grandTotal, discountTotal });
        }

        case REMOVE_SELECTED_LINE_ITEMS:
        {
            let lineItems = state.lineItems.filter((lineItem) => {
                return lineItem.isSelected === false;
            });
    
            return cloneObject(state, { lineItems });
        }

        case TOGGLE_ALL_LINE_ITEMS:
        {
            let lineItems = [...state.lineItems];

            for(let lineItem of lineItems) {
                lineItem.isSelected = action.isSelected;
            }

            return cloneObject(state, { lineItems });
        }

        case EDIT_DISCOUNT:
        {
            let discountRate;
            let discountTotal;

            discountRate = action.discountRate;
            discountTotal = state.subTotal * discountRate /100;

            return cloneObject(state, {discountRate, discountTotal});
        }

        default:
            return state;
    }
};