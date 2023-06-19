import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type button = {
  title: string;
  slug: string;
};

const Links = [
  {
    title: "Fill out survey",
    slug: "/survey",
  },
  {
    title: "View survey results",
    slug: "/results",
  },
];

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5">
        {Links.map((link: button) => {
          return (
            <Button
              key={link.slug}
              className="bg-transparent border border-white p-0 outline-none hover:bg-slate-700 w-52 lg:w-72"
            >
              <Link
                href={link.slug}
                className="w-full h-full flex items-center p-2 justify-center text-lg"
              >
                {link.title}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
