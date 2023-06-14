import { type NextPage } from "next";
import { ClockIn } from "~/components/ClockIn";

const Home: NextPage = () => {
  return (
    <>
      <header className="x-10 sticky top-0 border-b bg-white pt-2">
        <h1 className="mb-t px-4 text-lg font-bold">Time Management</h1>
      </header>
      <ClockIn />
    </>
  );
};

export default Home;
