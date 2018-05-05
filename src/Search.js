import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {
    state = {
        query: '',
        books: [],
        results: [],
    }

    componentWillMount(){
        this.setState({books: this.props.books});
    }
    updateQuery = (query) => {
        this.setState({ query: query })
        if (query.length > 1) {
            BooksAPI.search(query)
                .then(
                    (results) => {
                        let newResults = results.map((book) => {
                            let bookInShelf = this.props.books.find(x => x.id === book.id);
                            if(bookInShelf === undefined) {
                                book.shelf = 'none';
                                return book;
                            } else {
                                return bookInShelf;
                            }
                        });
                        return newResults;
                    }
                )
                .then(
                    (results) => {
                        this.setState({ results: results || [] });
                    }, 
                    () => ([])
                )
        } else {
            this.setState({ results: [] });
        }
    }

    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
               {  this.state.results.map((book) => {
                    return (<Book key={book.id} book={book} refreshBooks={this.props.refreshBooks} shelf={book.shelf}/>);
                }) }
              </ol>
            </div>
          </div>
        )
    }
}

export default Search