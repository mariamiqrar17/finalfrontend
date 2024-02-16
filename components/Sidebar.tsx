"use client";
import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Navigation {
  title: string;
  href: string;
  icon: string;
}

const navigation: Navigation[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "bi bi-speedometer2",
  },
  {
    title: "About",
    href: "/about",
    icon: "bi bi-people",
  },
  {
    title: "Alert",
    href: "/ui/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "Badges",
    href: "/ui/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Buttons",
    href: "/ui/buttons",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Cards",
    href: "/ui/cards",
    icon: "bi bi-card-text",
  },
  
  {
    title: "Table",
    href: "/ui/tables",
    icon: "bi bi-layout-split",
  },
  {
    title: "Forms",
    href: "/ui/forms",
    icon: "bi bi-textarea-resize",
  },
  
  
];

const Sidebar: React.FC<any> = ({ showMobilemenu }) => {
  return (
    <div className="p-3">
      <div className="flex items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={showMobilemenu}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link href={navi.href} className="">
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block p-2 cursor-pointer">
                  {navi.title}
                </span>
              </Link>
            </NavItem>
          ))}
          <Button
            color="primary"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://www.wrappixel.com/templates/xtreme-next-js-free-admin-template/"
          >
            Download Free
          </Button>
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://www.wrappixel.com/templates/xtreme-react-redux-admin/?ref=33"
          >
            Upgrade To Pro
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
