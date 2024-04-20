"use client";

import Image from "next/image";

export default function LogoComponent() {
  return (
    <div className="tac-one-regular flex flex-row">
      <Image
        src="/assets/image.png"
        alt="logo"
        width={580}
        height={240}
        className="rounded-md"
      />
    </div>
  );
}
