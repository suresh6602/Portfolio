"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {children}

      {!isAdmin && (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "var(--text-secondary)",
            fontSize: "12px",
          }}
        >
          © {new Date().getFullYear()} Sureshkumar R. All rights reserved.
        </div>
      )}
    </>
  );
}