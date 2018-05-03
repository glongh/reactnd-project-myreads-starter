import React from 'react'
import * as BooksAPI from './BooksAPI'


class Book extends React.Component {

    state = {
        shelf: 'none'
    }

    updateShelf = (event) => {
        BooksAPI.update(this.props.book, event.target.value);
        this.setState({ shelf:  event.target.value});
        this.props.refreshBooks();
    }

    componentWillMount(){
        this.setState({ shelf:  this.props.shelf});
    }

    render() {
        const images = this.props.book.imageLinks || [];
        const authors = this.props.book.authors || [];
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${images.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.updateShelf} value={this.state.shelf || 'none'}>
                                <option value="" disabled>Move to...</option>
                                <option key="currentlyReading" value="currentlyReading">currentlyReading</option>
                                <option key="wantToRead" value="wantToRead">wantToRead</option>
                                <option key="read" value="read">read</option>
                                <option key="none" value="none">none</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    { authors.map((author)=>(
                        <div key={author} className="book-authors">{author}</div>
                    )) }
                </div>
            </li>
        )
    }
}

export default Book;