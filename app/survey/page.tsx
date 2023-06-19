"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import db from "@/firebase";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Survey() {
  const router = useRouter();

  const [surname, setSurname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [contact, setContact] = useState("");
  const [Date, setDate] = useState("");
  const [Age, setAge] = useState("");
  const Favourite: Array<string> = [];
  const [Pizza, setPizza] = useState(0);
  const [Pasta, setPasta] = useState(0);
  const [PapWors, setPapWors] = useState(0);
  const [Chicken, setChicken] = useState(0);
  const [Beef, setBeef] = useState(0);
  const [Other, setOther] = useState(0);
  const [out, setOut] = useState(0);
  const [movie, setMovie] = useState(0);
  const [tv, setTv] = useState(0);
  const [radio, setRadio] = useState(0);
  const [error, setError] = useState(false);
  const [AgeError, setAgeError] = useState("Age is required")
  const [loading, setLoading] = useState(false)

  if (Pizza) Favourite.push("Pizza");
  if (Pasta) Favourite.push("pasta");
  if (PapWors) Favourite.push("pap and wors");
  if (Chicken) Favourite.push("Chicken stir fry");
  if (Beef) Favourite.push("Beef stir fry");
  if (Other) Favourite.push("Other");

  const getAllValues = async () => {
    if (
      surname == "" ||
      firstname == "" ||
      contact == "" ||
      Age == "" ||
      Date == "" ||
      Favourite.length == 0 ||
      out == 0 ||
      movie == 0 ||
      tv == 0 ||
      radio == 0
    ) {
      setError(true);
    }else if(/^\d+$/.test(Age) == false){
      setAgeError("Enter valid Age(No spaces required)")
    }else if(parseInt(Age) < 5 || parseInt(Age) > 120 ){
      setAgeError("Age must be between 5 and 120")
    }
    
    else {

      setLoading(true)
      if (loading){
        Swal.fire({
          title: '',
          html: 'Loading',
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer()?.querySelector('b')
          },
        })
      }
     

      const docRef = await addDoc(collection(db, "Survey"), {
        Surname: surname,
        FirstName: firstname,
        ContactNumber: contact,
        Date: Date,
        Age: Age,
        Favourite: Favourite.join(" "),
        out: out,
        W_Movie: movie,
        W_TV: tv,
        Radio: radio,
      })
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Submitted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to submit, Try again",
          });
        });

        setLoading(false)

      router.push("/");
    }
  };

  const Out = (e: any) => {
    if (e.currentTarget.checked) setOut(parseInt(e.currentTarget.value));
  };

  const Movie = (e: any) => {
    if (e.currentTarget.checked) setMovie(parseInt(e.currentTarget.value));
  };

  const Tv = (e: any) => {
    if (e.currentTarget.checked) setTv(parseInt(e.currentTarget.value));
  };

  const Radio = (e: any) => {
    if (e.currentTarget.checked) setRadio(parseInt(e.currentTarget.value));
  };

  return (
    <div className="py-4">
      <p className="md:text-[40px] text-2xl text-center md:text-start mb-4 md:mb-10 mt-8">
        Take out survey
      </p>
      <div className="personal mt-10 md:w-1/2">
        <p className="md:text-[24px] text-xl">Personal Details:</p>
        <div className="fields text-base lg:text-lg mt-4 md:mt-6 ml-4 space-y-4">
          <div className="surname grid grid-cols-2">
            <p>Surname</p>
            <div>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.currentTarget.value)}
                required
                className="bg-transparent outline-none w-full hover:outline-none border rounded-sm py-[2px] px-2"
              />
              {!surname && (
                <div className="error text-red-600 text-xs my-1">
                  Surname is required
                </div>
              )}
            </div>
          </div>
          <div className="firstname grid grid-cols-2">
            <p>First Names</p>
            <div className="input">
              <input
                type="text"
                onChange={(e) => setFirstname(e.currentTarget.value)}
                className="bg-transparent outline-none hover:outline-none w-full border rounded-sm py-[2px] px-2"
              />
              {!firstname && (
                <div className="error text-red-600 text-xs my-1">
                  First Name is required
                </div>
              )}
            </div>
          </div>
          <div className="contact grid grid-cols-2">
            <p>Contact Number</p>
            <div className="contact">
              <input
                type="tel"
                onChange={(e) => setContact(e.currentTarget.value)}
                className="bg-transparent outline-none w-full hover:outline-none border rounded-sm py-[2px] px-2"
              />
              {!contact && (
                <div className="error text-red-600 text-xs my-1">
                  Contact is required
                </div>
              )}
            </div>
          </div>
          <div className="date grid grid-cols-2">
            <p>Date</p>
            <div className="date">
              <input
                type="date"
                onChange={(e) => setDate(e.currentTarget.value)}
                className="bg-transparent outline-none w-full hover:outline-none border rounded-sm py-[2px] px-2"
              />
              {!Date && (
                <div className="error text-red-600 text-xs my-1">
                  Date is required
                </div>
              )}
            </div>
          </div>
          <div className="age grid grid-cols-2">
            <p>Age</p>
            <div className="age">
              <input
                type="text"
                value={Age}
                onChange={(e) => {
                  setAge(e.currentTarget.value) 
                  e.currentTarget.value != "" ? setAgeError("") : setAgeError("Age is required")}}
                  
                className="bg-transparent outline-none w-full hover:outline-none border rounded-sm py-[2px] px-2"
              />
              {(!Age || AgeError) && (
                <div className="error text-red-600 text-xs my-1">
                  {AgeError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="favourite">
        <p className="md:text-[20px] text-lg mt-8">
          What is your favourite food? (You can choose more than 1 answer)
        </p>
        <div className="choices mt-4 md:text-[20px] text-base space-y-2">
          <div className="pizza flex space-x-4">
            <input
              type="checkbox"
              value="Pizza"
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  setPizza(1);
                } else {
                  setPizza(0);
                }
              }}
            />
            <p>Pizza</p>
          </div>
          <div className="pasta flex space-x-4">
            <input
              type="checkbox"
              value="pasta"
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  setPasta(1);
                } else {
                  setPasta(0);
                }
              }}
            />
            <p>Pasta</p>
          </div>
          <div className="Pap flex space-x-4">
            <input
              type="checkbox"
              value="pap and wors"
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  setPapWors(1);
                } else {
                  setPapWors(0);
                }
              }}
            />
            <p>Pap and Wors</p>
          </div>
          <div className="chicken flex space-x-4">
            <input
              type="checkbox"
              value="chicken stir fry"
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  setChicken(1);
                } else {
                  setChicken(0);
                }
              }}
            />
            <p>Chicken stir fry</p>
          </div>
          <div className="beef flex space-x-4">
            <input
              type="checkbox"
              value="beef stir fry"
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  setBeef(1);
                } else {
                  setBeef(0);
                }
              }}
            />
            <p>Beef stir fry</p>
          </div>
          <div className="other flex space-x-4">
            <input
              type="checkbox"
              value="other"
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  setOther(1);
                } else {
                  setOther(0);
                }
              }}
            />
            <p>Other</p>
          </div>
        </div>
      </div>

      <div className="error">
        {Favourite.length === 0 && (
          <div className="error text-red-600 text-xs my-1">
            You must choose at least one
          </div>
        )}
      </div>

      <div className="scale  overflow-scroll md:overflow-auto">
        <p className="md:text-[20px] text-lg mt-8">
          On a scale of 1 to 5 indicate whether you strongly agree to strongly
          disagree
        </p>

        <div className="table mt-8 md:text-[20px] text-sm">
          <table className="border-collapse border border-slate-500 ...">
            <thead>
              <tr>
                <th className="border p-2 font-normal space-x-2 text-lg"></th>
                <th className="border p-2 font-normal space-x-2 text-lg">
                  <p>Strongly Agree</p>
                  <p>(1)</p>
                </th>
                <th className="border p-2 font-normal space-x-2 text-lg">
                  <p>Agree</p>
                  <p>(2)</p>
                </th>
                <th className="border p-2 font-normal space-x-2 text-lg">
                  <p>Neutral</p>
                  <p>(3)</p>
                </th>
                <th className="border p-2 font-normal space-x-2 text-lg">
                  <p>Disagree</p>
                  <p>(4)</p>
                </th>
                <th className="border p-2 font-normal space-x-2 text-lg">
                  <p>Strongly disagree</p>
                  <p>(5)</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-l p-2">I like to eat out</td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="out"
                    value={1}
                    onChange={(e) => Out(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="out"
                    value={2}
                    onChange={(e) => Out(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="out"
                    value={3}
                    onChange={(e) => Out(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="out"
                    value={4}
                    onChange={(e) => Out(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="out"
                    value={5}
                    onChange={(e) => Out(e)}
                  />
                </td>
              </tr>
              <tr>
                <td className="border-l p-2">I like to watch movies</td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="movies"
                    value={1}
                    onChange={(e) => Movie(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="movies"
                    value={2}
                    onChange={(e) => Movie(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="movies"
                    value={3}
                    onChange={(e) => Movie(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="movies"
                    value={4}
                    onChange={(e) => Movie(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="movies"
                    value={5}
                    onChange={(e) => Movie(e)}
                  />
                </td>
              </tr>
              <tr>
                <td className="border-l p-2">I like to watch TV</td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="TV"
                    value={1}
                    onChange={(e) => Tv(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="TV"
                    value={2}
                    onChange={(e) => Tv(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="TV"
                    value={3}
                    onChange={(e) => Tv(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="TV"
                    value={4}
                    onChange={(e) => Tv(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="TV"
                    value={5}
                    onChange={(e) => Tv(e)}
                  />
                </td>
              </tr>
              <tr>
                <td className="border-l p-2">I like to listen to the radio</td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="radio"
                    value={1}
                    onChange={(e) => Radio(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="radio"
                    value={2}
                    onChange={(e) => Radio(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="radio"
                    value={3}
                    onChange={(e) => Radio(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="radio"
                    value={4}
                    onChange={(e) => Radio(e)}
                  />
                </td>
                <td className="border-l p-2 text-center">
                  <input
                    type="radio"
                    name="radio"
                    value={5}
                    onChange={(e) => Radio(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {out == 0 || movie == 0 || tv == 0 || radio == 0 ? (
        <div className="error text-red-600 text-xs my-1">
          You must fill all the ratings
        </div>
      ) : (
        ""
      )}

      <div className="error mt-4">
        {error && (
          <div className="errorMessage bg-red-200 p-2  md:w-72 text-center text-slate-700 border bottom-1 border-red-600">
            You must fill in all of the fields
          </div>
        )}
      </div>

      <div className="button w-full flex justify-center md:justify-normal">
        <Button
          onClick={getAllValues}
          type="submit"
          className="bg-transparent border border-white p-0 outline-none hover:bg-slate-700 w-60 mt-10 text-xl"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
