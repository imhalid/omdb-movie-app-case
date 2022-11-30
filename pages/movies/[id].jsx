import { useRouter } from "next/router";

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Movie: {id}</h1>
    </div>
  );
}
