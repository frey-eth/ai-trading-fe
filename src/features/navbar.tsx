import Link from "next/link";
import Image from "next/image";
import logo from "@assets/logos/logo.png"

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-border bg-surface">
      <div className="mx-auto max-w-[95vw] px-2">
        <div className="flex md:h-14 h-10 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-1">
              <Image src={logo} alt="Alpha Arena" className="alpha-logo md:h-12 h-8 w-auto md:ml-0 -ml-2 cursor-pointer" />
              <h1 className="text-lg font-semibold font-mono">AITriadTrade</h1>
            </Link></div>
          <div className="hidden items-center space-x-6 md:flex md:absolute md:left-1/2 md:-translate-x-1/2">

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;