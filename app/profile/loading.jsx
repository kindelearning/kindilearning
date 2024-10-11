export default function Loading() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#eaeaf5]">
        <video autoPlay loop muted className="w-screen min-h-screen">
          <source
            src="preloader.mp4"
            type="video/mp4"
            className="w-screen min-h-screen"
          />
        </video>
      </div>
    </>
  );
}
