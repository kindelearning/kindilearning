"use lient";

import { ProfileSection } from "../Sections";



export default async function ProfilePage() {
  return (
    <>
      <section className="w-full pb-32 bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
        <ProfileSection />
      </section>
    </>
  );
}
