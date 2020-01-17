import React from 'react';
import './DropdownCheckboxFilter.scss';

import checkOnImage from './../../../images/check2.png';
import checkOffImage from './../../../images/check-off.png';
import downArrowImage from './../../../images/down-arrow.png';

export default class FurnitureStyleFilter extends React.Component {
    constructor(props) {
        super();
        this.state = {
            label: props.label,
            is_open: false,
            selected: []
        };
    }

    /**
     * send changes to parent
     */
    emitChanges() {
        if (typeof this.props.onFilterChange !== 'function') {
            return;
        }
        this.props.onFilterChange(this.state.selected.map(index => this.props.options[index]));
    }

    /**
     * listener on option selected,
     * changes label to string readable of all selected option
     * @param {DOM Event} event 
     * @param {number} index 
     */
    onOptionSelected(event, index) {
        if (this.state.selected.includes(index)) {
            this.state.selected = this.state.selected.filter(index_item => index_item != index);
        } else {
            this.state.selected.push(index);
        }

        const new_label = this.state.selected.map(index => this.props.options[index].label).join(", ");
        this.setState({
            label: this.state.selected.length > 0
                ? new_label
                : this.props.label,
            selected: this.state.selected
        }, _ => this.emitChanges());
    }

    /**
     * show option dropdown
     */
    openOption() {
        this.setState({
            is_open: !this.state.is_open
        });
    }

    render() {
        return <div 
            onClick={this.openOption.bind(this)}  
            className="dropdown-checkbox-filter">
            <div className="dropdown-checkbox-filter--title">
                { this.state.label } <img src={downArrowImage} />
            </div>
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    'display': this.state.is_open ? 'block' : 'none'
                }}
                className="dropdown-checkbox-filter--floating">
                {
                    this.props.options.map((option, index) => (
                        <div
                            key={index} 
                            className={`
                                dropdown-checkbox-filter--floating--option
                                ${this.state.selected.includes(index) ? "dropdown-checkbox-filter--floating--option--on" : ''}
                            `}
                            onClick={event => this.onOptionSelected(event, index)}>
                            {option.label} <img src={this.state.selected.includes(index) ? checkOnImage : checkOffImage} />
                        </div>
                    ))
                }
            </div>
        </div>;
    }
}
