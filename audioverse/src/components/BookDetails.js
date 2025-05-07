import React from 'react';
import styles from '../styles/BookDetails.module.css';

const BookDetails = ({ book, onClose, onBuy }) => {
  if (!book) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.content}>
          <div className={styles.imageSection}>
            <img src={book.image} alt={book.title} className={styles.bookImage} />
            <button className={styles.buyButton} onClick={() => onBuy(book)}>
              Buy ₹{book.price}
            </button>
          </div>
          <div className={styles.infoSection}>
            <h2 className={styles.bookName}>{book.title}</h2>
            <div className={styles.category}>Category: {book.category}</div>
            <div className={styles.bookInfo}>
              {book.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
