import React, { Component } from 'react'
import selectStyles from './Select.css'

class Select extends Component {
    render() {
        return (
            <div className={selectStyles.select}>
                <span>{this.props.title}:</span>
            <select 
                name={this.props.name} 
                value={this.props.value} 
                key={this.props.key}
                onChange={this.props.changeSelect}>
                {this.props.children}
            </select>
            </div>
        )
    }
}

export default Select;