import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
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
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        <Image
          src="/404.png"
          height={300}
          width={300}
          alt="404 not found image"
        />
        <h2 className="text-center">
          The page you are looking for is not found
        </h2>
        <Link href={"/"} className={cn(buttonVariants({ variant: "default" }))}>
          Back to Home
        </Link>
      </div>
    </>
  );
};
export default NotFound;
