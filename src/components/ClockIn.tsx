import { useSession } from "next-auth/react";
import { CurrentTime } from "./Currenttime";
import { Button } from "./Button";

export function ClockIn() {
  return (
    <form className="flex flex-col gap-2 border-b px-4 py-4">
      <div className="flex flex-col gap-4">
        <h1>Hello Name</h1>
        <CurrentTime />
        <div className="flex">
          <Button>Clock In</Button>
          <Button>Clock Out</Button>
        </div>
      </div>
    </form>
  );
}
