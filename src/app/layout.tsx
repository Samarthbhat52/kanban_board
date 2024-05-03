import "@/styles/globals.css";

import { Nunito } from "next/font/google";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Boardify",
  description:
    "Welcome to our Boardify! Simplify task management and boost productivity.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <main className="h-full">
              <MaxWidthWrapper>{children}</MaxWidthWrapper>
            </main>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
