import React from 'react';
import './ProductItem.scss';

import { convertToRupiah } from './../../utils';

export default class ProductItem extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    /**
     * return trimmed 144 chars product description
     * @param {string} desc product description
     */
    getDescription(desc) {
        return `${desc.substring(0, 144)}${desc.length > 144 ? '...' : ''}`;
    }

    /**
     * return string readable furniture styles
     * @param {array} furniture_styles list of furniture style included on product
     */
    getFurnitureStyle(furniture_styles) {
        return furniture_styles.join(", ");
    }

    /**
     * return string readable time delivery of product
     * @param {number} time time to deliver product
     */
    getDeliveryTime(time) {
        return `${time} day${time > 1 ? 's' : ''}`;
    }

    render() {
        return <div className="product-item">
            <div className="product-item--container">
                <div className="product-item--top">
                    <div className="product-item--top--price">
                        {convertToRupiah(this.props.product.price)}
                    </div>
                    <div className="product-item--top--name">
                        {this.props.product.name}
                    </div>
                </div>
                <div className="product-item--middle">
                    <div className="product-item--middle--description">
                        {this.getDescription(this.props.product.description)}
                    </div>
                    <div className="product-item--middle--style">
                        {this.getFurnitureStyle(this.props.product.furniture_style)}
                    </div>
                </div>
                <div className="product-item--bottom">
                    <div className="product-item--bottom--delivery-days">
                        {this.getDeliveryTime(this.props.product.delivery_time)}
                    </div>
                </div>
            </div>
        </div>;
    }
}
