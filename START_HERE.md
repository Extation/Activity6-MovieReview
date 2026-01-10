# 🚀 Quick Start Guide - Activity 6: Movie Review API

## Prerequisites
- Node.js (v16 or higher)
- npm

## Step-by-Step Instructions

### 1️⃣ Start Backend (Terminal 1)
```bash
cd Activity6-MovieReview/backend
npm install
npm run dev
```

**Expected Output:**
```
[Nest] Application successfully started
[Nest] Listening on http://localhost:3001
```

✅ Backend is ready when you see "Application successfully started"
✅ API Documentation: http://localhost:3001/api-docs

---

### 2️⃣ Start Frontend (Terminal 2 - Keep backend running!)
```bash
cd Activity6-MovieReview/frontend
npm install
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view the app in the browser.
Local: http://localhost:3000
```

✅ Frontend is ready when browser opens automatically
✅ Application URL: http://localhost:3000

---

## 🎯 How to Use

1. **Add a Movie**
   - Click "Add Movie" button
   - Fill in: Title, Description, Director, Release Year
   - Click "Create Movie"

2. **View Movie Details**
   - Click on any movie card
   - See movie information and reviews

3. **Add a Review**
   - Select a movie
   - Enter your name
   - Choose rating (1-5 stars)
   - Write a comment
   - Click "Submit Review"

4. **Watch Rating Update**
   - Average rating updates automatically
   - Shows on movie card

---

## 🔧 Troubleshooting

### Port Already in Use
If port 3001 or 3000 is busy:

**Backend (port 3001):**
- Edit `backend/src/main.ts`
- Change port number in `app.listen(3001)`

**Frontend (port 3000):**
- Will automatically try port 3001, 3002, etc.

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Database Issues
- Delete `backend/movie-review.db`
- Restart backend (database recreates automatically)

---

## 📊 API Endpoints

### Movies
- `GET    /movies` - List all movies
- `GET    /movies/:id` - Get movie details
- `POST   /movies` - Create movie
- `PUT    /movies/:id` - Update movie
- `DELETE /movies/:id` - Delete movie

### Reviews
- `GET    /reviews/movie/:movieId` - Get movie reviews
- `POST   /reviews/:movieId` - Add review
- `DELETE /reviews/:id` - Delete review

---

## 🎨 Features

✅ Full CRUD operations for movies
✅ Review system with 1-5 star ratings
✅ Automatic average rating calculation
✅ Responsive UI design
✅ Real-time updates
✅ SQLite database (auto-created)
✅ Swagger API documentation

---

## 📝 Notes

- Backend must be running before starting frontend
- Database file: `backend/movie-review.db`
- All data persists between restarts
- No authentication required (development mode)

---

**Need help?** Check the main README.md or API documentation at http://localhost:3001/api-docs
