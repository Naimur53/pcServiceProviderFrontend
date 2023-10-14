import { useState } from "react";

export default function useCustomHook(defaultValue: any) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value: any) {
    console.log("Hello From Custom hook");
  }

  return [value, toggleValue];
}
