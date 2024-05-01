"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center">
      <Button onClick={() => router.push("/login")}>
        <span className="font-nunito">Go to login</span>
      </Button>
      <h1>some other text</h1>
    </div>
  );
}
