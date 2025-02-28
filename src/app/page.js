import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-full px-5">
      <Link href={"/dashboard"}>
        <Button className="cursor-pointer">Go Daahboard</Button>
      </Link>
    </div>
  );
}
