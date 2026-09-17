function getMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Inception", genre: "Sci-Fi", rating: 9 },
        { id: 2, title: "Interstellar", genre: "Sci-Fi", rating: 8.5 },
        { id: 3, title: "The Dark Knight", genre: "Action", rating: 9 },
        { id: 4, title: "Dune", genre: "sci-fi", rating: 8 },
        { id: 5, title: "John Wick", genre: "Action", rating: 7.5 },
      ]);
    }, 1000);
  });
}

function getDirectors() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { movieId: 1, name: "Christopher Nolan" },
        { movieId: 2, name: "Christopher Nolan" },
        { movieId: 3, name: "Christopher Nolan" },
        { movieId: 4, name: "Denis Villeneuve" },
      ]);
    }, 1500);
  });
}

function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Rahul", favoriteGenre: "SCI-FI" },
        { id: 2, name: "Alex", favoriteGenre: "Action" },
      ]);
    }, 800);
  });
}

const generateUserProfile = (user, movies, directors) => {
  const moviesInGenre = movies.filter(
    (movie) => movie.genre.toLowerCase() === user.favoriteGenre.toLowerCase(),
  );

  const moviesWithDirectors = moviesInGenre.map((movie) => {
    const director = directors.find((dir) => dir.movieId === movie.id);
    return {
      ...movie,
      director: director ? director.name : "Unknown",
    };
  });

  return { ...user, suggestedMovies: moviesWithDirectors };
};
const generateUserDashboard = async (userId) => {
  try {
    const users = getUsers();
    const movies = getMovies();
    const directors = getDirectors();
    const [userData, moviesData, directorsData] = await Promise.all([
      users,
      movies,
      directors,
    ]);
    const user = userData.find((user) => user.id === userId);
    if (!user) {
      throw new Error("User not found");
    }

    const userProfile = generateUserProfile(user, moviesData, directorsData);

    const totalSuggestedMovies = userProfile.suggestedMovies.length;
    const averageRating =
      totalSuggestedMovies > 0
        ? userProfile.suggestedMovies.reduce(
            (total, movie) => total + movie.rating,
            0,
          ) / totalSuggestedMovies
        : 0;

    const highestRatedMovie =
      totalSuggestedMovies > 0
        ? userProfile.suggestedMovies.reduce((highest, movie) => {
            return highest.rating > movie.rating ? highest : movie;
          }, userProfile.suggestedMovies[0])
        : null;

    console.log({
      user: user.name,
      favouriteGenre: user.favoriteGenre,
      movieCount: totalSuggestedMovies,
      averageRating: averageRating,
      highestRatedMovie: highestRatedMovie.title,
      highestRatedMovieDirector: highestRatedMovie.director,
      movies: userProfile.suggestedMovies,
    });
  } catch (error) {
    console.error("Error generating user dashboard:", error);
  }
};

generateUserDashboard(1);
