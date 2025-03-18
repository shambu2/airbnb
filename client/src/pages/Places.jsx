import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";

const Places = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  console.log(photoLink);
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    // here data returned is image filename which will be added to array of addedPhotos
    const {data} = await axios.post(
      "http://localhost:5000/upload-by-link",
      { link: photoLink },
      { headers: { "Content-Type": "application/json" } }
    );
    setAddedPhotos(prev => {
        return [...prev,data ]
    })
    setPhotoLink('')
  }
  //   console.log(title,address,photoLink,description,extraInfo,checkIn,checkOut,maxGuest)

  //   function inputHeader(text) {
  //     return <h2 className="text-2xl mt-4">{text}</h2>;
  //   }

  //   function inputDescription(text) {
  //     return <p className="text-gray-500 text-sm">{text}</p>;
  //   }

  //   function preInput(header, description) {
  //     return (
  //       <>
  //         {inputHeader(header)}
  //         {inputDescription(description)}
  //       </>
  //     );
  //   }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-blue-500 inline-flex gap-1 text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div className="w-[95vw] mx-auto">
          <form action="">
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-gray-500 text-sm">
              Title for your place should be short and catchy as in ads
            </p>
            <input
              type="text"
              placeholder="title"
              className="w-full border rounded-2xl px-2"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">address to your place</p>

            <input
              type="text"
              placeholder="address"
              className="w-full border rounded-2xl px-2"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />
            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-gray-500 text-sm">more = better</p>
            <div className="flex gap-4 h-8">
              <input
                type="text"
                placeholder="Add using a link ... jpg"
                className="w-full border rounded-2xl px-2"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />
              <button
                onClick={addPhotoByLink}
                className="bg-blue-500 rounded-xl text-nowrap text-white px-2"
              >
                Add Photos
              </button>
            </div>
            <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2 ">
              {addedPhotos.length > 0 && addedPhotos.map((link => (
                <div className="flex items-center justify-center">
                    <img className="rounded-2xl gap-2 w-full h-fullobject-scale-down " src={'http://localhost:5000/uploads/'+link} alt="" />
                </div>
              )))}  
              <button className="flex justify-center items-center gap-2 border bg-transparent rounded-2xl p-8 text-xl text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </button>
            </div>
            <h2 className="text-2xl mt-4">Description</h2>
            <p className="text-gray-500 text-sm">Description of the place</p>
            <textarea
              name=""
              id=""
              className="w-full border rounded-2xl px-2"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />

            <h2 className="text-2xl mt-4">Perks</h2>
            <p className="text-gray-500 text-sm my-1">
              select all the perks of your place{" "}
            </p>
            <div>
              <Perks selected={perks} onChange={setPerks} />
            </div>
            <h2 className="text-2xl mt-4">Extra info</h2>
            <p className="text-gray-500 text-sm my-1">house rules, etc</p>
            <textarea
              className="w-full border rounded-2xl px-2"
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            <h2 className="text-2xl mt-4">Check in&out times</h2>
            <p className="text-gray-500 text-sm my-1">
              add check in and out time
            </p>
            <div className="grid gap-2 sm:grid-cols-3 mb-2">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  placeholder="14:00"
                  className="w-full border rounded-2xl px-2 py-1 mt-1"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  placeholder="12:00"
                  className="w-full border rounded-2xl px-2 py-1 mt-1"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guest</h3>
                <input
                  type="number"
                  placeholder="1 or more"
                  className="w-full border rounded-2xl px-2 py-1 mt-1"
                  value={maxGuest}
                  onChange={(ev) => setMaxGuest(ev.target.value)}
                />
              </div>
            </div>
            <button className="bg-blue-500 w-full text-white rounded-2xl h-10  my-4">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Places;
