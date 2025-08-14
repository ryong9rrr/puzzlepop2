import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "멀티게임 | 퍼즐팝",
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
