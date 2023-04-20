import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../Logo";
import { School } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      <Navbar
        bg="white"
        expand="md"
        sticky="top"
        className="p-0"
        style={{ height: "75px", opacity: 0.9 }}
      >
        <Navbar.Brand href="/" className="d-flex p-0 ps-3">
          <School fontSize="large" />
          <span
            style={{ marginBottom: "-10px" }}
            className="font-bold xlarge ms-2"
          >
            School Management System
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-2" />
        <Navbar.Collapse id="basic-navbar-nav" className="p-0">
          <Nav
            className="ms-5 me-auto"
            style={{ fontSize: 20, fontWeight: 300 }}
          >
            <Nav.Link
              className="ms-2"
              active={pathname === "/result"}
              href={"/result"}
            >
              Result
            </Nav.Link>
            <Nav.Link
              className="ms-2"
              active={pathname === "/notice"}
              href={"/notice"}
            >
              Notice
            </Nav.Link>
            <Nav.Link
              className="ms-2"
              active={pathname === "/dashboard"}
              href={"/dashboard"}
            >
              Dashboard
            </Nav.Link>{" "}
            <Nav.Link
              className="ms-2"
              active={pathname === "/login"}
              href={"/login"}
            >
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
