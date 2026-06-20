import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Good AI Global — Strategic Intelligence for Africa's AI Future",
  description:
    "Africa's strategic AI intelligence platform. Signal Desk briefings, media monitoring, and constitutional evidence on how AI reshapes power across the continent.",
  openGraph: {
    title: "Good AI Global",
    description: "Strategic Intelligence for Africa's AI Future",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#05070B] text-[#F0EDE8] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
