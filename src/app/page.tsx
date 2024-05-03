import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
});

export default async function HomePage() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return redirect("/dashboard");
  }

  return (
    <>
      <div className="dotted-bg absolute left-0 top-0 z-[-10] h-full w-full"></div>
      <div>
        <div
          aria-hidden="true"
          className="sm:-top-30 pointer-events-none absolute inset-x-0 -top-40 -z-10 h-full w-full transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <div className="flex min-h-screen w-full flex-col items-center gap-10 text-center sm:gap-5">
        <nav className="flex w-full items-center justify-between py-5">
          <Link href="/">
            <Image
              src="/logo-coloured.svg"
              width="150"
              height="80"
              alt="Logo"
              className="w-200"
            />
          </Link>
          <Link
            className={buttonVariants({
              size: "sm",
            })}
            href="/login"
          >
            Get started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </nav>
        <div className="flex flex-col items-center gap-2">
          <div className="mx-auto mb-4 flex max-w-fit cursor-pointer items-center justify-center space-x-2 overflow-hidden rounded-full border bg-muted px-7 py-2 shadow-md backdrop-blur transition-all hover:border-[#ff80b5] hover:bg-muted/50">
            <p className="font-semibold">✨ Your Workflow, Perfected.</p>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-5xl lg:text-6xl">
            Empower Your Productivity: Welcome to{" "}
            <span
              className={cn("font-bold text-blue-500", dancingScript.className)}
            >
              Boardify
            </span>{" "}
            - Where Task Management Meets Simplicity!
          </h1>
          <p className="mt-5 max-w-prose text-gray-400">
            Welcome to our Boardify! Simplify task management and boost
            productivity. Get started today!
          </p>
        </div>
      </div>
    </>
  );
}
