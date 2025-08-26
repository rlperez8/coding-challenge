"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavBar: React.FC = () => {
  const pathname = usePathname();

  const getSelected = () => {
    if (pathname === "/") return "Home";
    if (pathname === "/02_admin") return "Admin";
    if (pathname === "/user") return "User";
    return "";
  };

  const selected = getSelected();

  console.log(selected)

  return (
    <nav className="navigation_bar">

        <Link className={selected === "Home" ? "icon_selected" : "icon_con"} href="/">
          <img className='icon_img' src="/images/icons/event_list.png" alt="Home Icon" />
        </Link>
  
        <Link className={selected === "Admin" ? "icon_selected" : "icon_con"} href="/02_admin">
          <img className='icon_img' src="/images/icons/admin.png" alt="Admin Icon" />
        </Link>

        <Link className={selected === "User" ? "icon_selected" : "icon_con"} href="/03_user">
          <img className='icon_img' src="/images/icons/user.png" alt="User Icon" />
        </Link>
  
    </nav>
  );
};

export default NavBar;
