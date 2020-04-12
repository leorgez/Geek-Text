import React, { Component } from 'react';
import {
  useParams
} from "react-router-dom";
import { apiUrl } from '../api';

import Zoom from 'react-medium-image-zoom';
import { Book}  from './Book';
import 'react-medium-image-zoom/dist/styles.css';
import { BookReviews } from "./BookReviews";
import { Link } from "react-router-dom";
import {Button, ButtonToolbar} from 'react-bootstrap';
import {PopUpMenu} from './PopUpMenu';

class BookDetail extends Component {
  state = {
    book: null,
    review: "", // string comment
    author: "", // User commenting string
    rating: null, // We start at nothing
    calculatedRatings: 0, // We start @ 0, since at first it's empty
    showMenu: false
  };

  componentDidMount() {
    this._asyncRequest = this.loadBook(this.props.bookId).then(book => {
      this._asyncRequest = null;

      this.setState({
        book: { ...book, reviews: book.reviews ? book.reviews.reverse() : [] },
        // If statement to reverse the comments to show the newest always on top.
        totalRatings: this.calculateRatings( // shows the book's ratings
          book.reviews ? book.reviews.map(review => review.rating) : []
        )
      });
    });
  }


  loadBook = async bookId => {
    const response = await fetch(`${apiUrl}/books/${bookId}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  calculateRatings = ratings => {
    let totalRatings = 0; // starting at 0

    ratings.forEach(rating => {
      totalRatings += rating; // adding up the ratings
    });
    if (ratings.length === 0) return 0;
    return Math.round(totalRatings / ratings.length); // finding the average of overall
  };

  updateReview = e => {
    this.setState({ review: e.target.value }); // holds the comment of the user
  };
  updateAuthorName = e => {
    this.setState({ author: e.target.value }); // holds the user's name
  };

  handleRating = e => {
    this.setState({ rating: parseInt(e.target.value, 10) }); // holds the rating
  };
  sendReview = async () => {
    const body = JSON.stringify({ // converts the body into string
      bookId: this.props.bookId,
      review: this.state.review,
      author: this.state.author,
      rating: this.state.rating
    });
    const headers = {
      "Content-Type": "application/json"
    };
    const response = await fetch(`${apiUrl}/books/review`, {
      method: "POST", // we use this, because we are posting comments
      body,
      headers
    });

    const data = await response.json();
    if (response.status !== 200) throw Error(body.message);
    const bookCopy = { ...this.state.book };
    bookCopy.reviews = data.reviews.reverse();

    this.setState({
      book: bookCopy,
      review: "",
      author: "",
      totalRatings: this.calculateRatings( // displays the average rating
        data.reviews.map(review => review.rating)
      )
    });
  }

  addToWishList = () => {
    let newBook = new Book(this.props.bookId, this.state.book.title, this.state.book.cover);
    window.$tempBook = newBook;
  }

  render() {

    let closeMenu =() => {this.setState({showMenu: false});
    window.$tempBook = null;
  }

    let openMenu =() => this.setState({showMenu: true});

    if (this.state.book === null) {
      return (
        <h1>Loading book...</h1>
      )
    } else {
      return (
        <div className="card">
          <div className="card-body">
            <p className="card-title"><strong>{this.state.book.title}</strong></p>
            <p className="card-genre"><strong>Genre:</strong> {this.state.book.genre}</p>
            <p className="description"><strong>Description:</strong> {this.state.book.description}</p>
            <p className="card-publishingInfo"><strong>Publishing Information:</strong>  {this.state.book.publishingInfo.publisher}, {this.state.book.publishingInfo.publicationDate}</p>
            <p className="card-author"><strong>Author:</strong> {this.state.book.author}, <a href={`/author/${this.state.book.authorId}`} style={{color: "#00f"}}>more books...</a></p>
            <p className="card-shortBio"><strong>About the Author:</strong> {this.state.book.shortBio}</p>
            <div className="w-25 mr-auto ml-auto mt-4">
            <ButtonToolbar>
            <button
            type="submit"
            className="btn btn-info w-100"
            onClick={() => {
             this.setState({showMenu: true})
             this.addToWishList()
            }}
            >
            Add to Wish List
            </button>
            <PopUpMenu
            show={this.state.showMenu}
            onHide={closeMenu}
            onSubmit={closeMenu}
            />
            </ButtonToolbar>
            </div>
            <Zoom>
              <img
                src={this.state.book.cover}
                width="200"
                alt=""
              />
            </Zoom>
            <br />
						price: ${this.state.book.price}
            <br />
            <br />
            <button
              className='btn btn-lg btn-success'
              onClick={() => {
                console.log('adding 2')
                this.props.addToCart({
                  id: this.state.book._id,
                  title: this.state.book.title,
                  price: this.state.book.price,
                  cover: this.state.book.cover
                });
              }
              }
            >Add to cart</button>
            <br />
            <h5>Ratings: {this.state.totalRatings}/5</h5>
            <h3 className="panel-title">Write a Review</h3>
            <div className="input-group d-flex flex-column justify-content-center"></div>
            <div className="w-75 mr-auto ml-auto mt-4">
              <input
                value={this.state.author}
                type="text"
                placeholder="Your name"
                className="form-control"
                onChange={this.updateAuthorName}
              />
            </div>
            <div className="w-75 mr-auto ml-auto mt-3">
              <h5 className="panel-title text-left">Rate the book 1-5</h5>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={this.handleRating}
              >
                <option value="1">★</option>
                <option value="2">★★</option>
                <option value="3">★★★</option>
                <option value="4">★★★★</option>
                <option value="5">★★★★★</option>
              </select>
            </div>
            <div className="w-75 mr-auto ml-auto mt-3">
              <textarea
                value={this.state.review}
                type="text"
                placeholder="New Review Here..."
                ref="newNameInput"
                className="form-control"
                onChange={this.updateReview}
              />
            </div>
            <br />
            <span className="input-group-btn mt-5 w-75 mr-auto ml-auto">
              <button
                type="submit"
                className="btn btn-info w-100"
                onClick={this.sendReview}
              >
                Submit
              </button>
            </span>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              <BookReviews reviews={this.state.book.reviews} />
              {/* Shows off the reviews */}
            </ul>
          </div>
        </div >
      );
    }
  }
}

export default function (props) {
  let { id } = useParams();

  return (
    <BookDetail bookId={id} addToCart={props.addToCart} />
  )
};
