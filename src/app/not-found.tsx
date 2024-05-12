import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <Image
        src="/404.png"
        height={300}
        width={300}
        alt="404 not found image"
      />
      <h2 className="text-center">The page you are looking for is not found</h2>
      <Link href={"/"} className={cn(buttonVariants({ variant: "default" }))}>
        Back to Home
      </Link>
    </div>
  );
};
export default NotFound;
