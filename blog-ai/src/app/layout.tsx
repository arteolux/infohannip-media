import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "글감 AI — 개인용",
  description: "개인용 블로그 글감 발견 및 AI 글쓰기 도구",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
