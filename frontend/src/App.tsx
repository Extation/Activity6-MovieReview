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

interface FormErrors {
  title?: string;
  description?: string;
  director?: string;
  releaseYear?: string;
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
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'movie' | 'review'; id: string } | null>(null);

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

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!newMovie.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!newMovie.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!newMovie.director.trim()) {
      errors.director = 'Director is required';
    }
    
    const currentYear = new Date().getFullYear();
    if (newMovie.releaseYear < 1800 || newMovie.releaseYear > currentYear + 5) {
      errors.releaseYear = `Year must be between 1800 and ${currentYear + 5}`;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await movieAPI.create(newMovie);
      setNewMovie({
        title: '',
        description: '',
        director: '',
        releaseYear: new Date().getFullYear(),
      });
      setFormErrors({});
      setShowAddForm(false);
      loadMovies();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    setDeleteTarget({ type: 'movie', id });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      if (deleteTarget.type === 'movie') {
        await movieAPI.delete(deleteTarget.id);
        loadMovies();
        setSelectedMovie(null);
      } else if (deleteTarget.type === 'review') {
        await reviewAPI.delete(deleteTarget.id);
        if (selectedMovie) {
          const res = await movieAPI.getOne(selectedMovie.id);
          setSelectedMovie(res.data);
          loadMovies();
        }
      }
      setShowDeleteModal(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteTarget(null);
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
    setDeleteTarget({ type: 'review', id: reviewId });
    setShowDeleteModal(true);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Movie Review Platform</h1>
        <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <FaPlus /> Add Movie
        </button>
      </header>

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

        {showAddForm && (
          <form onSubmit={handleAddMovie} className="form-container">
            <h2>Add New Movie</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="Title"
                value={newMovie.title}
                onChange={(e) => {
                  setNewMovie({ ...newMovie, title: e.target.value });
                  if (formErrors.title) setFormErrors({ ...formErrors, title: undefined });
                }}
                className={formErrors.title ? 'error' : ''}
              />
              {formErrors.title && <span className="error-message">{formErrors.title}</span>}
            </div>
            
            <div className="form-group">
              <input
                type="text"
                placeholder="Description"
                value={newMovie.description}
                onChange={(e) => {
                  setNewMovie({ ...newMovie, description: e.target.value });
                  if (formErrors.description) setFormErrors({ ...formErrors, description: undefined });
                }}
                className={formErrors.description ? 'error' : ''}
              />
              {formErrors.description && <span className="error-message">{formErrors.description}</span>}
            </div>
            
            <div className="form-group">
              <input
                type="text"
                placeholder="Director"
                value={newMovie.director}
                onChange={(e) => {
                  setNewMovie({ ...newMovie, director: e.target.value });
                  if (formErrors.director) setFormErrors({ ...formErrors, director: undefined });
                }}
                className={formErrors.director ? 'error' : ''}
              />
              {formErrors.director && <span className="error-message">{formErrors.director}</span>}
            </div>
            
            <div className="form-group">
              <input
                type="number"
                placeholder="Release Year"
                value={newMovie.releaseYear}
                onChange={(e) => {
                  setNewMovie({ ...newMovie, releaseYear: parseInt(e.target.value) || new Date().getFullYear() });
                  if (formErrors.releaseYear) setFormErrors({ ...formErrors, releaseYear: undefined });
                }}
                className={formErrors.releaseYear ? 'error' : ''}
              />
              {formErrors.releaseYear && <span className="error-message">{formErrors.releaseYear}</span>}
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="btn-primary">
                Add Movie
              </button>
              <button type="button" className="btn-secondary" onClick={() => {
                setShowAddForm(false);
                setFormErrors({});
              }}>
                Cancel
              </button>
            </div>
          </form>
        )}

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

      {showDeleteModal && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this {deleteTarget?.type}?</p>
            <div className="modal-buttons">
              <button className="btn-danger" onClick={confirmDelete}>
                Delete
              </button>
              <button className="btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
