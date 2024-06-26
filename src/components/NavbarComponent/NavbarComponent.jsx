import React, { useState } from "react";
import "./NavbarComponent.css";
import { TfiAlignLeft } from "react-icons/tfi";
import { IoIosSearch } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { PiKeyBold } from "react-icons/pi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";
import { 
    NavbarSection, 
    LogoMenu, 
    LogoText, 
    IconsSection, 
    ListMenu, 
    MenuSection, 
    NavCopy, 
    NavFooter, 
    NavRights, 
    PersonButton, 
    PersonCard, 
    PersonEmail, 
    PersonImg, 
    PersonName, 
    UlMenu, 
    DashboardNav, 
    InputSearch
} from "./NavbarStyled";

export const NavbarComponent = () => {

    const [openMenu, setIsOpenMenu] = useState(false);

    const handleClick = () => {
        setIsOpenMenu(!openMenu)
    };

    return (
        <>
            <NavbarSection>
                <IconsSection>
                    <LogoMenu src="src/assets/Logo.png" alt="Logo" />
                    <LogoText src="src/assets/Trav.png" alt="trav" />
                </IconsSection>
                {openMenu &&  
                
                <MenuSection>
                    <UlMenu>
                        <a NavLink="" className="list-link"><ListMenu><MdDashboard className="menuicon"/>Dashboard</ListMenu></a>
                        <a NavLink="" className="list-link"><ListMenu><PiKeyBold className="menuicon"/>Rooms</ListMenu></a>
                        <a NavLink="" className="list-link"><ListMenu><LuCalendarCheck2 className="menuicon"/>Bookings</ListMenu></a>
                        <a NavLink="" className="list-link"> <ListMenu><MdOutlinePersonOutline className="menuicon"/>Users</ListMenu></a>
                        <a NavLink="" className="list-link"><ListMenu><MdContactPhone className="menuicon"/>Contact</ListMenu></a>
                    </UlMenu>
                    <PersonCard>
                        <PersonImg src="src/assets/photo.jpg" alt="Person" />
                        <PersonName>María Gárgoles</PersonName>
                        <PersonEmail>mariagargoles.dev@gmail.com</PersonEmail>
                        <PersonButton>Contact Us</PersonButton>
                    </PersonCard>
                    <NavFooter>
                        <NavCopy>Travl Hotel Admin Dashboard</NavCopy>
                        <NavRights>© 2020 All Rights Reserved</NavRights>
                    </NavFooter>
                </MenuSection>}
                <DashboardNav>
                    <TfiAlignLeft onClick={handleClick} />
                    <p className="DashboardText">Dashboard</p>
                </DashboardNav>
                <div className="iconContainer">
                
                
                <InputSearch />
                <IoIosSearch className="icons" />
                <IoMdHeartEmpty className="icons" />
                <MdOutlineMail className="icons" />
                <TbMessage className="icons" />
                </div>
            </NavbarSection>
        </>
    );
}
