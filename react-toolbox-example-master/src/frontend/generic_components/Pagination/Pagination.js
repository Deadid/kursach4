import React, { Component } from 'react'

import pagination from './Pagination.css'

class Pagination extends Component {
    
    createPaginationList () {
        let paginationList = [];
        const initial = this.props.number;
        for (let i = -2, y = 1; y<= 5 && this.props.number + i < this.props.totalPages; i++) {
            if(initial + i > 0) {
                paginationList.push(
                    <div 
                    className={pagination.paginationItem + (this.props.number+1 !== (this.props.number + i) ? ' ' : pagination.active)} 
                    onClick={() => this.props.goToPage(this.props.number +i - 1)}
                    key={i}>
                        {this.props.number + i}
                    </div>
                )
                y++;
            }
        }

        return paginationList;
    }

    render() {
        return (
            <div className={pagination.paginationList}>
                {this.createPaginationList()}  {this.props.totalPages > 1 && "..." + this.props.totalPages}
            </div>
        )
    }
}

export default Pagination;