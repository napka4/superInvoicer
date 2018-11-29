import React, { Component } from 'react';
import LineItem from '../components/LineItem';
import {formatMoney} from '../lib/utilities';

export default class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = { lineItems : [], subTotal : 0 , tva: 0, grandTotal: 0};
    };

    componentDidMount() {
        this.addLineItem();
    }

    computeInvoice = () => {
        let subTotal = 0;
        let tva;
        let grandTotal;

        for(const item of this.state.lineItems) {
            subTotal += item.totalPrice;
        }
        tva = subTotal *0.2;
        grandTotal = subTotal + tva;

        this.setState({ tva, subTotal, grandTotal });
    }

    addLineItem = () => {
        let lineItems = [...this.state.lineItems];
        lineItems.push({totalPrice: 0, isSelected: false});
        this.setState({lineItems});
    }

    removeLineItem = () => {
        let lineItems = this.state.lineItems.filter((lineItem) => {
            return lineItem.isSelected === false;
        });

        this.setState({lineItems}, ()=> {this.computeInvoice()});
    }

    onSubmit = (event) => {
        event.preventDefault();
    }
    onChangeLineItem = (lineItemId, isSelected) => {
        let lineItems = [ ...this.state.lineItems ];
        lineItems[lineItemId].isSelected = isSelected;

        this.setState({ lineItems });
    }

    onChangeTotalPrice = (lineItemId, totalPrice) => {
        let lineItems = [ ...this.state.lineItems ];
        lineItems[lineItemId].totalPrice = totalPrice;

        this.computeInvoice();

        this.setState({ lineItems });

    }

    selectAllLineItems = (event) => {
        let lineItems = [...this.state.lineItems];

        for(let lineItem of lineItems) {
            lineItem.isSelected = event.target.checked;
        }
        this.setState({lineItems});
    }

    render() {
        const lineItems = this.state.lineItems.map((lineItem, index) => 
        (
        <LineItem 
        isSelected={lineItem.isSelected} 
        key={index} 
        lineItemId={index} 
        onChangeTotalPrice={this.onChangeTotalPrice}
        onChangeLineItem={this.onChangeLineItem}/>
        ));

        return (
            <div>
                <h1>Vous êtes sur Tu vas racquer.com</h1>
                
                <form onSubmit={this.onSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th><input onChange={this.selectAllLineItems} type="checkbox"/>Tout selectionner</th>
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
                   <button onClick={this.removeLineItem}>Crabouiller</button>
                </form>
                <p>Sous Total HT : {formatMoney(this.state.subTotal)} </p>
                <p>Montant de la TVA : {formatMoney(this.state.tva)} </p>
                <p>Montant TTC : {formatMoney(this.state.grandTotal)} </p>
                
            </div>
        )
    }
}
