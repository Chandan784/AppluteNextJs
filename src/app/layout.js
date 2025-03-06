"use client";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <title>Applute</title>
      </head>
      <body>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
