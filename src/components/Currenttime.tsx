import { useState, useEffect } from "react";

export function CurrentTime() {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div>
      <h2>{date.toDateString()}</h2>
      <h2>{date.toLocaleTimeString()}</h2>
    </div>
  );
}
