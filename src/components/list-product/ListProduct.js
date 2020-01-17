import React from 'react';
import './ListProduct.scss';

import ProductItem from './../product-item/ProductItem';

export default class ListProduct extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className="list-product">
            {
                this.props.products.map((product, index) => (
                    <ProductItem 
                        key={index}
                        product={product} />
                ))
            }
        </div>;
    }
}
