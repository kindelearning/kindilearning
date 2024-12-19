import Link from "next/link";

const SidebarLink = ({ href, label }) => {
  return (
    <Link href={href}>
      <div className="flex items-center space-x-4 py-2 px-4 rounded-lg">
        <span className="text-black font-fredoka">{label}</span>
      </div>
    </Link>
  );
};
export default function LocalHeader() {
  return (
    <header className="text-center sticky flex flex-col w-full  bg-white">
      <div className="flex flex-row gap-2">
        <SidebarLink
          className="text-black"
          href="/cora/website/test"
          label="Read"
        />
        <SidebarLink
          className="text-black"
          href="/cora/website/test/create"
          label="Create"
        />
        <SidebarLink
          className="text-black"
          href="/cora/website/test/delete"
          label="delete"
        />
        <SidebarLink
          className="text-black"
          href="/cora/website/test/update"
          label="update"
        />
      </div>
    </header>
  );
}
