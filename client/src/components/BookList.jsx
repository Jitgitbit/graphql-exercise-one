import React, { Component } from 'react'
import {gql} from 'apollo-boost';
import { compose, graphql } from 'react-apollo'

const getBooksQuery = gql`{
  books{
    name
    id
  }
}`

class BookList extends Component {
  render() {
    console.log(`======>> PROPS here are: `,this.props)
    return (
      <div>
        <ul id="book-list">
          <li>Book Name</li>
        </ul>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);