import React, { Component, useEffect } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import {WishList} from './WishList';

export class PopUpMenu extends Component {
    constructor(props){
        super(props);
    }

    state = {
        currentListId: 0
    };


    showLists() {
        if(window.$wishList.length === 0){
            return <p>There are currently no wish lists.</p>;
        }else{
        return <ul>
            {window.$wishList.map(wishList => <li key={wishList.getListId()}>
            <Button 
            variant="primary"
            onClick={() => {this.sendToWishList(wishList.getListId())
            }}
            >{wishList.getListName()}
            </Button></li>)}
        </ul>
        }
    }

    sendToWishList(listId) {
        for(let i = 0; i < window.$wishList.length; i++){
            if(window.$wishList[i].getListId() === listId){
                window.$wishList[i].addBook(window.$tempBook);
                alert(window.$tempBook.getBookTitle() + " was added to " + 
                window.$wishList[i].getListName());
            }
        }
    }


    createAList() {
        if(window.$wishList.length < 3) {
            return <Form onSubmit={this.handleSubmit
                }>
                <Form.Group controlId="WishListName">
                    <Form.Label>Create a wish list: </Form.Label>
                    <Form.Control
                    type="text"
                    name="WishListName"
                    required
                    placeholder="Get creative!"
                    />

                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit">
                        Add Wish List
                    </Button>
                </Form.Group>
            </Form>
        }else{
            return <p>You have reached your wish list quota...</p>
        }
            
    }

    handleSubmit = event => {
        event.preventDefault();
        let name = event.target.WishListName.value;
        let newWishList = new WishList(window.$tempBook, name);
        window.$wishList.push(newWishList);
        alert(window.$tempBook.getBookTitle() + " was added to " + name);
        window.$tempBook = null;
    }

    render() {

        return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add to a Wish List
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
              <Row> 
                {this.showLists()} 
              </Row>
              <Row>
              {this.createAList()}
              </Row>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal> 
        );
    }
}
export default PopUpMenu;