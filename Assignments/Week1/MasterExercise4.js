const rl = require("readline/promises").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fetchMovies = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const movies = [
        { title: "The Shawshank Redemption", genre: "Drama", rating: 9.3 },
        { title: "The Godfather", genre: "Crime", rating: 9.2 },
        { title: "The Dark Knight", genre: "Action", rating: 9.0 },
        { title: "Pulp Fiction", genre: "Crime", rating: 8.9 },
        { title: "Forrest Gump", genre: "Drama", rating: 8.8 },
      ];
      resolve(movies);
    }, 1000);
  });
};

const fetchDirectors = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const directors = [
        { name: "Frank Darabont", movies: ["The Shawshank Redemption"] },
        { name: "Francis Ford Coppola", movies: ["The Godfather"] },
        { name: "Christopher Nolan", movies: ["The Dark Knight"] },
        { name: "Quentin Tarantino", movies: ["Pulp Fiction"] },
        { name: "Robert Zemeckis", movies: ["Forrest Gump"] },
      ];
      resolve(directors);
    }, 1000);
  });
};

const getAverageRatingFromGenre = (genre, movies, directorData) => {
  const moviesinGenre = movies.filter(
    (movie) => movie.genre.toLowerCase() === genre.toLowerCase(),
  );
  if (moviesinGenre.length === 0) {
    return 0;
  }
  //   moviesinGenre.forEach((movie) => {
  //     // const director = directorData.find((dir) => {
  //     //   if (dir.movies.includes(movie.title)) {
  //     //     return dir.name;
  //     //   }
  //     // });
  //     const director = directorData.filter((dir) =>
  //       dir.movies.includes(movie.title),
  //     );
  //     console.log("The Director of " + movie.title + " is " + director[0].name);
  //   });

  const moviesWithDirectors = moviesinGenre.map((movie) => {
    const director = directorData.find((dir) =>
      dir.movies.includes(movie.title),
    );
    return { ...movie, director: director ? director.name : "Unknown" };
  });
  console.log(moviesWithDirectors);

  const totalRating = moviesinGenre.reduce(
    (total, movie) => total + movie.rating,
    0,
  );
  return totalRating / moviesinGenre.length;
};

const GetGenreHighlights = async () => {
  try {
    const movies = fetchMovies();
    const directors = fetchDirectors();
    const genre = rl.question("Enter a genre: ");
    const [movieData, directorData, userGenre] = await Promise.all([
      movies,
      directors,
      genre,
    ]);
    const averageRating = getAverageRatingFromGenre(
      userGenre,
      movieData,
      directorData,
    );
    console.log(`Average rating for genre ${userGenre}: ${averageRating}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
};

GetGenreHighlights();
