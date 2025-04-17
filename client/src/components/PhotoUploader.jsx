// import axios from "axios";
// import React, { useState } from "react";

// const PhotoUploader = ({addPhotoByLink,uploadPhoto,addedPhotos}) => {
//   const [photoLink, setPhotoLink] = useState("");
//   // const [addedPhotos, setAddedPhotos] = useState([]);
//   //checkout here
  
//   // async function addPhotoByLink(ev) {
//   //   ev.preventDefault();
//   //   if (photoLink !== "") {
//   //     const { data } = await axios.post(
//   //       "http://localhost:5000/upload-by-link",
//   //       { link: photoLink },
//   //       { headers: { "Content-Type": "application/json" } }
//   //     );
//   //     setAddedPhotos((prev) => {
//   //       return [...prev, data];
//   //     });
//   //     setPhotoLink("");
//   //   }
//   // }

//   // function uploadPhoto(ev){
//   //   const files = ev.target.files;
//   //   const data = new FormData();
//   //   for (let i = 0; i < files.length; i++) {
//   //     data.append('photos',files[i])
//   //   }
//   //   axios.post('http://localhost:5000/upload',{data},{
//   //     headers:{'Content-Type':'multipart/form-data'}
//   //   }).then(response =>{
//   //     const {data:filenames} = response;
//   //     setAddedPhotos(prev =>{
//   //       return [...prev, ...filenames]
//   //     })
//   //     setPhotoLink('');

//   //   })
//   // }

//   return (
//     <div>
//       <div className="flex gap-4 h-8">
//         <input
//           type="text"
//           placeholder="Add using a link ... jpg"
//           className="w-full border rounded-2xl px-2"
//           value={photoLink}
//           onChange={(ev) => setPhotoLink(ev.target.value)}
//         />
//         <button
//           onClick={addPhotoByLink}
//           className="bg-blue-500 rounded-xl text-nowrap text-white px-2"
//         >
//           Add Photos
//         </button>
//       </div>
//       <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2 ">
//         {addedPhotos.length > 0 &&
//           addedPhotos.map((link,index) => (
//             <div className="flex " key={index}>
//               <img
//                 className="rounded-2xl h-32 object-cover   gap-2 w-full "
//                 src={"http://localhost:5000/uploads/" + link}
//                 alt=""
//               />
//             </div>
//           ))}
//         <label className="flex cursor-pointer justify-center items-center gap-2 border bg-transparent rounded-2xl p-8 text-xl text-gray-600">
//           <input
//             type="file"
//             multiple
//             name=""
//             id=""
//             className="hidden"
//             onChange={uploadPhoto}
//           />
//           Upload
//         </label>
//       </div>
//     </div>
//   );
// };

// export default PhotoUploader;
