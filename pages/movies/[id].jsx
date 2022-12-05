/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */

export default function index(props) {
  return (
    <div className="flex justify-center items-center md:h-screen">
      <div className="text-slate-300 flex flex-col w-[970px] bg-gradient-to-b from-indigo-900 md:rounded-t-3xl  p-4 md:flex-row md:space-x-10 ">
        <div className="mb-4">
          {props.Poster === "N/A" ? (
            <img
              className="rounded-md shadow-md scale-50  bg-center sm:w-[200px] opacity-20 w-[250px] sm:h-[250px] h-[220px] object-fit "
              src="/film.svg"
              alt={props.Title}
              loading="lazy"
            />
          ) : (
            <img
              className="rounded-2xl shadow-md max-w-xl"
              src={props.Poster}
              alt={props.Title}
              loading="lazy"
            />
          )}
        </div>

        <div className="space-y-3 text-lg md:w-fit">
          <p className="font-bold text-2xl">{props.Title}</p>
          <p className="mt-2">{props.Plot}</p>
          <div className="flex items-center text-amber-500 w-fit px-2 py-1  bg-black/60 font-bold rounded-lg overflow-clip backdrop-blur-lg">
            <img src="/star.svg" loading="lazy" alt="star" />
            <span className="ml-2">{props.imdbRating}</span>
          </div>
          <p className="capitalize">
            <span className="font-bold">Type: </span>
            {props.Type}
          </p>
          <p>
            <span className="font-bold">Release date:</span> {props.Year}
          </p>
          <p>
            <span className="font-bold">Run time: </span> {props.Runtime}
          </p>
          <p>
            <span className="font-bold">Genre: </span>
            {props.Genre}
          </p>
          <p>
            <span className="font-bold">Language: </span>
            {props.Language}
          </p>
          <p>
            <span className="font-bold">Country: </span>
            {props.Country}
          </p>
          <p>
            <span className="font-bold">Director: </span>
            {props.Director}
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`https://www.omdbapi.com/?apikey=83d16d20&s=yoyo`);
  const data = await res.json();
  return {
    paths: data.Search.map((d) => ({ params: { id: d.imdbID } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=83d16d20&i=${params.id}&plot=full`
  );
  const data = await res.json();
  return {
    props: data,
  };
}
