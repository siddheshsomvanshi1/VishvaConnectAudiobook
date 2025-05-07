import React, { useState } from 'react';
import styles from '../styles/BooksCards.module.css';
import buttonStyles from '../styles/Button.module.css';
import booksData from '../data/books.json';
import BookDetails from './BookDetails';
import Checkout from './Checkout';

const BookCard = ({ book, onViewDetails, onBuy }) => {
  const { image, title, price } = book;
  
  const handleClick = (e) => {
    if (e.target.className.includes('buyButton')) {
      onBuy(book);
    } else {
      onViewDetails(book);
    }
  };

  return (
    <div className={styles.bookCard} onClick={handleClick}>
      <div className={styles.bookImageContainer}>
        <img 
          src={image} 
          alt={title}
          className={styles.bookImage}
        />
        <div className={styles.priceTag}>₹{price}</div>
      </div>
      <div className={styles.bookInfo}>
        <h3 className={styles.bookName}>{title}</h3>
        <button 
          className={`${buttonStyles.button} ${buttonStyles.primary}`}
          onClick={(e) => {
            e.stopPropagation();
            onBuy(book);
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

const BooksCards = ({ searchQuery = '', selectedCategory = 'All' }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const books = booksData.books || [];
  
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setShowCheckout(false);
  };

  const handleBuy = (book) => {
    setSelectedBook(book);
    setShowCheckout(true);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  const handleCloseCheckout = () => {
    setSelectedBook(null);
    setShowCheckout(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.booksGrid}>
        {filteredBooks.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            onViewDetails={handleViewDetails}
            onBuy={handleBuy}
          />
        ))}
      </div>
      {selectedBook && !showCheckout && (
        <BookDetails 
          book={selectedBook} 
          onClose={handleCloseDetails}
          onBuy={handleBuy}
        />
      )}
      {selectedBook && showCheckout && (
        <Checkout 
          book={selectedBook}
          onClose={handleCloseCheckout}
        />
      )}
    </div>
  );
};

export default BooksCards;
