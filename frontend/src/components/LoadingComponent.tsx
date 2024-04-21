"use client";

import { ClimbingBoxLoader } from "react-spinners";
import { Web3Modal } from "./Web3Modal";
import LogoComponent from "./Logo";

export default function LoadingComponent() {
  return (
    <Web3Modal>
      <main className="h-screen w-screen flex flex-col items-center justify-center gap-12">
        <LogoComponent />
        <ClimbingBoxLoader />
      </main>
    </Web3Modal>
  );
}
