import {
    COMPUTE_INVOICE, 
    ADD_LINE_ITEM, 
    REMOVE_SELECTED_LINE_ITEMS, 
    TOGGLE_ALL_LINE_ITEMS, 
    EDIT_LINE_ITEM,
    EDIT_DISCOUNT
} from './constants';

export function runActionAddLineItem() {
    return { type: ADD_LINE_ITEM }
};

export function runActionEditLineItem(lineItemId, { isSelected, name, quantity, totalPrice, unitPrice }) {
    return { type: EDIT_LINE_ITEM, lineItemId, isSelected, name, quantity, totalPrice, unitPrice }
};

export function runActionComputeInvoice() {
    return { type : COMPUTE_INVOICE }
};

export function runActionRemoveSelectedLineItems() {
    return { type : REMOVE_SELECTED_LINE_ITEMS }
};

export function runActionToggleAllLineItems(isSelected) {
    return { type: TOGGLE_ALL_LINE_ITEMS,  isSelected }
};

export function runActionEditDiscount(discountRate) {
    return  { type: EDIT_DISCOUNT, discountRate };
};

