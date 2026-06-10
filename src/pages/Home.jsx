import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold">
          AI Club KIET
        </h1>

        <p className="text-xl mt-4 text-gray-300">
          Learn • Build • Innovate with Artificial Intelligence
        </p>

        <button className="mt-8 px-6 py-3 bg-blue-600 rounded-lg">
          Join the Club
        </button>
      </section>

      <section className="py-20 px-10">
        <h2 className="text-4xl font-bold text-center">
          About AI Club
        </h2>

        <p className="mt-6 text-center max-w-3xl mx-auto">
          AI Club KIET is a student-driven community focused on
          Artificial Intelligence, Machine Learning, Data Science,
          Web Development and Innovation.
        </p>
      </section>
    </>
  );
}

export default Home;