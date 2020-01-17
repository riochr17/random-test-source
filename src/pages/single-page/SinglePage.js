import React from 'react';
import './SinglePage.scss';

import { getDataByFilter } from './../../data-manager';

import FilterAndSearch from './../../components/filter-and-search/FilterAndSearch';
import ListProduct from './../../components/list-product/ListProduct';
import Loading from './../../components/loading/Loading';

export default class SinglePage extends React.Component {
    constructor() {
        super();
        this.state = {
            is_loading: false,
            products: [],
            constant: {
                furniture_style_options: [],
                delivery_time_options: [{
                    label: "1 week",
                    value: 7 * 1
                }, {
                    label: "2 weeks",
                    value: 7 * 2
                }, {
                    label: "1 month",
                    value: 7 * 4
                }, {
                    label: "more",
                    value: -1
                }]
            }
        };
    }

    /**
     * set loading on view
     * @param {boolean} isLoading loading show if true
     */
    setLoading(isLoading) {
        this.setState({
            is_loading: isLoading
        });
    }

    /**
     * fetched data listener, process constant,
     * passing to view through state
     * @param {object} data fetched data
     */
    onDataReceived(data) {
        this.setLoading(false);
        this.state.constant.furniture_style_options = data.furniture_styles.map(style => ({
            label: style,
            value: style
        }));
        this.setState({
            constant: this.state.constant,
            products: data.products
        });
    }

    /**
     * error listener
     * @param {string} error message
     */
    onDataError(error) {
        this.setLoading(false);
        alert(error);
    }

    /**
     * fetch new data by filter
     * @param {object} value filter data
     */
    onFilterChange(value) {
        this.setLoading(true);
        getDataByFilter(value, this.onDataReceived.bind(this), this.onDataError.bind(this));
    }

    /**
     * fetch data on mounted
     */
    componentDidMount() {
        this.setLoading(true);
        getDataByFilter(null, this.onDataReceived.bind(this), this.onDataError.bind(this));
    }

    render() {
        return <div className="single-page">
            <div className="single-page--filter-and-search">
                <FilterAndSearch
                    constant={this.state.constant}
                    onFilterChange={this.onFilterChange.bind(this)} />
            </div>
            <div className="single-page--list-products">
                {
                    this.state.is_loading
                    ? <Loading />
                    : <ListProduct
                        products={this.state.products} />
                }
                
            </div>
        </div>;
    }
}
