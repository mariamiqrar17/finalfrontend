import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import LogoWhite from "../../assets/images/logos/xtremelogowhite.svg";
import user1 from "../../assets/images/users/user1.jpg";
import { useRouter } from "next/router";

interface HeaderProps {
  showMobmenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ showMobmenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReloaded, setIsReloaded] = useState(false);
  const router = useRouter();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    router.reload();
  };

  return (
    <Navbar color="primary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <Image src={LogoWhite} alt="logo" />
        </NavbarBrand>
        <Button color="primary" className="d-lg-none" onClick={showMobmenu}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link href="/">
              <div className="nav-link text-white">Starter</div>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/about">
              <div className="nav-link text-white">About</div>
            </Link>
          </NavItem>

          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav className="text-white">
              DD Menu
            </DropdownToggle>
            <DropdownMenu end className="bg-white text-black" >
              <DropdownItem className="bg-white text-black">Option 1</DropdownItem>
              <DropdownItem className="bg-white text-black">Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem className="bg-white text-black">Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <div style={{ lineHeight: "0px" }}>
              <Image
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </div>
          </DropdownToggle>
          <DropdownMenu className="bg-white text-black">
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem className="bg-white text-black">My Account</DropdownItem>
            <DropdownItem className="bg-white text-black">Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem className="bg-white text-black">My Balance</DropdownItem>
            <DropdownItem className="bg-white text-black">Inbox</DropdownItem>
            <DropdownItem href="/login" className="bg-white text-black">Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
            <Link href="/login">
              <Button className="bg-white text-black">Login</Button>
            </Link>
          
          <Link href="/signup">
            <Button className="mx-2 bg-white text-black">
              <div>Sign Up</div>
            </Button>
          </Link>
      </Collapse>
    </Navbar>
  );
};

export default Header;
