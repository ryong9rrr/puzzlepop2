import type { Metadata } from "next";
import "@themes/global.css";

export const metadata: Metadata = {
  title: "About | 퍼즐팝",
  description: "퍼즐팝 소개 페이지입니다.",
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
