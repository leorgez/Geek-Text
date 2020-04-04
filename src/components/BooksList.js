import React, { Component } from 'react';
import { Link } from "react-router-dom";
import VirtualList from 'react-virtual-list';
import { apiUrl } from '../api';

class BooksList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: null
		}
	}

	async componentDidMount() {
		this._asyncRequest = this.loadBooks().then(
			books => {
				this._asyncRequest = null;
				this.setState({ books })
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
					addToCart={this.props.addToCart}
				/>
			)
		}
	}
}

export default BooksList;

const MyList = ({
	virtual,
	itemHeight,
	addToCart
}) => (
		<ul className="list-group">
			{virtual.items.map((item) => (
				<li key={`item${item._id}`} className="list-group-item">
					<div className="media">
						<Link to={`/books/${item._id}`}>
							<img className="mr-3 rounded" alt='cover' src={item.cover} height="200" />
						</Link>
						<div className="media-body">
							<h5 className="mt-0">{item.title}</h5>
							{item.description}
							<br /><br />
							<div>
								Price: ${item.price} <button
									className='btn btn-success'
									onClick={
										() => {
											console.log('adding')
											addToCart({
												id: item._id,
												title: item.title,
												price: item.price,
												cover: item.cover
											});
										}
									}>Add to cart</button>
							</div>
						</div>
					</div>
				</li>
			))}
		</ul>
	);

const MyVirtualList = VirtualList()(MyList);
