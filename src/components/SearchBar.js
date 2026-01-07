import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import '../SearchBar.css';

function SearchBar({ onSearch, searching }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Auto-search on empty (to reset)
    if (value === '') {
      onSearch('');
    }
  };

  return (
    <div className="search-section">
      <Form onSubmit={handleSubmit}>
        <div className="search-bar-container">
          

          <Form.Control
            type="text"
            placeholder="Search your screenshots and documents..."
            value={query}
            onChange={handleChange}
            disabled={searching}
          />
        </div>
      </Form>

      {searching && (
        <div className="text-center mt-2">
          <small className="text-muted">Searching...</small>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
