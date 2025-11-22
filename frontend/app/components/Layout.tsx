// Layout principal

import "@mysten/dapp-kit/dist/index.css";
import "../globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CreatorSeal - Fan Engagement Hub</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
