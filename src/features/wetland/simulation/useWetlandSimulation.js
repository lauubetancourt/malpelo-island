import { useEffect, useState } from "react";
import { INITIAL_STATE } from "./constants.js";
import { evolveWetland } from "./model.js";

export function useWetlandSimulation(controls) {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    setState((previousState) =>
      evolveWetland(previousState, controls, { advanceTime: false }),
    );
  }, [controls.freshwater]);

  useEffect(() => {
    if (!controls.isPlaying) return undefined;

    const intervalId = setInterval(() => {
      setState((previousState) =>
        evolveWetland(previousState, controls, {
          advanceTime: true,
          dtHours: 0.25,
        }),
      );
    }, 180);

    return () => clearInterval(intervalId);
  }, [controls]);

  const resetState = () => setState(INITIAL_STATE);

  return { state, resetState };
}
