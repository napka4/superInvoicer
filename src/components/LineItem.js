import React, { Component } from 'react';
import {formatMoney} from '../lib/utilities';

export default class LineItem extends Component {

    constructor(props) {
        super(props);
        this.state = {name: "", unitPrice: 0, quantity: 0, totalPrice: 0};
    };

    onChangeName = (event)=> {
        this.setState({name: event.target.value});
    };

    onChangeUnitPrice = (event) => {
        const unitPrice = parseInt(event.target.value);
        const totalPrice = this.state.quantity * unitPrice;
        this.setState({unitPrice: unitPrice, totalPrice : totalPrice});
        this.props.onChangeTotalPrice(this.props.lineItemId,totalPrice);
    };

    onChangeQuantity = (event) => {
        const quantity = parseInt(event.target.value);
        const totalPrice = this.state.unitPrice * quantity
        this.setState({quantity: quantity,  totalPrice:totalPrice});
        this.props.onChangeTotalPrice(this.props.lineItemId, totalPrice);
    };

    render(){
        return (
            
                <tr>
                    <td><input type="checkbox"/></td>
                <td>
                    <input type="text" value={this.state.name} onChange={this.onChangeName} name="name"/>
                    </td>
                 <td>
                    <input type="text" value={this.state.unitPrice} onChange={this.onChangeUnitPrice} name="unitPrice"/>
                   </td>
                   <td>
                        <input type="text" value={this.state.quantity} onChange={this.onChangeQuantity} name="quantity"/>
                   </td>
                    <td>
                        <span name="totalPrice">{formatMoney(this.state.totalPrice)} €</span>
                    </td>
                    </tr>
            
        )
    }
}