import React from 'react';
import styles from '../styles/Header.module.css';

const Header = ({ onSearch, onCategoryChange }) => {
  const categories = ['All', 'Fiction', 'Non-Fiction', 'Sci-Fi', 'Romance'];
  const languages = ['English', 'Spanish', 'French', 'German'];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.filters}>
        <select 
          className={styles.dropdown}
          onChange={(e) => onCategoryChange(e.target.value)}
          defaultValue="All"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select className={styles.dropdown} defaultValue="English">
          {languages.map(language => (
            <option key={language} value={language}>{language}</option>
          ))}
        </select>
      </div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name"
          className={styles.searchInput}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className={styles.subscribeButton}>Subscribed</button>
      </div>
    </header>
  );
};

export default Header;
