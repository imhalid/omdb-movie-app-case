/* eslint-disable @next/next/no-img-element */
import React from "react";

const Movies = (props) => {
  const data = props.data;
  const categories = props.categories;
  if (!data)
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        <img src="/loading2.svg" alt="film" />
        <img src="/loading2.svg" alt="film" />
        <img src="/loading2.svg" alt="film" />
        <img src="/loading2.svg" alt="film" />
        <img src="/loading2.svg" alt="film" />
        <img src="/loading2.svg" alt="film" />
        <img src="/loading2.svg" alt="film" />
        <img src="/loading2.svg" alt="film" />
        <img src="/loading2.svg" alt="film" />
        <img src="/loading2.svg" alt="film" />
      </div>
    );
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
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
          <div
            key={movie.imdbID}
            className="sm:w-[200px] w-[180px] bg-blue-900/50 scale-100 hover:scale-105 transition-all  group relative overflow-clip p-2 rounded-lg"
          >
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
                loading="lazy"
              />
              {movie.Poster === "N/A" ? (
                <img
                  className="rounded-md shadow-md scale-50  bg-center sm:w-[200px] opacity-20 w-[250px] sm:h-[250px] h-[220px] object-fit "
                  src="/film.svg"
                  alt={movie.Title}
                  loading="lazy"
                />
              ) : (
                <img
                  className="rounded-md shadow-md sm:w-[200px] w-[250px] sm:h-[250px] h-[220px] object-cover"
                  src={movie.Poster}
                  alt={movie.Title}
                  loading="lazy"
                />
              )}
              <h1 className="font-bold text-slate-200 drop-shadow-xl mt-4">
                {movie.Title}
              </h1>
            </a>
          </div>
        ))}
    </div>
  );
};

export default Movies;
