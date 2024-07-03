import styled from "styled-components";

export const NavbarSection = styled.nav`
  background-color: #ffff;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
`;

export const LogoMenu = styled.img`
  width: 5rem;
  height: 5rem;
  background-color: #ffff;
`;

export const LogoText = styled.img`
  padding-left: 1rem;
  width: 11rem;
  height: 5rem;
  background-color: #ffff;
`;

export const IconsSection = styled.div`
  background-color: #ffff;
`;

export const MenuSection = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 22%;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffff;
  z-index: 999;
  height: 75em;
`;

export const UlMenu = styled.ul`
  list-style: none;
  background-color: #ffff;
`;

export const ListMenu = styled.li`
  font-family: "Poppins", sans-serif;
  padding: 1.5rem;
  cursor: pointer;
  background-color: #ffff;
`;

export const PersonCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  border-radius: 18px;
  box-shadow: 13px 3px 40px rgba(0, 0, 0, 0.1);
  padding-top: 3rem;
  padding-bottom: 3rem;
  width: 75%;
  background-color: #ffff;
  margin-top: 5rem;
`;

export const PersonImg = styled.img`
  border-radius: 50%;
  width: 6rem;
  height: 7rem;
  background-color: #ffff;
`;

export const PersonName = styled.h4`
  font-family: "Poppins", sans-serif;
  padding-top: 1rem;
  font-size: 1em;
`;

export const PersonEmail = styled.p`
  font-family: "Poppins", sans-serif;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1em;
  background-color: #ffff;
`;

export const PersonButton = styled.button`
  background-color: #ebf1ef;
  border-style: none;
  font-family: "Poppins", sans-serif;
  padding: 1rem 2rem;
  border-radius: 8px;
  color: #135846;
`;

export const NavFooter = styled.div`
  background-color: #ffff;
  padding-top: 15rem;
`;

export const NavCopy = styled.p`
  font-family: "Poppins", sans-serif;
  padding-left: 3rem;
  padding-bottom: 1rem;
  font-weight: bold;
  background-color: #ffff;
`;

export const NavRights = styled.p`
  font-family: "Poppins", sans-serif;
  padding-left: 3rem;
  background-color: #ffff;
`;

export const DashboardNav = styled.div`
  display: flex;

  background-color: #ffff;
  transition: margin-left 0.2s ease-in-out;
  margin-left: ${(props) => (props.isOpen ? "0" : "0")};
`;

export const InputSearch = styled.input`
  border-radius: 12px;
  background-color: #fcfcfc;
  transform: translateY(-161%);
`;

export const DashboardText = styled.p`
  font-family: "Poppins", sans-serif;
  padding-left: 3rem;
  background-color: #ffff;
`;

export const IconContainer = styled.div`
  z-index: 1;
  transition: padding-left 0.2s ease-in-out;
  padding-left: ${(props) => (props.isOpen ? "18rem" : "2rem")};
  align-items: center;
  background-color: #fff;
`;
