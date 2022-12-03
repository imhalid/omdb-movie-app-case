/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

export default function Home() {
  const [pageIndex, setPageIndex] = useState(1);
  // const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("batman");
  const [search, setSearch] = useState("");

  const router = useRouter();
  const id = router.query.id;

  // const getMovies = async () => {
  //   const response = await fetch(
  //     `http://www.omdbapi.com/?apikey=83d16d20&s=${searchValue}`
  //   );
  //   const data = await response.json();
  //   if (data.Search) {
  //     setMovies(data.Search);
  //   }
  // };

  // useEffect(() => {
  //   getMovies();
  // }, [searchValue]);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    `http://www.omdbapi.com/?apikey=83d16d20&s=${searchValue}&page=${pageIndex}`,
    fetcher
  );

  if (!data) return <div>failed to load</div>;

  return (
    <div className="text-lg text-blue-600">
      <h1>Home</h1>
      <form>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setSearchValue(search);
            console.log(searchValue);
          }}
        >
          Search
        </button>
      </form>
      <div>
        {data.Search &&
          data.Search.map((movie) => (
            <div key={movie.imdbID}>
              <h1>{movie.Title}</h1>
              <img
                src={movie.Poster}
                width="200"
                height="500"
                alt={movie.Title}
              />
              <Link href={`/movies/${movie.imdbID}`}>Go To Movie</Link>
            </div>
          ))}
        <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
        <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=83d16d20&s=batman`
  );

  const data = await response.json();
  return {
    props: { movie: data },
  };
};
