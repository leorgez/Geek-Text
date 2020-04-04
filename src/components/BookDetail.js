import React, { Component } from 'react';
import {
	useParams
} from "react-router-dom";
import { apiUrl } from '../api';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


class BookDetail extends Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			book: null
		}
	}

	componentDidMount() {
		this._asyncRequest = this.loadBook(this.props.bookId).then(
			book => {
				this._asyncRequest = null;
				this.setState({ book });
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
						<h5 className="card-genre">Genre: {this.state.book.genre}</h5>
						<h5 className="card-publishingInfo">Publishing Information: {this.state.book.publishingInfo.publisher}, {this.state.book.publishingInfo.publicationDate}</h5>
						<h5 className="card-genre">Genre: {this.state.book.genre}</h5>
						<p className="card-author">{this.state.book.author}</p>
						<p className="card-shortBio">{this.state.book.shortBio}</p>
						<Zoom>
							<img
								src={this.state.book.cover}
								width="400"
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
					</div>
					{/* <img src={this.state.book.cover} className="card-img-bottom" height="50%" /> */}
				</div>
			)
		}
	}
}

export default function (props) {
	let { id } = useParams();

	return (
		<BookDetail bookId={id} addToCart={props.addToCart} />
	)
};
