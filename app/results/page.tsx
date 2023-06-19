"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import db from "@/firebase";
import { collection, doc, getDocs } from "@firebase/firestore";

export default async function Results() {
  const [data, setData] = useState([]);
  const avAge: Array<number> = [];
  const list: Array<any> = [];
  const Favourites: Array<any> = [];
  let out = 0;
  let movie = 0;
  let tv = 0;
  let radio = 0;
  let pizza = 0;
  let pasta = 0;
  let pap_wors = 0;

  const m = collection(db, "Survey");
  const docSnap = await getDocs(m);
  docSnap.forEach((doc) => {
    list.push(doc.data());
    avAge.push(parseInt(doc.data().Age));
    Favourites.push(doc.data().Favourite);
    if (parseInt(doc.data().out) <= 2) {
      out += 1;
    }
    if (parseInt(doc.data().W_Movie) <= 2) {
      movie += 1;
    }
    if (parseInt(doc.data().W_TV) <= 2) {
      tv += 1;
    }

    if (parseInt(doc.data().Radio) <= 2) {
      radio += 1;
    }
  });

  let sum = 0;
  avAge.map((e) => {
    sum += e;
  });

  Favourites.map((item) => {
    if (item.includes("Pizza")) {
      pizza += 1;
    }
    if (item.includes("pasta")) {
      pasta += 1;
    }

    if (item.includes("pap and wors")) {
      pap_wors += 1;
    }
  });
  // console.log(Favourites);

  return (
    <div className="mt-8 space-y-4 mx-auto md:w-1/2">
      <p className="md:text-[40px] text-2xl text-center mb-10">
        Survey Results
      </p>
      <div className="w-full flex justify-between items-center text-base lg:text-lg">
        <p>Total number of surveys:</p>
        <p>{list.length}</p>
      </div>
      <div className="w-full flex justify-between items-center text-base lg:text-lg">
        <p>Average age:</p>
        <p>{(sum / list.length).toFixed(2)}</p>
      </div>
      <div className="w-full flex justify-between items-center text-base lg:text-lg">
        <p>Oldest person who participated in survey:</p>
        <p>{Math.max(...avAge)}</p>
      </div>
      <div className="w-full flex justify-between items-center text-base lg:text-lg">
        <p>Youngest person who participated in survey:</p>
        <p>{Math.min(...avAge)}</p>
      </div>
      <div></div>
      <div className="w-full flex justify-between items-center text-base lg:text-lg">
        <p>Percentage of people who like Pizza:</p>
        <p>{((pizza / list.length) * 100).toFixed(2)}%</p>
      </div>
      <div className="w-full flex justify-between items-center text-base lg:text-lg">
        <p>Percentage of people who like pasta:</p>
        <p>{((pasta / list.length) * 100).toFixed(2)}%</p>
      </div>
      <div className="w-full flex justify-between items-center text-base lg:text-lg">
        <p>Percentage of people who like pap and wors:</p>
        <p>{((pap_wors / list.length) * 100).toFixed(2)}%</p>
      </div>
      <div className="w-full flex justify-between items-center text-base lg:text-lg">
        <p>People like to eat out:</p>
        <p>{(out / list.length).toFixed(2)}</p>
      </div>
      <div className="w-full flex justify-between items-center text-base lg:text-lg">
        <p>People like to watch movies:</p>
        <p>{(movie / list.length).toFixed(2)}</p>
      </div>
      <div className="w-full flex justify-between items-center text-base lg:text-lg">
        <p>People like to watch TV:</p>
        <p>{(tv / list.length).toFixed(2)}</p>
      </div>
      <div className="w-full flex justify-between items-center text-base lg:text-lg">
        <p>People like to listen to radio:</p>
        <p>{(radio / list.length).toFixed(2)}</p>
      </div>

      <div className="button w-full flex justify-center">
        <Button className="bg-transparent border border-white p-0 outline-none hover:bg-slate-700 w-60 mt-10">
          <Link
            href={"/"}
            className="w-full h-full flex items-center justify-center"
          >
            OK
          </Link>
        </Button>
      </div>
    </div>
  );
}
