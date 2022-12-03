/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";

export default function index(props) {
  const router = useRouter();

  console.log(props);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {props.Actors}
      <p>{props.Title}</p>
      <p>{props.Year}</p>
      <p>{props.Plot}</p>
      <p>{props.Director}</p>
      <p>{props.Genre}</p>
      <p>{props.Language}</p>
      <p>{props.Country}</p>
      <p>{props.Awards}</p>
      <p>{props.imdbRating}</p>
      <p>{props.imdbVotes}</p>
      <p>{props.imdbID}</p>
      <p>{props.Type}</p>
      <p>{props.DVD}</p>
      <img src={props.Poster} alt={props.Title} />
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`http://www.omdbapi.com/?apikey=83d16d20&s=yoyo`);
  const data = await res.json();
  return {
    paths: data.Search.map((d) => ({ params: { id: d.imdbID } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=83d16d20&i=${params.id}`
  );
  const data = await res.json();
  return {
    props: data,
  };
}
