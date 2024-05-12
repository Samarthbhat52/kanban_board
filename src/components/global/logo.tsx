import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo-coloured.svg"
        width="150"
        height="80"
        alt="Logo"
        className="w-200 dark:hidden"
      />
      <Image
        src="/logo-light.svg"
        width="150"
        height="80"
        alt="Logo"
        className="w-200 hidden dark:block"
      />
    </Link>
  );
};
export default Logo;
