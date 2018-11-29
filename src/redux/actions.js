import {
    COMPUTE_INVOICE, 
    ADD_LINE_ITEM, 
    REMOVE_SELECTED_LINE_ITEMS, 
    TOGGLE_ALL_LINE_ITEMS, 
    EDIT_LINE_ITEM,
    EDIT_DISCOUNT
} from './constants';

export function runActionAddLineItem() {};

export function runActionEditLineItem() {};

export function runeActionComputeInvoice() {};

export function runActionRemoveSelectedLineItems() {};

export function runActionToggleAllLineItems() {};

export function runActionEditDiscount(discount) {
    return  discount;
};

