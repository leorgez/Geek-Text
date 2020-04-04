import React, { useState, useEffect } from 'react';
import './App.css';
import BooksList from './components/BooksList';
import BookDetail from './components/BookDetail';

import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import MiniCartInfo from './components/MiniCartInfo';
import CartView from './components/CartView';


function App() {
	const [cartItems, setCartItems] = useState([]);
	useEffect(() => {
		let items = JSON.parse(localStorage.getItem('items'));
		if (items) {
			setCartItems(items);
		}
	}, []);
	const addToCart = (book) => {
		setCartItems([...cartItems, book]);
		localStorage.setItem('items', JSON.stringify([...cartItems, book]));
	}
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/books/:id">
						<MiniCartInfo cartLength={cartItems.length} />
						<BookDetail
							addToCart={addToCart}
						/>
					</Route>
					<Route path="/cart">
						<CartView />
					</Route>
					<Route path="/">
						<MiniCartInfo cartLength={cartItems.length} />
						<BooksList
							addToCart={addToCart} />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
