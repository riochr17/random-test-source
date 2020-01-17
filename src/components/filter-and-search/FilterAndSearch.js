import React from 'react';
import './FilterAndSearch.scss';

import DropdownCheckboxFilter from './furniture-style-filter/DropdownCheckboxFilter';

export default class FilterAndSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: {
                query: '',
                furniture_style: [],
                delivery_time: []
            }
        };
    }

    /**
     * send filter changes to parent
     */
    emitChanges() {
        if (typeof this.props.onFilterChange !== 'function') {
            return;
        }
        this.props.onFilterChange(this.state.filter);
    }

    /**
     * assign new filter value of string key given on local state
     * @param {string} key 
     * @param {object} value 
     */
    onFilterChange(key, value) {
        this.state.filter[key] = value;
        this.setState({
            filter: this.state.filter
        }, _ => this.emitChanges());
    }

    /**
     * assign query changes to local state
     * @param {DOM Event} event 
     */
    onQueryChange(event) {
        this.state.filter.query = event.target.value;
        this.setState({
            filter: this.state.filter
        }, _ => this.emitChanges());
    }

    render() {
        return <div className="filter-and-search">
            <div className="filter-and-search--search">
                <div className="filter-and-search--search--container">
                    <input 
                        value={this.state.filter.query}
                        onChange={this.onQueryChange.bind(this)}
                        type="text" placeholder="Search Furniture" />
                </div>
            </div>
            <div className="filter-and-search--filter">
                <div className="filter-and-search--filter--container">
                    <div className="filter-and-search--filter--furniture-style">
                        <DropdownCheckboxFilter 
                            onFilterChange={value => this.onFilterChange('furniture_style', value)}
                            label="Furniture Style"
                            options={this.props.constant.furniture_style_options} />
                    </div>
                </div>
                <div className="filter-and-search--filter--container">
                    <div className="filter-and-search--filter--delivery-time">
                        <DropdownCheckboxFilter 
                            onFilterChange={value => this.onFilterChange('delivery_time', value)}
                            label="Delivery Time"
                            options={this.props.constant.delivery_time_options} />
                    </div>
                </div>
            </div>
        </div>;
    }
}
