import React, { useState, useEffect } from 'react'

export default function CartView() {
	const [itemsList, setItemsList] = useState([]);
	useEffect(() => {
		// fetch items from local storage;
		let items = JSON.parse(localStorage.getItem('items'));
		if (items) {
			setItemsList(items);
		}
	}, []);
	const removeItem = (id) => {
		const newArray = itemsList.filter(item => item.id !== id)
		localStorage.setItem('items',JSON.stringify(newArray))
		setItemsList(newArray);
	}
	const getCartItemsData = () => {
		let finalArray = [];
		for (let i = 0; i < itemsList.length; i++) {
			let index = finalArray.findIndex(item => item.id === itemsList[i].id);
			console.log(index)
			if (index >= 0) {
				finalArray[index].quantity++;
			} else {
				finalArray.push({ ...itemsList[i], quantity: 1 })
			}
		}
		console.log(finalArray)
		return finalArray.map((item, index) => <tr key={index}>
			<td>
				{item.title}
				<br />
				<br />
				<img src={item.cover} alt='cover' style={{ width: 80 }} />
			</td>
			<td>${item.price}</td>
			<td>{item.quantity}</td>
			<td><button className='btn btn-danger'
				onClick={() => {
					removeItem(item.id);
				}}
			>Remove</button></td>
		</tr>
		);
	}


	const getSum = (total, item) => total + parseInt(item.price, 10);


	//numbers.reduce(getSum, 0);
	return (
		<div>
			{
				itemsList.length === 0 ? "Your cart is empty." :
					<div className='m-5 w-75 mx-auto'>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Title</th>
									<th scope="col">Price($)</th>
									<th scope="col">Quantity</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{getCartItemsData()}
							</tbody>
						</table>
						<div className='h4'>Grand Total: ${itemsList.reduce(getSum, 0)}</div>
					</div>
			}

		</div>
	)
}
