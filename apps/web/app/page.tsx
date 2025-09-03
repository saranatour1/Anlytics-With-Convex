import Link from "next/link";

export default async function Page() {

  return (
    <main>
      <Link href={"/start"}>
        /start
      </Link>
    </main>
  );
}
