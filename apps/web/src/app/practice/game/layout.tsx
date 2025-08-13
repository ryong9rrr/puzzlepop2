import type { Metadata } from "next";
import "@themes/global.css";

export const metadata: Metadata = {
  title: "연습모드 | 퍼즐팝",
  description: "온라인으로 퍼즐을 맞춰보세요.",
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
