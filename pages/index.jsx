/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import Movies from "../components/Movies";
import Search from "../components/Search";

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("transformers");
  const [categories, setCategories] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    `https://www.omdbapi.com/?apikey=83d16d20&s=${searchValue}&page=${pageIndex}&type=${categories}`,
    fetcher
  );

  let [categori] = useState({
    "": "",
    movie: "Movie",
    series: "Series",
    episode: "Episode",
    game: "Game",
  });

  return (
    <div className="flex justify-center ">
      <div className="w-[970px] bg-gradient-to-b from-indigo-900/10 h-full px-6">
        <Search
          search={search}
          categori={categori}
          setCategories={setCategories}
          setSearch={setSearch}
          setSearchValue={setSearchValue}
        />
        <div>
          <p className="text-slate-200 mt-2">
            <span className="capitalize font-semibold">
              {categories.length < 1 ? "All" : categories}{" "}
            </span>
            <span className="font-light">
              ({data?.totalResults === undefined ? "0" : data.totalResults})
            </span>
          </p>
          {data?.totalResults === undefined ? (
            <p className="text-slate-200 mt-2">
              No results found for{" "}
              <span className="capitalize font-semibold">{searchValue}</span>
            </p>
          ) : (
            <Movies data={data} categories={categories} />
          )}

          <ReactPaginate
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={Math.ceil(data?.totalResults / 10)}
            onPageChange={(e) => setPageIndex(e.selected + 1)}
            containerClassName={"flex items-start justify-center "}
            previousLinkClassName={"hidden"}
            nextLinkClassName={"hidden"}
            activeClassName={"bg-indigo-500"}
            className="flex items-center space-x-2 text-slate-200 justify-start my-5 cursor-context-menu  w-full"
            pageClassName="px-4 py-2 rounded-md bg-blue-500/40"
          />
        </div>
      </div>
    </div>
  );
}
