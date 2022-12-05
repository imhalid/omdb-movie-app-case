/* eslint-disable @next/next/no-img-element */
import { Tab } from "@headlessui/react";
import classNames from "../utils/classNames";

const Search = ({
  search,
  categori,
  setCategories,
  setSearch,
  setSearchValue,
}) => {
  return (
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
  );
};

export default Search;
