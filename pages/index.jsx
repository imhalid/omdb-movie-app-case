/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import useSWR from "swr";
import ReactPaginate from "react-paginate";

export default function Home(props) {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("transformers");
  const [categories, setCategories] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    `http://www.omdbapi.com/?apikey=83d16d20&s=${searchValue}&page=${pageIndex}&type=${categories}`,
    fetcher
  );

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  let [categori] = useState({
    "": "",
    movie: "Movie",
    series: "Series",
    episode: "Episode",
    game: "Game",
  });

  if (!data) return <div>failed to load</div>;
  return (
    <div className="flex justify-center ">
      <div className="w-[970px] bg-gradient-to-b from-indigo-900/10 h-full px-6">
        <div className="mt-10 mx-auto items-start ">
          <form>
            <div className="relative flex justify-">
              <img
                src="/search.svg"
                className="absolute z-10 top-3 left-2"
                alt="search"
              />
              <input
                placeholder="Search Movies or TV Shows"
                className="rounded-lg text-gray-400 placeholder:text-[#323B54] bg-black/10  w-96 pl-10 pr-3 py-3 border border-[#323B54]"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchValue(search);
                }}
              />
            </div>

            <div>
              <Tab.Group>
                <Tab.List className="w-max space-x-2 mt-2 rounded-lg backdrop-blur-lg bg-black/10 p-1.5">
                  {Object.keys(categori).map((category) => (
                    <Tab
                      value={category}
                      onClick={(e) => setCategories(e.target.value)}
                      key={category}
                      className={({ selected }) =>
                        classNames(
                          "ui-selected:bg-indigo-500 rounded-md py-2 px-3 text-sm font-medium leading-5 text-white",
                          " ring-offset-1  focus:outline-none focus:ring-1",
                          selected
                            ? "bg-white shadow"
                            : "text-slate-300 transition-all hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      {category === "" ? "All" : categori[category]}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>
            </div>
          </form>
        </div>
        <div>
          <p className="text-slate-200 mt-2">
            <span className="capitalize font-semibold">
              {categories.length < 1 ? "All" : categories}{" "}
            </span>
            <span className="font-light">
              ({data.totalResults === undefined ? "0" : data.totalResults})
            </span>
          </p>
          <div className="grid justify-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {data.Search &&
              data.Search.filter((d) => {
                if (categories.length === 0) {
                  return "some error";
                } else if (categories.includes(d.Type)) {
                  return d;
                } else if (categories === "") {
                  return d;
                }
              }).map((movie) => (
                <div key={movie.imdbID} className="sm:w-[200px] w-[180px]">
                  <div className="bg-blue-900/50 scale-100 hover:scale-105 transition-all  group relative overflow-clip p-2 rounded-lg">
                    <a href={`/movies/${movie.imdbID}`}>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="py-1 px-2 text-xs text-amber-500  bg-black/60 font-bold rounded-md overflow-clip backdrop-blur-lg">
                          {movie.Year}
                        </p>
                      </div>
                      <img
                        className=" blur-3xl absolute scale-150 -z-10 object-fill"
                        src={movie.Poster}
                        alt={movie.Title}
                      />
                      {movie.Poster === "N/A" ? (
                        <img
                          className="rounded-md shadow-md scale-50  bg-center sm:w-[200px] opacity-20 w-[250px] sm:h-[250px] h-[220px] object-fit "
                          src="/film.svg"
                          alt={movie.Title}
                        />
                      ) : (
                        <img
                          className="rounded-md shadow-md sm:w-[200px] w-[250px] sm:h-[250px] h-[220px] object-cover"
                          src={movie.Poster}
                          alt={movie.Title}
                        />
                      )}
                      <h1 className="font-bold text-slate-200 drop-shadow-xl mt-4">
                        {movie.Title}
                      </h1>
                      {/* <Link href={`/movies/${movie.imdbID}`}>Go To Movie</Link> */}
                    </a>
                  </div>
                </div>
              ))}
          </div>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(data.totalResults / 10)}
            onPageChange={(e) => setPageIndex(e.selected + 1)}
            containerClassName={"flex items-start justify-center "}
            previousLinkClassName={"px-4 py-2 rounded-md bg-blue-900/20"}
            nextLinkClassName={"px-4 py-2 rounded-md bg-blue-900/20"}
            disabledLinkClassName={"bg-blue-500 cursor-context-menu"}
            disabledClassName={"bg-blue-500 cursor-context-menu"}
            activeClassName={"bg-blue-900"}
            className="flex items-center justify-start cursor-context-menu  w-full"
            pageClassName="px-4 py-2 rounded-md bg-blue-900/20"
          />
        </div>
      </div>
    </div>
  );
}
