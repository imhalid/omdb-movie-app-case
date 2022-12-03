/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";

export default function Home(props) {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("transformers");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const router = useRouter();
  console.log(props);
  const [pageIndex, setPageIndex] = useState(1);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    `http://www.omdbapi.com/?apikey=83d16d20&s=${searchValue}&page=${pageIndex}`,
    fetcher
  );

  console.log(data);

  if (!data) return <div>failed to load</div>;

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="">
          <div className="">
            <form>
              <input
                className="rounded-full px-2 py-1 border"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <input
                value="movie"
                type="checkbox"
                onChange={(e) => setCategory(e.target.value)}
              />
              <input
                value="series"
                type="checkbox"
                onChange={(e) => setCategory(e.target.value)}
              />
              <input
                value="episode"
                type="checkbox"
                onChange={(e) => setCategory(e.target.value)}
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchValue(search);
                  setCategories(category);
                }}
              >
                Search
              </button>
            </form>
          </div>
          <div>
            <p>{data.totalResults}</p>
            <div className="grid grid-cols-2">
              {data.Search &&
                data.Search.filter((d) => {
                  if (categories.length === 0) {
                    return d;
                  } else if (categories.includes(d.Type)) {
                    return d;
                  }
                }).map((movie) => (
                  <div key={movie.imdbID}>
                    <div className="">
                      <p>{movie.Year}</p>
                      <p>{movie.Type}</p>
                      <img
                        className="rounded-lg w-[300px] h-[420px] object-cover"
                        src={movie.Poster}
                        alt={movie.Title}
                      />
                      <h1>{movie.Title}</h1>
                      <Link href={`/movies/${movie.imdbID}`}>Go To Movie</Link>
                    </div>
                  </div>
                ))}
            </div>
            <button onClick={() => setPageIndex(pageIndex - 1)}>
              Previous
            </button>
            <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
}
