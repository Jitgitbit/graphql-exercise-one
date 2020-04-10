import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {getBooksQuery} from '../queries/queries'
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null
    }
  }
  displayBooks(){
    const data = this.props.data;   // CHANGED !!
    if(data.loading){
      return(
        <div>Loading books...</div>
      )
    }else{
      return data.books.map(book => {
        return(
          <li key={book.id} onClick={(e) => {this.setState({ selected: book.id })}}>{book.name}</li>
        )
      })
    }
  }
  render() {
    console.log(`======>> PROPS.DATA here is: `,this.props.data)
    console.log(`======>> status of PROPS.DATA.LOADING here is: `,this.props.data.loading)
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected}/>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);