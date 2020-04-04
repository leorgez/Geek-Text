import React from 'react'
import { Link } from 'react-router-dom'
import cartimg from './cartimg.svg'

export default function MiniCartInfo(props) {
	console.log(props)
	return (
		<div className='p-2 w-100'>
			<div></div>
			<div className='h4' >You have {props.cartLength} item(s) in your cart. <Link to='/cart'>View cart <img alt='icon' style={{width:40}} src={cartimg} ></img></Link></div>
		</div>
	)
}
