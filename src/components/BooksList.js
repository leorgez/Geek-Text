import React, { Component } from 'react';
import { Link } from "react-router-dom";
import VirtualList from 'react-virtual-list';
import {apiUrl} from '../api';

class BooksList extends Component {
  state = {
    books: null
  }

  async componentDidMount() {
    this._asyncRequest = this.loadBooks().then(
      books => {
        this._asyncRequest = null;
        this.setState({books})
      }
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  loadBooks = async () => {
    const response = await fetch(`${apiUrl}/books`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    if (this.state.books === null) {
      return (
        <h1>Loading books...</h1>
      )
    } else {
      return (
        <MyVirtualList
          items={this.state.books}
          itemHeight={200}
        />
      )
    }
  }
}

export default BooksList;

const MyList = ({
  virtual,
  itemHeight,
}) => (
  <ul className="list-group">
    {virtual.items.map((item) => (
      <li key={`item${item._id}`} className="list-group-item">
        <div className="media">
          <Link to={`/books/${item._id}`}>
            <img className="mr-3 rounded" src={item.cover} height="150"/>
          </Link>
          <div className="media-body">
            <h5 className="mt-0">{item.title}</h5>
            {item.description}
          </div>
        </div>
      </li>
    ))}
  </ul>
);

const MyVirtualList = VirtualList()(MyList);
