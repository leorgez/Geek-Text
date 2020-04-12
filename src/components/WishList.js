 import React, { Component } from 'react';

export class WishList extends Component {


     state = { 
         listId: Math.random(),
         listName: "",
         books: []
      };


      constructor(initialBook, name) {
          super();
          this.state.listName = name;
          this.state.books.push(initialBook);

      }

      addBook(newBook) {
          this.state.books.push(newBook);
      }

      removeBook(bookId){
          for(let i = 0; i < this.state.books.length; i++){
              if(this.state.books[i].getBookId() === bookId){
                  this.state.books.pop();
              }
          }
      }

      getListName() {
          return this.state.listName;
      }

      getListId() {
          return this.state.listId;
      }

      getBooks(){

        let tempBooks = this.state.books;
        return tempBooks;
      }


}

//     render() { 
//         return (  );
//     }

 
 
 export default WishList;