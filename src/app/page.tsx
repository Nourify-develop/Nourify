import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 font-sans">
        Hellooo
        <p className="uppercase font-semibold">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </main>
    </>
  );
}
