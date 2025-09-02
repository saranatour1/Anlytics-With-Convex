'use client'
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


export default function Page() {
 const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state= searchParams.get('state')
  return (
    <main>
      code {code}
      state: {state}
      <Link href={"/start"}>
        /start
      </Link>
    </main>
  );
}
