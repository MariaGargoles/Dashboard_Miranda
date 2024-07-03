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
    InputSearch,
    DashboardText,
    IconContainer
} from "./NavbarStyled";
import { NavLink } from "react-router-dom";
import { PopupUserComponent } from "../PopUpUserComponent/PopUpUserComponent";


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
                        <NavLink  to="/dashboard" className="list-link"><ListMenu><MdDashboard className="menuicon"/>Dashboard</ListMenu></NavLink>
                        <NavLink  to="/rooms" className="list-link"><ListMenu><PiKeyBold className="menuicon"/>Rooms</ListMenu></NavLink>
                        <NavLink to="/booking" className="list-link"><ListMenu><LuCalendarCheck2 className="menuicon"/>Bookings</ListMenu></NavLink>
                        <NavLink  to="/users" className="list-link"> <ListMenu><MdOutlinePersonOutline className="menuicon"/>Users</ListMenu></NavLink>
                        <NavLink  to="/contact" className="list-link"><ListMenu><MdContactPhone className="menuicon"/>Contact</ListMenu></NavLink>
                    </UlMenu>
                    <PersonCard>
                        <PersonImg src="src/assets/1.jpg" alt="Person" />
                        <PersonName>María Gárgoles</PersonName>
                        <PersonEmail>segwanda12@gmail.com</PersonEmail>
                        <PersonButton onClick={handleEditUserClick}>Edit User</PersonButton>
                    </PersonCard>
                    <NavFooter>
                        <NavCopy>Travl Hotel Admin Dashboard</NavCopy>
                        <NavRights>© 2020 All Rights Reserved</NavRights>
                    </NavFooter>
                </MenuSection>}
                <DashboardNav isOpen={openMenu}>
                    <TfiAlignLeft onClick={handleClick} />
                    <DashboardText>Dashboard</DashboardText>
                </DashboardNav>
                <IconContainer isOpen={openMenu}>
                
                
                <InputSearch />
                <IoIosSearch className="icons" />
                <IoMdHeartEmpty className="icons" />
                <MdOutlineMail className="icons" />
                <TbMessage className="icons" />
                </IconContainer>
                <PopupUserComponent isOpen={isPopupOpen} onClose={handleClosePopup} />
            </NavbarSection>
        </>
    );
}
