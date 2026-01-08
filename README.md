# Activity 6: Movie Review API + UI

## Description
A full-stack application where users can browse movies, add reviews, and see average ratings. The platform demonstrates CRUD operations with real-time rating calculations.

## Features
- ✅ Add, view, update, and delete movies
- ✅ Add and delete reviews for each movie
- ✅ Automatic average rating calculation
- ✅ Real-time UI updates
- ✅ Responsive design

## Tech Stack
- **Backend**: NestJS + TypeScript
- **Frontend**: ReactJS
- **Database**: SQLite
- **API Documentation**: Swagger/OpenAPI
- **Package Manager**: npm (no Vite)

## Project Structure
```
Activity6-MovieReview/
├── backend/
│   ├── src/
│   │   ├── movies/
│   │   │   ├── movie.entity.ts
│   │   │   ├── movie.service.ts
│   │   │   ├── movie.controller.ts
│   │   │   ├── movie.module.ts
│   │   │   └── dto/
│   │   │       └── create-movie.dto.ts
│   │   ├── reviews/
│   │   │   ├── review.entity.ts
│   │   │   ├── review.service.ts
│   │   │   ├── review.controller.ts
│   │   │   ├── review.module.ts
│   │   │   └── dto/
│   │   │       └── create-review.dto.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── api.ts
│   │   ├── index.tsx
│   │   └── public/
│   │       └── index.html
│   └── package.json
└── README.md
```

## Installation & Setup

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
The API will run on `http://localhost:3001`
Swagger docs: `http://localhost:3001/api/docs`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The app will run on `http://localhost:3000`

## API Endpoints

### Movies
- `GET /movies` - Get all movies
- `GET /movies/:id` - Get movie by ID
- `POST /movies` - Create a new movie
- `PUT /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie

### Reviews
- `GET /reviews/movie/:movieId` - Get all reviews for a movie
- `POST /reviews/:movieId` - Create a review for a movie
- `GET /reviews/:id` - Get a specific review
- `DELETE /reviews/:id` - Delete a review

## Database Schema

### Movies Table
- id (UUID, Primary Key)
- title (String)
- description (Text)
- director (String)
- releaseYear (Integer)
- averageRating (Decimal)
- createdAt (DateTime)

### Reviews Table
- id (UUID, Primary Key)
- rating (Integer, 1-5)
- comment (Text)
- userName (String)
- movieId (Foreign Key)
- createdAt (DateTime)

## Usage
1. Run the backend server
2. Run the frontend application
3. Add movies using the "Add Movie" button
4. Click on a movie to view details
5. Add reviews with ratings (1-5 stars)
6. Average rating updates automatically
