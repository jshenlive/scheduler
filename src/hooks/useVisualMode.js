import { useEffect, useState } from "react";


export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace=false) {
    if(replace){
      history.pop();
    }
    setMode(newMode); //transition to newMode
    setHistory(prev => [...prev, newMode]); //add newMode to history
  }

  function back() {
    if (history.length > 1) { // history arr cannot be less then 1
      history.pop(); //remove the last state
      setMode(history[history.length - 1]); //set to the last state
    }
  }

  return { mode, transition, back };
}