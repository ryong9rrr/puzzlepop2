import type { Metadata } from "next";
import "@/themes/global.css";

export const metadata: Metadata = {
  title: "Puzzle Pop",
  description: "웹 퍼즐게임",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
