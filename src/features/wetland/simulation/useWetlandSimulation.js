import { useEffect, useState } from "react";
import { INITIAL_STATE } from "./constants";
import { evolveWetland } from "./model";

export function useWetlandSimulation(controls) {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    setState((previousState) =>
      evolveWetland(previousState, controls, { advanceTime: false }),
    );
  }, [controls.freshwater, controls.connectivity, controls.climate]);

  useEffect(() => {
    if (!controls.isPlaying) return undefined;

    const intervalId = setInterval(() => {
      setState((previousState) =>
        evolveWetland(previousState, controls, { advanceTime: true, dtHours: 0.25 }),
      );
    }, 180);

    return () => clearInterval(intervalId);
  }, [controls]);

  const setManualTime = (value) => {
    setState((previousState) =>
      evolveWetland(
        { ...previousState, timeOfDay: value },
        controls,
        { advanceTime: false },
      ),
    );
  };

  const resetState = () => setState(INITIAL_STATE);

  return { state, setState, setManualTime, resetState };
}
