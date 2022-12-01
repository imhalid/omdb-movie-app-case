import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const API = `http://www.omdbapi.com/?apikey=83d16d20`;
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("star");

  const getMovies = async () => {
    const response = await fetch(`${API}&s=${searchValue}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    }
  };
  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);
  console.log(movies);

  // if (!movies) return <h1>Loading...</h1>;

  return (
    <div className="text-lg text-blue-600">
      <h1>Home</h1>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {movies.map((movie) => (
        <div key={movie.imdbID}>
          <h1>{movie.Title}</h1>
          <img src={movie.Poster} alt={movie.Title} />
          <Link href={`/movies/${movie.imdbID}`}>Go To Movie</Link>
        </div>
      ))}

      <p>Load Pages </p>
    </div>
  );
}
