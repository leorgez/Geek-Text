import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class WishList extends Component {

state = {
    list: [],
    count: 0
};


constructor(newBook) {
    super();
    this.state.list.push(newBook);
    this.state.count += 1;
}

// addBook(book) {
//     
// }

viewList() {
    for(let i = 0; i < this.state.list.length; i++) {
        this.state.list[i].viewList();
        console.log("Books currently in Wish List: " + this.state.count);
    }
}

};