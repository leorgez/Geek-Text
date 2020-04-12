import React, { Component } from 'react';

export class Book extends Component {

    state = { 
        bookId: 0,
        title: "",
        cover: null
    };

     constructor(bookId, bookTitle, bookCover) {
         super();
         this.state.bookId = bookId;
         this.state.title = bookTitle;
         this.state.cover = bookCover;
     }


         getBookInfo() {
            console.log(this.state.bookId + "\n" + this.state.title +
            "\n" + this.state.cover);
         }

         getBookTitle() {
             return this.state.title;
         }

         getBookCover() {
             return this.state.cover;
         }

         getBookId() {
             return this.state.bookId;
         }

}



    // render() { 

    // console.log("List name: " + this.state.listName + "\n" + "Books: " +
    //     this.state.count);
    //     return ();

    // }



export default Book;
