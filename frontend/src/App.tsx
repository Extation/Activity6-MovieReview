import React, { useState, useEffect } from 'react';
import { movieAPI, reviewAPI } from './api';
import './App.css';
import { FaStar, FaTrash, FaPlus } from 'react-icons/fa';

interface Movie {
  id: string;
  title: string;
  description: string;
  director: string;
  releaseYear: number;
  averageRating: number;
  reviews?: Review[];
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    director: '',
    releaseYear: new Date().getFullYear(),
  });
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', userName: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const res = await movieAPI.getAll();
      setMovies(res.data);
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await movieAPI.create(newMovie);
      setNewMovie({
        title: '',
        description: '',
        director: '',
        releaseYear: new Date().getFullYear(),
      });
      setShowAddForm(false);
      loadMovies();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    try {
      await movieAPI.delete(id);
      loadMovies();
      setSelectedMovie(null);
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovie) return;
    try {
      await reviewAPI.create(selectedMovie.id, newReview);
      setNewReview({ rating: 5, comment: '', userName: '' });
      const res = await movieAPI.getOne(selectedMovie.id);
      setSelectedMovie(res.data);
      loadMovies();
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!selectedMovie) return;
    try {
      await reviewAPI.delete(reviewId);
      const res = await movieAPI.getOne(selectedMovie.id);
      setSelectedMovie(res.data);
      loadMovies();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎬 Movie Review Platform</h1>
        <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <FaPlus /> Add Movie
        </button>
      </header>

      {showAddForm && (
        <form onSubmit={handleAddMovie} className="form-container">
          <h2>Add New Movie</h2>
          <input
            type="text"
            placeholder="Title"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newMovie.description}
            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Director"
            value={newMovie.director}
            onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Release Year"
            value={newMovie.releaseYear}
            onChange={(e) => setNewMovie({ ...newMovie, releaseYear: parseInt(e.target.value) })}
            required
          />
          <button type="submit" className="btn-primary">
            Add Movie
          </button>
          <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
            Cancel
          </button>
        </form>
      )}

      <div className="main-content">
        <div className="movies-list">
          <h2>Movies</h2>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={`movie-card ${selectedMovie?.id === movie.id ? 'selected' : ''}`}
              onClick={() => setSelectedMovie(movie)}
            >
              <h3>{movie.title}</h3>
              <p className="director">Dir: {movie.director}</p>
              <p className="year">{movie.releaseYear}</p>
              <div className="rating">
                <FaStar className="star" />
                <span>{movie.averageRating.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedMovie && (
          <div className="movie-detail">
            <div className="detail-header">
              <h2>{selectedMovie.title}</h2>
              <button className="btn-danger" onClick={() => handleDeleteMovie(selectedMovie.id)}>
                <FaTrash /> Delete
              </button>
            </div>
            <p><strong>Director:</strong> {selectedMovie.director}</p>
            <p><strong>Year:</strong> {selectedMovie.releaseYear}</p>
            <p><strong>Description:</strong> {selectedMovie.description}</p>
            <div className="rating-large">
              <FaStar className="star" />
              <span>{selectedMovie.averageRating.toFixed(1)}</span>
            </div>

            <div className="reviews-section">
              <h3>Reviews ({selectedMovie.reviews?.length || 0})</h3>

              <form onSubmit={handleAddReview} className="review-form">
                <h4>Add Review</h4>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.userName}
                  onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Your Review..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  required
                />
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ Good</option>
                  <option value={3}>⭐⭐⭐ Average</option>
                  <option value={2}>⭐⭐ Poor</option>
                  <option value={1}>⭐ Terrible</option>
                </select>
                <button type="submit" className="btn-primary">
                  Submit Review
                </button>
              </form>

              <div className="reviews-list">
                {selectedMovie.reviews?.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <strong>{review.userName}</strong>
                      <span className="rating">{Array(review.rating).fill('⭐').join('')}</span>
                    </div>
                    <p>{review.comment}</p>
                    <button
                      className="btn-delete-small"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
