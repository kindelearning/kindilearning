import EditActivityForm from "../EditActivityForm";

export default function ActivitiesPage({ passIdHere }) {
  return (
    <div className="gap-4 font-fredoka flex w-full flex-col p-8">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Activities</h1>
        <EditActivityForm documentId={passIdHere} />
      </div>
    </div>
  );
}
