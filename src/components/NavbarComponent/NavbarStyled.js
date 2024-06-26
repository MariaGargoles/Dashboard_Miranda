import styled from "styled-components";

export const NavbarSection = styled.nav`
  background-color: #ffff;
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 100%;
  position: relative;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
`;

export const LogoMenu = styled.img`
  width: 5rem;
  height: 5rem;
`;

export const LogoText = styled.img`
  padding-left: 1rem;
  width: 11rem;
  height: 5rem;
`;

export const IconsSection = styled.div``;

export const MenuSection = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 27%;
  background-color: white;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  padding-bottom: 18rem;
`;

export const UlMenu = styled.ul`
  list-style: none;
`;

export const ListMenu = styled.li`
  font-family: "Poppins", sans-serif;
  padding: 1.9rem;
  cursor: pointer;
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
`;

export const PersonImg = styled.img`
  border-radius: 50%;
  width: 6rem;
  height: 7rem;
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
`;

export const PersonButton = styled.button`
  background-color: #ebf1ef;
  border-style: none;
  font-family: "Poppins", sans-serif;
  padding: 1rem 2rem;
  border-radius: 8px;
`;

export const NavFooter = styled.div``;

export const NavCopy = styled.p`
  font-family: "Poppins", sans-serif;
  padding-left: 3rem;
  padding-bottom: 1rem;
  font-weight: bold;
`;

export const NavRights = styled.p`
  font-family: "Poppins", sans-serif;
  padding-left: 3rem;
`;

export const DashboardNav = styled.div`
  display: flex;
  padding-right: 45rem;
`;

export const InputSearch = styled.input`
  border-radius: 12px;
  background-color: #fcfcfc;
  transform: translateY(-161%);
`;
