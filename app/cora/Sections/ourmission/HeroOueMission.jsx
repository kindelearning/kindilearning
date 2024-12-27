"use client";
import { fetchOurMission } from "@/app/data/p/OurMission";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import ClaraMarkdownRichEditor from "../TextEditor/ClaraMarkdownRichEditor";

export default async function HeroOueMission() {
  const data = await fetchOurMission();

  if (!data) {
    return <div>No content available.</div>;
  }

  return (
    <>
      <section className="max-w-[1500px] min-h-screen h-full  md:h-full lg:h-full flex justify-start bg-[#ffffff] w-full items-start">
        <div className="w-full py-0 md:py-2 flex-col flex justify-start items-start script animate-fadeIn animate-delay-500">
          <div className="w-full text-[#1d1d1d] clarascript animate-slideInLeft script animate-delay-1000">
            {data.Hero.featuredText && <p>{data.Hero.featuredText}</p>}
          </div>
          <div className="flex flex-col w-full justify-start items-start heading animate-fadeIn animate-delay-1500">
            <div className="text-start flex-wrap w-full animate-slideInLeft animate-delay-2000">
              <span className="text-[#1d1d1d] claraheading">
                {data.Hero.Title.split(" ").slice(0, 2).join(" ")}{" "}
              </span>
              <span className="text-[#1d1d1d] claraheading">
                {data.Hero.Title.split(" ").slice(2, 3).join(" ")}
              </span>
            </div>
            <div className="w-full text-start justify-start items-start px-0 animate-fadeIn animate-delay-2500">
              <div
                dangerouslySetInnerHTML={{ __html: data.Hero.Body }}
                className="w-full prose text-start text-[#696969] text-[16px] leading-[20px] md:text-[18px] md:leading-[22px] lg:text-[22px] lg:leading-[24px] xl:text-[22px] xl:leading-[24px] font-medium font-fredoka animate-slideInLeft animate-delay-3000"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function UpdateHeroSection() {
  const [formData, setFormData] = useState({
    Title: "",
    Body: "",
    featuredText: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetch("http://localhost:1337/api/our-mission?populate=*")
      .then((res) => res.json())
      .then((data) => {
        // Assuming the response structure is { data: { Hero: {...} } }
        if (data?.data?.Hero) {
          const { Title, Body, featuredText } = data.data.Hero;
          setFormData({
            Title,
            Body,
            featuredText,
          });
        } else {
          setError("Hero data not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load data");
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      data: {
        Hero: {
          Title: formData.Title,
          Body: formData.Body,
          featuredText: formData.featuredText,
        },
      },
    };
    console.log("Sent Data", payload);

    try {
      const res = await fetch("http://localhost:1337/api/our-mission", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setOpenDialog(true); // Open the success dialog
      } else {
        const errorData = await res.json();
        console.error("Error updating:", errorData);
        alert(`Failed to update: ${errorData.error.message}`);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target || e;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Edit Hero</h2>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        {/* Edit Title */}
        <div className="space-y-2">
          <label htmlFor="Title">Title:</label>
          <input
            type="text"
            name="Title"
            value={formData.Title || ""}
            onChange={handleChange}
            placeholder="Edit Title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Edit Body */}
        <div className="space-y-2">
          <label htmlFor="Body">Body:</label>

          <ClaraMarkdownRichEditor
            onChange={(value) =>
              handleChange({ target: { name: "Body", value } })
            }
            value={formData.Body || ""}
          />
        </div>

        {/* Edit featuredText */}
        <div className="space-y-2">
          <label htmlFor="featuredText">Featured Text:</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="featuredText"
            value={formData.featuredText || ""}
            onChange={handleChange}
            placeholder="Edit Featured Text"
          />
        </div>

        <button type="submit">Update Hero</button>
      </form>
      {/* Dialog for success message */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
            <DialogDescription>
              Your data has been updated successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button className="btn-close">Close</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
