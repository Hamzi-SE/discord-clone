import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "./api/uploadthing/core";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Discord | Your Place to Talk and Hang Out",
    description:
        "Discord is the easiest way to talk over voice, video, and text. Talk, chat, hang out, and stay close with your friends and communities.",
    icons: {
        icon: ["/favicon.ico"],
        apple: ["/apple-touch-icon.png"],
        shortcut: ["/apple-touch-icon.png"],
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning={true}>
                <body
                    suppressHydrationWarning={true}
                    className={cn(font.className, "bg-white dark:bg-[#313338]")}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                        storageKey="discord-theme"
                    >
                        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
                        <ModalProvider />
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
