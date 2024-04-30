import ExportedImage from "next-image-export-optimizer";
import logo from "../public/pantry.png";
import Link from 'next/link';

const Header = () => {
    return (
      <header className="flex items-center justify-center my-8">
        <Link href="/">
          <h1 className="mr-4 text-2xl">virtual pantry</h1>
        </Link>
        <Link href="/">
          <ExportedImage src={logo} alt="Logo" width={80} height={80} />
        </Link>
      </header>
    );
  };
  
export default Header;