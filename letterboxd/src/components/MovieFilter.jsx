import React, { useState } from 'react';
import '../styles/MovieFilter.css'

const MovieFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    genre: '',
    fromPublishedYear: '',
    toPublishedYear: '',
    fromRate: '',
    toRate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters); // Pass the filters to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="movie-filter-form">
      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          value={filters.genre}
          onChange={handleChange}
        >
          <option value="">All Genres</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="war">War</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="fromPublishedYear">From Published Year</label>
        <input
          type="number"
          id="fromPublishedYear"
          name="fromPublishedYear"
          value={filters.fromPublishedYear}
          onChange={handleChange}
          placeholder="e.g., 1990"
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>

      <div className="form-group">
        <label htmlFor="toPublishedYear">To Published Year</label>
        <input
          type="number"
          id="toPublishedYear"
          name="toPublishedYear"
          value={filters.toPublishedYear}
          onChange={handleChange}
          placeholder="e.g., 2023"
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fromRate">From Rate</label>
        <input
          type="number"
          id="fromRate"
          name="fromRate"
          value={filters.fromRate}
          onChange={handleChange}
          placeholder="e.g., 5"
          min="0"
          max="10"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="toRate">To Rate</label>
        <input
          type="number"
          id="toRate"
          name="toRate"
          value={filters.toRate}
          onChange={handleChange}
          placeholder="e.g., 10"
          min="0"
          max="10"
          step="0.1"
        />
      </div>

      <button type="submit" className="filter-button">
        Apply Filters
      </button>
    </form>
  );
};

export default MovieFilter;