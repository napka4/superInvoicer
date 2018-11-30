import React, { Component } from 'react';
import {formatMoney} from '../lib/utilities';

//middleware react-redux
import {connect} from 'react-redux';

import {
    runActionComputeInvoice,
    runActionEditLineItem
} from '../redux/actions';

export class LineItem extends Component {

    onChangeName = (event)=> {
        const name = event.target.value

        this.props.runActionEditLineItem(this.props.lineItemId, { name });
    };

    onChangeUnitPrice = (event) => {
        const unitPrice = parseInt(event.target.value);
        const totalPrice = this.props.quantity * unitPrice;

        this.props.runActionEditLineItem(this.props.lineItemId, { totalPrice, unitPrice });

        this.props.runActionComputeInvoice();
    };

    onChangeQuantity = (event) => {
        const quantity = parseInt(event.target.value);
        const totalPrice = this.props.unitPrice * quantity;

        this.props.runActionEditLineItem(this.props.lineItemId, { totalPrice, quantity })
        
        this.props.runActionComputeInvoice();
    };

    onChangeLineItem = (event) => {
        const isSelected = event.target.checked;

        this.props.runActionEditLineItem(this.props.lineItemId, { isSelected });
    }

    render(){
        return (
            
                <tr>
                    <td><input type="checkbox" checked={this.props.isSelected} onChange={this.onChangeLineItem}/></td>
                <td>
                    <input type="text" value={this.props.name} onChange={this.onChangeName} name="name"/>
                    </td>
                 <td>
                    <input type="text" value={this.props.unitPrice} onChange={this.onChangeUnitPrice} name="unitPrice"/>
                   </td>
                   <td>
                        <input type="text" value={this.props.quantity} onChange={this.onChangeQuantity} name="quantity"/>
                   </td>
                    <td>
                        <span name="totalPrice">{formatMoney(this.props.totalPrice)}</span>
                    </td>
                    </tr>
            
        )
    }
}

const LineItemwWithRedux = connect(
    null,

    {
        runActionComputeInvoice,
        runActionEditLineItem
    }
)(LineItem);

export default LineItemwWithRedux;