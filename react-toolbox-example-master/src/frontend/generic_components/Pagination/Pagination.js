import React, { Component } from 'react'

import pagination from './Pagination.css'

class Pagination extends Component {
    
    createPaginationList () {
        let paginationList = [];
        for (let i = 0; i < this.props.maxPages; i++) {
            paginationList.push(
                <div 
                className={pagination.paginationItem + (this.props.activePage === i ? ' ' + pagination.active: '')} 
                onClick={() => this.props.goToPage(i)}
                key={i}>
                    {i}
                </div>
            )
        }

        return paginationList;
    }

    render() {
        return (
            <div className={pagination.paginationList}>
                {this.createPaginationList()}
            </div>
        )
    }
}

export default Pagination;