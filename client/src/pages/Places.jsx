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
  // console.log(photoLink);

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    if(photoLink !== ""){
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
    }
    // here data returned is image filename which will be added to array of addedPhotos
   
 
   function uploadPhoto(ev){
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos',files[i])
    }
    axios.post('http://localhost:5000/upload',data,{
      headers:{'Content-Type':'multipart/form-data'}
    }).then(response =>{
      const {data:filenames} = response;
      setAddedPhotos(prev =>{
        return [...prev, ...filenames]
      })
      setPhotoLink('');

    })
  }

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
                <div className="flex ">
                    <img className="rounded-2xl h-32 object-cover   gap-2 w-full " src={'http://localhost:5000/uploads/'+link} alt="" />
                </div>
              )))}  
              <label  className="flex cursor-pointer justify-center items-center gap-2 border bg-transparent rounded-2xl p-8 text-xl text-gray-600">
               
                <input type="file" multiple name="" id="" className="hidden" onChange={uploadPhoto} />
                Upload
              </label>

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
