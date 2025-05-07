import React, { useState } from 'react';
import Header from '../components/Header';
import BooksCards from '../components/BooksCards';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles.dashboard}>
      <Header 
        onSearch={handleSearch} 
        onCategoryChange={handleCategoryChange}
      />
      <main className={styles.main}>
        <BooksCards 
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </main>
    </div>
  );
};

export default Dashboard;
