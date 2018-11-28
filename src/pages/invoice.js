import React, { Component } from 'react';
import LineItem from '../components/LineItem';
import {formatMoney} from '../lib/utilities';

export default class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = { lineItems : [], subTotal : 0 , tva: 20};
    };

    componentDidMount() {
        this.addLineItem();
    }

    addLineItem = () => {
        let lineItems = [...this.state.lineItems];
        lineItems.push({name: "", unitPrice: 0, quantity: 0, totalPrice: 0});
        this.setState({lineItems});
    }

    onSubmit = (event) => {
        event.preventDefault();
    }

    onChangeTotalPrice = (lineItemId, totalPrice) => {
        let lineItem;
        let lineItems;
        let subTotal;

        lineItems = [ ...this.state.lineItems ];
        lineItems[lineItemId].totalPrice = totalPrice;

        subTotal = 0;

        for(lineItem of lineItems)
        {
            subTotal += lineItem.totalPrice;
        }

        this.setState({ lineItem, subTotal });

    }

    render() {
        const lineItems = this.state.lineItems.map((lineItem, index) => 
        (
        <LineItem key={index} lineItemId={index} onChangeTotalPrice={this.onChangeTotalPrice}/>
        ));

        return (
            <div>
                <h1>Vous êtes sur Tu vas racquer.com</h1>
                
                <form onSubmit={this.onSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th><input onClikSelectAllLineItems type="checkbox"/>Tout selectionner</th>
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
                   <button onClick={this.addLineItem}>+</button>
                </form>
                <p>Sous Total HT : {formatMoney(this.state.subTotal)} </p>
                <p>Montant de la TVA : {formatMoney(((this.state.subTotal / 100) * this.state.tva ))} </p>
                <p>Montant TTC : {formatMoney(((this.state.subTotal / 100) * this.state.tva ) + this.state.subTotal)} </p>
                
            </div>
        )
    }
}
