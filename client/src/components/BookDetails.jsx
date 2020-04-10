import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {getBookQuery} from '../queries/queries'

class Bookdetails extends Component {
  
  render() {
    console.log(`===>> PROPS here are:`,this.props)
    return (
      <div id="book-details">
        <p>output bookdetails here</p>
      </div>
    )
  }
}

export default graphql(getBookQuery)(Bookdetails);          // binding getBookQuery to BookDetails  !!!