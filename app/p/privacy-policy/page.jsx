import { fetchPrivacyPolicy } from "@/app/data/p/Standard";

export default async function PrivacyPolicy() {
  const content = await fetchPrivacyPolicy();
  // console.log("Privacy Policy Content:", content); // Debug: Log the content

  if (!content) {
    return <p>No data available</p>;
  }

  const { Title, Body, Pagecontent, Lastupdated } = content;

  return (
    <>
      <section className="w-full bg-[#EAEAF5] flex flex-col gap-0 justify-center items-center">
        <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-4">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] claraheading uppercase">
                Kindi
              </span>{" "}
              <span className="text-red claraheading uppercase">
                {Title.length > 2
                  ? Title.split(" ").slice(0, 1).join(" ")
                  : Title}
              </span>{" "}
              <span className="text-[#3f3a64] claraheading uppercase">
                {" "}
                {Title.length > 2
                  ? Title.split(" ").slice(1, 2).join(" ")
                  : Title}
              </span>{" "}
            </div>
            <div className="justify-center flex items-center text-center">
              {/* <span className="text-black text-xs font-medium font-['Fredoka']">
                Last Updated:
              </span> */}
              <span className="text-black text-xs font-normal font-['Fredoka']">
                {Lastupdated
                  ? `Last updated: ${new Date(
                      Lastupdated
                    ).toLocaleDateString()}`
                  : ""}
              </span>
            </div>
            <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
              {/* Your privacy is of utmost importance to us. This Privacy Policy
              outlines how Kindi (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) collects, uses, discloses, and protects your
              personal information when you use our website
              www.kindilearning.com (the &quot;Platform&quot;) and related
              services (the &quot;Services&quot;). By accessing or using the
              Platform and our Services, you agree to this Privacy Policy and
              our Terms of Use. If you do not agree with the terms of this
              policy, please discontinue use of the Platform and Services. */}
              {Body || "No Body Content Available"}
            </span>
            <div className="h-[1.5px] bg-[black] rounded-full my-4" />
          </div>

          <div className="items-center font-fredoka prose w-full justify-center flex flex-col gap-4">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  Pagecontent.replace(/\n/g, "<br />") ||
                  "<p>No additional content available</p>",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
