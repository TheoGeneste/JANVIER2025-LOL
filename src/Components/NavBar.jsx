import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-lol.webp";
import ChampionService from "../Services/ChampionService";
import { useEffect, useState } from "react";

const NavBar = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

    const fetchChampions = async () => {
      try {
        const response = await ChampionService.fetchChampions();
        console.log(response.data.data);
        let tagsTab = [];
        Object.entries(response.data.data).map(([key, value]) => {
          console.log(value.tags);
          value.tags.map(tag => {
            if (tagsTab.includes(tag) == false) {
              tagsTab.push(tag);
            }
          });
        });

        setTags(tagsTab);
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      fetchChampions();
    }, [])

    return <>
     <Navbar expand="lg"  style={{height: "10vh"}}>
      <Container fluid>
        <Navbar.Brand onClick={() => {navigate("/")}}>
            <img src={logo} style={{width : "200px"}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate("/champions")}}>Champions</Nav.Link>
            <Nav.Link onClick={() => {navigate("/items")}}>Items</Nav.Link>
            <NavDropdown title="Types" id="basic-nav-dropdown">
              {tags.map((tag, index) => {
                return <NavDropdown.Item key={index} onClick={() => {navigate(`/champions/${tag}`)}}>{tag}</NavDropdown.Item>
              })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>;
}
 
export default NavBar;