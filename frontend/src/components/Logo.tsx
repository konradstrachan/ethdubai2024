"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";

export default function LogoComponent() {
  return (
    <div className="tac-one-regular flex flex-row">
      <Image
        src={logo}
        alt="logo"
        width={580}
        height={240}
        className="rounded-md"
      />
    </div>
  );
}
