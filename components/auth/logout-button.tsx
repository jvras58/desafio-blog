"use client";

import { signOut } from "next-auth/react";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const LogoutButton = ({ children }: Props) => {
  return (
    <div 
      className="w-full" 
      onClick={async (e) => {
        e.preventDefault();
        await signOut();
      }}
    >
      {children}
    </div>
  );
};

export default LogoutButton;