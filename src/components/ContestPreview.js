import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {WishList} from './WishList';
import { Book } from './Book';

class ContestPreview extends Component {
  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  // For now, the "Add to Wish List" button prints to the console. 
  handleAddWishListButton = () => {   // should determine if user is logged in AND if WishList(s) exists
    let newBook = new Book(this.props.categoryName, this.props.contestName);
    let newList = new WishList(newBook);
    newList.viewList();
  };

  

  render() {
    return (
      <>
      <div className="link ContestPreview" onClick={this.handleClick}>
        <div className="category-name">
          {this.props.categoryName}
        </div>
        <div className="contest-name">
          {this.props.contestName}
        </div>
      </div>                              {/*{ () => this.handleWishListButton(currentUser) }*/}
       <div className="wish-list" onClick={this.handleAddWishListButton}> 
        <div className="add-here">
          <h6>Add to Wish List</h6>
         </div>
         <div className="addButton">
           <button>+</button>
         </div>
       </div>
      </>
    );
  }
};


ContestPreview.propTypes = {
  id: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  contestName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContestPreview;
