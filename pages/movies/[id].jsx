export const getStaticPaths = async () => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=83d16d20&s=star`
  );
  const data = await response.json();
  const paths = data.Search.map((movie) => {
    return {
      params: { id: movie.imdbID },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=83d16d20&i=${id}`
  );
  const data = await response.json();
  return {
    props: { movie: data },
  };
};

export default function Movie(params) {
  console.log(params);
  const movie = params.movie;

  // const API = `http://www.omdbapi.com/?apikey=83d16d20`;
  // const [movies, setMovies] = useState([]);
  // const [searchValue, setSearchValue] = useState("star");

  // const getMovies = async () => {
  //   const response = await fetch(`${API}&s=${searchValue}`);
  //   const data = await response.json();
  //   if (data.Search) {
  //     setMovies(data.Search);
  //   }
  // };
  // useEffect(() => {
  //   getMovies();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchValue]);
  // console.log(movies);

  return (
    <div>
      <h1>Movie</h1>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <h1>{movie.Actors}</h1>
      <h1>{movie.Plot}</h1>
      <h1>{movie.Writer}</h1>
      <h1>{movie.Director}</h1>
      <h1>{movie.Genre}</h1>
      <h1>{movie.Released}</h1>
      <h1>{movie.Runtime}</h1>
      <h1>{movie.imdbRating}</h1>
      <h1>{movie.imdbVotes}</h1>
    </div>
  );
}
