import { useEffect, useState } from "react";


export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace = false) {

    if (replace && history.length > 1) {
      history.pop();
    }

    setHistory([...history, newMode])
    setMode(newMode)
  }

  function back() {

    if (history.length > 1) { // history arr cannot be less then 1
      history.pop();
      setHistory([...history])
      setMode(history[history.length-1])
    }
  }

  return { mode, transition, back };
}