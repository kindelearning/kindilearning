import Image from "next/image";
import Link from "next/link";

const ActivityResources = ({ resources }) => {
  if (!resources || resources.length === 0) {
    return <div>No resources available for this activity.</div>;
  }

  return (
    <div className="w-full font-fredoka flex flex-col gap-4">
      <h2 className="text-xl text-purple font-bold">Activity Resources</h2>
      <div className="grid grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start gap-2 p-4 border rounded-lg bg-gray-50 shadow-sm"
          >
            <Image
              src={resource.url}
              alt={resource.fileName}
              width={150}
              height={150}
              className="w-full h-auto object-cover rounded-lg"
            />
            <Link target="_blank" href={resource.url}>
              <p className="text-sm text-gray-700">{resource.fileName}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityResources;
