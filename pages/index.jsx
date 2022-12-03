/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function Home(props) {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("transformers");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(1);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    `http://www.omdbapi.com/?apikey=83d16d20&s=${searchValue}&page=${pageIndex}`,
    fetcher
  );

  if (!data) return <div>failed to load</div>;
  return (
    <>
      <div className="flex items-center justify-center px-2">
        <div className="">
          <form className="mt-10 flex flex-col items-center justify-center">
            <div>
              <input
                placeholder="Searcgh Movies or TV Shows"
                className="rounded-md w-64 px-2 py-2 border"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchValue(search);
                  setCategories(category);
                }}
              />
            </div>

            <div className="">
              <input
                id="movie"
                name="category"
                value="movie"
                type="radio"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="movie">Movie</label>
              <input
                id="series"
                name="category"
                value="series"
                type="radio"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="series">Series</label>
              <input
                id="episode"
                name="category"
                value="episode"
                type="radio"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="episode">Episode</label>
              <input
                id="game"
                name="category"
                value="game"
                type="radio"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="game">Game</label>
            </div>
          </form>

          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {data.Search &&
                data.Search.filter((d) => {
                  if (categories.length === 0) {
                    return "some error";
                  } else if (categories.includes(d.Type)) {
                    return d;
                  }
                }).map((movie) => (
                  <div key={movie.imdbID} className="sm:w-[200px] w-[180px]">
                    <div className="bg-black/20 relative overflow-clip p-2 rounded-lg">
                      <a href={`/movies/${movie.imdbID}`}>
                        <img
                          className=" blur-lg  absolute scale-150 -z-10 object-fill"
                          src={movie.Poster}
                          alt={movie.Title}
                        />

                        <img
                          className="rounded-md shadow-md sm:w-[200px] w-[250px] sm:h-[250px] h-[220px] object-cover"
                          src={movie.Poster}
                          alt={movie.Title}
                        />
                        <h1 className="text-white drop-shadow-xl mt-4">
                          {movie.Title}
                        </h1>
                        {/* <Link href={`/movies/${movie.imdbID}`}>Go To Movie</Link> */}
                      </a>
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
