import React, { Component, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import {
    useParams
  } from "react-router-dom";

export class ViewWishLists extends Component {
    constructor(props){
        super(props)
    }

    state = {
        currentListIndex: 0,
        currentListId: 0,
        currentBook: null
    };



  handleListSwitch = event => {
    let tempId = parseFloat(event.target.value);

    for(let i = 0; i < window.$wishList.length; i++){
        if(window.$wishList[i].getListId() === tempId){
            this.setState({currentListIndex: i});
        }
    }
  }

  showBooks() {
      if(window.$wishList[this.state.currentListIndex].getBooks().length === 0){
          return <p>There are no books in this list.</p>
      }else{
          this.state.currentListId = window.$wishList[this.state.currentListIndex].getListId();
          return window.$wishList[this.state.currentListIndex].getBooks().map(book => 
            <div key={book.getBookId()} className="card">
            <div className="card-body">
            <img className="mr-3 rounded" alt='cover' src={book.getBookCover()} height="200" />
        <h5 className="card-title">{book.getBookTitle()}</h5>
            </div> 
            <Button 
            className="w-25"
            variant="primary"
            onClick={() => {this.removeFromList(book.getBookId())}}
            >
                Remove Book
            </Button>
            <div className="mr-auto w-20">
              <h5 className="panel-title text-left">Transfer to another wish list: </h5>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={this.setCurrentBook(book), this.handleListTransfer}
              >{window.$wishList.map(wishList =>{ 
                  if(wishList.getListId() !== this.state.currentListId){
                      return (
                        <>
                        <option key='0'> </option>
                      <option key={wishList.getListId()} value={wishList.getListId()}>{wishList.getListName()}</option>
                    </>
              );}})}
                
              </select>
            </div>
            <Button 
            className="w-25"
            variant="primary"
            onClick={() => {this.moveToShoppingCart(book)}}
            >
                Add to Shopping Cart
            </Button>
        </div>
        );
      }
  }

  moveToShoppingCart = book => {
    let tempData = JSON.parse(localStorage.getItem('items'));
    localStorage.setItem('items', JSON.stringify([...tempData, {
        id: book.getBookId(),
        title: book.getBookTitle(),
        price: 10,
        cover: book.getBookCover()
    }]))
    this.removeFromList(book.getBookId());
  }

  setCurrentBook = book => {
      this.state.currentBook = book;
  }
  

  handleListTransfer = event => {
      let tempId = parseFloat(event.target.value);
      for(let i = 0; i < window.$wishList.length; i++){
        if(window.$wishList[i].getListId() === tempId){
            window.$wishList[i].addBook(this.state.currentBook);
            window.$wishList[this.state.currentListIndex].removeBook(this.state.currentBook.getBookId());
            this.setState(this.state);
        }
    }

  }

  removeFromList(bookId) {
      window.$wishList[this.state.currentListIndex].getBooks().map(book => {
          if(book.getBookId() === bookId){
              window.$wishList[this.state.currentListIndex].removeBook(bookId);
          }
      });
      this.setState(this.state);
  }

  removeThisList = () => {
      this.state.currentListId = window.$wishList[this.state.currentListIndex].getListId();
      
      for(let i = 0; i < window.$wishList.length; i++) {
          if(window.$wishList[i].getListId() === this.state.currentListId){
              window.$wishList.pop();
          }
      }
      this.setState({currentListIndex: 0});
  }


    render() { 
        return ( 
            
            window.$wishList.length === 0 ? <p>There are no wish lists currently to show.</p> :
            <> 
            <h5> There are {window.$wishList.length} lists</h5>
            <h3>{window.$wishList[this.state.currentListIndex].getListName()}</h3>
            <div className="w-75 mr-auto ml-auto mt-3">
              <h5 className="panel-title text-center">Switch wish lists: </h5>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={this.handleListSwitch}
              >{window.$wishList.map(wishList => 
              <option key={wishList.getListId()} value={wishList.getListId()}>{wishList.getListName()}</option>
              )}
                
              </select>
            </div>
            <div>
                {this.showBooks()}
            </div>
            <div className="mr-auto ml-auto mt-3">
            <Button
            variant="danger"
            onClick={this.removeThisList}
            >Delete this list.
            </Button>
            </div>
            </>
         );
    }
}
 
export default ViewWishLists;