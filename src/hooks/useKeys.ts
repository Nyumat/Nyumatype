import { useCallback, useEffect, useState } from "react";

function isKeyAllowed(code: string) {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space"
  );
}

export default function useKeys(enabled: boolean) {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [typed, setTyped] = useState<string>("");
  const [totalTyped, setTotalTyped] = useState<number>(0);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (!enabled || !isKeyAllowed(code)) {
        return;
      }

      switch (key) {
        case "Backspace":
          setTyped((prev) => prev.slice(0, -1));
          setCursorPosition((prev) => prev - 1);
          setTotalTyped((prev) => prev - 1);
          break;
        default:
          setTyped((prev) => prev.concat(key));
          setCursorPosition((prev) => prev + 1);
          setTotalTyped((prev) => prev + 1);
      }
    },
    [enabled]
  );

  const clearTyped = useCallback(() => {
    setTyped("");
    setCursorPosition(0);
  }, []);

  const clearTotalTyped = useCallback(() => {
    setTotalTyped(0);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return { cursorPosition, typed, clearTyped, totalTyped, clearTotalTyped };
}
