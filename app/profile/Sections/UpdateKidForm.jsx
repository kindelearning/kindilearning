"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

// export default function UpdateKidForm({ parentId, kidId }) {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [dob, setDob] = useState("");
//   const [attendingNursery, setAttendingNursery] = useState(false);
//   const [gender, setGender] = useState("");

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch existing kid's data when component mounts
//   useEffect(() => {
//     const fetchKidData = async () => {
//       try {
//         const response = await fetch(
//           `https://lionfish-app-98urn.ondigitalocean.app/api/kids/${kidId}`
//         );
//         const data = await response.json();
//         if (response.ok) {
//           const kid = data.data;
//           setName(kid.Name || "");
//           setAge(kid.Age || "");
//           setDob(kid.dob || "");
//           setAttendingNursery(kid.AttendingNursury || false);
//           setGender(kid.Gender || "");
//         } else {
//           setError("Failed to fetch kid data");
//         }
//       } catch (err) {
//         setError("An error occurred while fetching data");
//       }
//     };

//     fetchKidData();
//   }, [kidId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");

//     // Prepare the updated payload
//     const updatedKid = {
//       data: {
//         Name: name,
//         Age: age,
//         dob: dob,
//         AttendingNursury: attendingNursery,
//         Gender: gender,
//         myParent: [
//           { id: parentId }, // Ensure we keep the parent's reference
//         ],
//       },
//     };

//     try {
//       const response = await fetch(
//         `https://lionfish-app-98urn.ondigitalocean.app/api/kids/${kidId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedKid),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         // Reset form fields after successful update
//         setName("");
//         setAge("");
//         setDob("");
//         setAttendingNursery(false);
//         setGender("");
//       } else {
//         setError(data.error?.message || "Error updating kid");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto font-fredoka bg-white  rounded-lg p-0 space-y-6"
//     >
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="flex flex-col space-y-1">
//         <label htmlFor="name" className="font-medium text-gray-700">
//           Name
//         </label>
//         <Input
//           type="text"
//           id="name"
//           name="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="input"
//         />
//       </div>

//       <div className="flex flex-col space-y-1">
//         <label htmlFor="age" className="font-medium text-gray-700">
//           Age
//         </label>
//         <Input
//           type="number"
//           id="age"
//           name="age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//           required
//           className="input"
//         />
//       </div>

//       <div className="flex flex-col space-y-1">
//         <label htmlFor="dob" className="font-medium text-gray-700">
//           Date of Birth
//         </label>
//         <Input
//           type="date"
//           id="dob"
//           name="dob"
//           value={dob}
//           onChange={(e) => setDob(e.target.value)}
//           required
//           className="input"
//         />
//       </div>

//       <div className="flex flex-col space-y-1">
//         <label htmlFor="attendingNursery" className="font-medium  text-gray-700">
//           Attending Nursery
//         </label>
//         <Input
//           type="checkbox"
//           id="attendingNursery"
//           name="attendingNursery"
//           checked={attendingNursery}
//           onChange={(e) => setAttendingNursery(e.target.checked)}
//           className="input justify-start items-start text-start"
//         />
//       </div>

//       <div className="flex flex-col space-y-1">
//         <label htmlFor="gender" className="font-medium text-gray-700">
//           Gender
//         </label>
//         <select
//           id="gender"
//           name="gender"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//           required
//           className="input"
//         >
//           <option value="">Select Gender</option>
//           <option value="M">Male</option>
//           <option value="F">Female</option>
//         </select>
//       </div>

//       <Button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
//       >
//         {isSubmitting ? "Updating..." : "Update Kid"}
//       </Button>
//     </form>
//   );
// }

export default function UpdateKidForm({ parentId, kidId }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [dp, setDP] = useState(null); // Store the selected media
  const [attendingNursery, setAttendingNursery] = useState(false);
  const [gender, setGender] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mediaList, setMediaList] = useState([]); // Store the media list fetched from the server

  // Fetch media data from the server
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/upload/files"
        );
        const data = await response.json();

        // Filter media with ids between 159 and 169
        const filteredMedia = data.filter(
          (item) => item.id >= 159 && item.id <= 169
        );
        setMediaList(filteredMedia); // Update the state with the filtered media
      } catch (err) {
        setError("An error occurred while fetching media files");
      }
    };

    fetchMedia();
  }, []);

  // Fetch existing kid's data when component mounts
  useEffect(() => {
    const fetchKidData = async () => {
      try {
        const response = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/kids/${kidId}?populate=*`
        );
        const data = await response.json();
        console.log("Kids Data on the Form", data);
        if (response.ok) {
          const kid = data.data;
          setName(kid.Name || "");
          setAge(kid.Age || "");
          setDob(kid.dob || "");
          setAttendingNursery(kid.AttendingNursury || false);
          setGender(kid.Gender || "");
          setDP(kid.kidDP || null); // Set existing media if available
        } else {
          setError("Failed to fetch kid data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      }
    };

    fetchKidData();
  }, [kidId]);

  console.log("Kid DP from the server", dp);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Prepare the updated payload
    const updatedKid = {
      data: {
        Name: name,
        Age: age,
        dob: dob,
        AttendingNursury: attendingNursery,
        Gender: gender,
        kidDP: dp?.id || null, // Include the media id if available
        myParent: [{ id: parentId }], // Ensure we keep the parent's reference
      },
    };

    try {
      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/kids/${kidId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedKid),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Reset form fields after successful update
        setName("");
        setAge("");
        setDob("");
        setDP(null); // Reset media
        setAttendingNursery(false);
        setGender("");
      } else {
        setError(data.error?.message || "Error updating kid");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMediaSelect = (selectedMedia) => {
    setDP(selectedMedia); // Store the selected media object
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full mx-auto font-fredoka bg-white rounded-lg p-0 space-y-6"
    >
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label>Media:</label>
        <div className="mt-4 flex gap-4">
          {mediaList.length === 0 ? (
            <p>Loading media...</p>
          ) : (
            mediaList.map((media) => (
              <div
                key={media.id}
                className={`cursor-pointer min-w-16 min-h-16 w-12 h-12 p-2 rounded-lg border-2 ${
                  dp?.id === media.id ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => handleMediaSelect(media)}
              >
                <img
                  src={`https://lionfish-app-98urn.ondigitalocean.app${media.url}`}
                  // src={media.url}
                  alt={media.name}
                  className="min-w-12 min-h-12 w-12 h-12 object-cover rounded-full"
                />
                {/* <p className="text-center mt-2">{media.name}</p> */}
              </div>
            ))
          )}
        </div>
      </div>

      {dp && (
        <div className="mt-4">
          <p>Selected Media:</p>
          <img
            src={`https://lionfish-app-98urn.ondigitalocean.app${dp.url}`}
            alt={dp.name}
            className="w-32 h-32 object-cover"
          />
          <p>{dp.name}</p>
        </div>
      )}

      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="font-medium text-gray-700">
          Name
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />
      </div>

      <div className="flex w-full justify-between gap-2">
        <div className="flex w-full flex-col space-y-1">
          <label htmlFor="age" className="font-medium text-gray-700">
            Age
          </label>
          <Input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="flex w-full flex-col space-y-1">
          <label htmlFor="dob" className="font-medium text-gray-700">
            Date of Birth
          </label>
          <Input
            type="date"
            id="dob"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="input"
          />
        </div>
      </div>
      <div className="flex w-full justify-between gap-2">
        <div className="flex  w-full flex-col space-y-1">
          <label
            htmlFor="attendingNursery"
            className="font-medium text-gray-700"
          >
            Attending Nursery
          </label>
          <Input
            type="checkbox"
            id="attendingNursery"
            name="attendingNursery"
            checked={attendingNursery}
            onChange={(e) => setAttendingNursery(e.target.checked)}
            className="input justify-start items-start text-start"
          />
        </div>

        <div className="flex  w-full flex-col space-y-1">
          <label htmlFor="gender" className="font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="input"
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
      >
        {isSubmitting ? "Updating..." : "Update Kid"}
      </Button>
    </form>
  );
}
