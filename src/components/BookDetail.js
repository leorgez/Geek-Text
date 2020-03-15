import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import {apiUrl} from '../api';

class BookDetail extends Component {
  state = {
    book: null
  }

  componentDidMount() {
    this._asyncRequest = this.loadBook(this.props.bookId).then(
      book => {
        this._asyncRequest = null;
        this.setState({book})
      }
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  loadBook = async (bookId) => {
    const response = await fetch(`${apiUrl}/books/${bookId}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    if (this.state.book === null) {
      return (
        <h1>Loading book...</h1>
      )
    } else {
      return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.state.book.title}</h5>
            <p className="card-text">{this.state.book.description}</p>
          </div>
          <img src={this.state.book.cover} className="card-img-bottom" height="50%" />
        </div>
      )
    }
  }
}

export default function () {
  let {id} = useParams();

  return (
    <BookDetail bookId={id}/>
  )
};
