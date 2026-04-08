"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import WaitlistModal from "./WaitlistModal";

const WaitlistContext = createContext<{
  openWaitlist: (source: string) => void;
}>({
  openWaitlist: () => {},
});

export const useWaitlist = () => useContext(WaitlistContext);

export default function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("");

  const openWaitlist = (src: string) => {
    setSource(src);
    setOpen(true);
  };

  return (
    <WaitlistContext.Provider value={{ openWaitlist }}>
      {children}
      <WaitlistModal open={open} onClose={() => setOpen(false)} source={source} />
    </WaitlistContext.Provider>
  );
}
