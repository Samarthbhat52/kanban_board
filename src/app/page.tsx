import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
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
      <div className="flex min-h-screen w-full flex-col items-center justify-start px-10 pb-12 pt-28 text-center sm:pt-40">
        <div className="mx-auto mb-4 flex max-w-fit cursor-pointer items-center justify-center space-x-2 overflow-hidden rounded-full border bg-muted px-7 py-2 shadow-md backdrop-blur transition-all hover:border-[#ff80b5] hover:bg-muted/50">
          <p className="font-semibold">✨ Your Workflow, Perfected.</p>
        </div>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-5xl lg:text-6xl">
          Unlock Your Productivity:{" "}
          <span className="text-blue-500">Kanban</span> Made Simple.
        </h1>
        <p className="mt-5 max-w-prose text-gray-400">
          Welcome to our Kanban Board platform! Simplify task management, boost
          productivity, and collaborate effortlessly. Get started today!
        </p>
        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href="/login"
          target="_blank"
        >
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </>
  );
}
