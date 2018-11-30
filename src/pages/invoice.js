import React, { Component } from 'react';
//middleware react-redux
import {connect} from 'react-redux';

import LineItem from '../components/LineItem';
import {
    runActionEditDiscount, 
    runActionComputeInvoice,
    runActionAddLineItem,
    runActionToggleAllLineItems,
    runActionRemoveSelectedLineItems
} from '../redux/actions';

import {formatMoney} from '../lib/utilities';



export class Invoice extends Component {

    componentDidMount() {
        this.props.runActionAddLineItem();
    }

    onSubmit = (event) => {
        event.preventDefault();
    }
  
    onChangeToggleAllLineItems = (event) => {
        const isSelected = event.target.checked;

        this.props.runActionToggleAllLineItems(isSelected);
    }

    onChangeDiscount = (event) => {
        const discountRate = parseFloat(event.target.value);
        this.props.runActionEditDiscount(discountRate);
        this.props.runActionComputeInvoice();
    }

    onClickRemoveSelectedLineItems = () => {
        this.props.runActionRemoveSelectedLineItems();
        this.props.runActionComputeInvoice();
    }


    render() {
        const lineItems = this.props.lineItems.map((lineItem, index) => 
        (
            <LineItem 
                key={index} 

                lineItemId={index} 

                isSelected={lineItem.isSelected} 
                name={lineItem.name} 
                quantity={lineItem.quantity} 
                unitPrice={lineItem.unitPrice}
                totalPrice={lineItem.totalPrice}/>
        ));

        return (
            <div>
                <h1>Vous êtes sur Tu vas racquer.com</h1>
                
                <form onSubmit={this.onSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th><input onChange={this.onChangeToggleAllLineItems} type="checkbox"/>Tout selectionner</th>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Total</th>
                            
                        </tr>
                    </thead>
                <tbody>
                {lineItems}
                </tbody>
                </table>
                   <button onClick={this.props.runActionAddLineItem}>+</button>
                   <button onClick={this.onClickRemoveSelectedLineItems}>Crabouiller</button>
                
                <p>Sous Total HT : {formatMoney(this.props.subTotal)} </p>
                <p>Montant de la TVA : {formatMoney(this.props.tva)} </p>
                <p>Montant TTC : {formatMoney(this.props.grandTotal)} </p>
                <label>Vous avez une réduction !!?? 
                <input type="text" onChange={this.onChangeDiscount} value={this.props.discountRate} />%
                </label>
                </form>
            </div>
        );
    }
}

const InvoicewWithRedux = connect(
    (state)=>
    ({
        discountTotal: state.discountTotal,
        lineItems: state.lineItems,
        subTotal: state.subTotal,
        tva: state.tva,
        grandTotal: state.grandTotal,
        discountRate: state.discountRate
    }),
    {
        runActionEditDiscount,
        runActionComputeInvoice,
        runActionAddLineItem,
        runActionToggleAllLineItems,
        runActionRemoveSelectedLineItems
    }
)(Invoice);

export default InvoicewWithRedux;