import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'
import { flowRight as compose } from 'lodash';

class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:"",
      genre:"",
      authorId:""
    };
  };
  displayAuthors(){
    const data = this.props.getAuthorsQuery;            // THIS CHANGED !!!
    if(data.loading){
      return(
        <option disabled>Loading Authors...</option>
      );
    }else{
      return data.authors.map(author => {
        return(
          <option key={author.id} value={author.id}>{author.name}</option>
        )
      })
    }
  }
  submitForm(e){
    e.preventDefault();
    console.log(`===>> the STATE IS HERE: `, this.state)
    console.log(`===>> the PROPS ARE HERE: `, this.props)
    this.props.addBookMutation({
      variables:{
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e) => this.setState({genre: e.target.value})}/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({authorId: e.target.value})}>
            <option>select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
  graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook);