import React, { Component } from 'react'

class Select extends Component {
    render() {
        return (
            <select 
                name={this.props.name} 
                value={this.props.value} 
                key={this.props.key}
                onChange={this.props.changeSelect}>
                {this.props.children}
            </select>
        )
    }
}

export default Select;