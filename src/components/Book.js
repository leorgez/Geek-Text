import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Book extends Component {

state = {
    genre: "",
    title: "",
};


constructor(genre, title) {
    super();
    this.state.genre = genre;
    this.state.title = title;
}

viewList() {
    console.log(this.state.genre + "\n" + this.state.title);
}


};