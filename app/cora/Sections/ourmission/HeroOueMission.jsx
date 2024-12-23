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
              <div className="w-full text-start text-[#696969] text-[16px] leading-[20px] md:text-[18px] md:leading-[22px] lg:text-[22px] lg:leading-[24px] xl:text-[22px] xl:leading-[24px] font-medium font-fredoka animate-slideInLeft animate-delay-3000">
                {data.Hero.Body}
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


export function UpdateHeroSection() {
  const [content, setContent] = useState({
    Hero: {
      Body: '',
      featuredText: '',
      Title: '',
      Media: null, // Handle media if required
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch initial data for the Hero section
    const fetchContent = async () => {
      try {
        const response = await fetch(
          'http://localhost:1337/api/our-mission?populate[Hero][populate]=*'
        );
        const data = await response.json();
        setContent({
          Hero: data.data.Hero || {},
        });
      } catch (err) {
        setError('Error fetching content');
      }
    };

    fetchContent();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the data for submission
    const updatedContent = {
      data: {
        Hero: {
          Body: content.Hero.Body,
          featuredText: content.Hero.featuredText,
          Title: content.Hero.Title,
          Media: content.Hero.Media, // If you want to handle media as well
        },
      },
    };

    try {
      const response = await fetch('http://localhost:1337/api/our-mission', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContent),
      });

      const result = await response.json();
      if (response.ok) {
        setDialogMessage('Hero section updated successfully!');
      } else {
        setDialogMessage(
          `Error updating content: ${result.message || response.statusText}`
        );
      }
    } catch (err) {
      setDialogMessage(`Error updating content: ${err.message}`);
    } finally {
      setIsDialogOpen(true);
      setLoading(false);
    }
  };

  // Handle input change for the Hero fields
  const handleChange = (field, value) => {
    setContent((prevContent) => ({
      ...prevContent,
      Hero: {
        ...prevContent.Hero,
        [field]: value,
      },
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Hero Section</h2>

      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={content.Hero.Title}
            onChange={(e) => handleChange('Title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Featured Text</label>
          <input
            type="text"
            value={content.Hero.featuredText}
            onChange={(e) => handleChange('featuredText', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Body</label>
          <textarea
            value={content.Hero.Body}
            onChange={(e) => handleChange('Body', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="5"
          />
        </div>

        <div>
          <label className=" hidden text-sm font-medium text-gray-700">Media (optional)</label>
          <input
            type="file"
            onChange={(e) => handleChange('Media', e.target.files[0])}
            className="w-full hidden p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red text-white rounded-md disabled:bg-gray-400"
          >
            {loading ? 'Updating...' : 'Update Hero Section'}
          </button>
        </div>
      </form>

      {/* Shadcn Dialog for Success/Error Message */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogClose
            onClick={() => setIsDialogOpen(false)}
            className="bg-red text-white rounded-md px-4 py-2"
          >
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}