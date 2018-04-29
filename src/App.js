import React from 'react'
import { Route } from 'react-router-dom'
import Search from './Search'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  refreshBooks = () => {
    BooksAPI.getAll()
      .then((books) => (
        this.setState({books})
      ));
  }

  componentDidMount() {
    this.refreshBooks();
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search books={this.state.books} refreshBooks={this.refreshBooks}/>
        )}/>
        <Route exact path="/" render={() => (
          <Bookshelf books={this.state.books} refreshBooks={this.refreshBooks}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp;
