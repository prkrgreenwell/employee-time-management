import { useSession } from "next-auth/react";
import { Button } from "./Button";
import { CurrentTime } from "./CurrentTime";
import { api } from "~/utils/api";
import { FormEvent, useEffect, useState } from "react";

const CurrentShift = () => {
  const [currentShift, setCurrentShift] = useState(null);
  const session = useSession();
  const user = session.data?.user;
  const userId = user?.id;

  useEffect(() => {
    const fetchCurrentShift = async () => {
      try {
        const shiftData = await fetch(`api/shifts?userId=${userId}`);
        const shift = await shiftData.json();
        setCurrentShift(shift);
      } catch (error) {
        console.error("Error fetching current shift:", error);
      }
    };
    fetchCurrentShift();
  }, [userId]);
};

export function ClockInOut() {
  const [isClockIn, setIsClockIn] = useState(false);
  const [isClockOut, setIsClockOut] = useState(true);
  const session = useSession();
  const user = session.data?.user;
  const createShift = api.clock.clockIn.useMutation({});
  const endShift = api.clock.clockOut.useMutation({});

  function handleClockIn(e: FormEvent) {
    e.preventDefault();
    if (session.status !== "authenticated") return null;
    const clockInTime = new Date();

    createShift.mutate({ clockInTime: clockInTime });

    setIsClockIn(true);
    setIsClockOut(false);
  }

  function handleClockOut(e: FormEvent) {
    e.preventDefault();
    if (session.status !== "authenticated") return null;
    const clockOutTime = new Date();

    endShift.mutate({ clockOutTime: clockOutTime });

    setIsClockIn(false);
    setIsClockOut(true);
  }

  return (
    <form className="flex flex-col gap-2 border-b px-4 py-4">
      <div className="flex flex-col gap-4">
        {user != null ? (
          <>
            <h1>Hello {user.name}</h1>
            <CurrentTime />
            <div className="flex">
              <Button
                disabled={isClockIn}
                green={isClockOut}
                onClick={handleClockIn}
              >
                Clock In
              </Button>
              <Button
                disabled={isClockOut}
                red={isClockIn}
                onClick={handleClockOut}
              >
                Clock Out
              </Button>
            </div>
          </>
        ) : (
          <h1>Welcome to the Time Management System</h1>
        )}
      </div>
    </form>
  );
}
