import { IoBedOutline } from "react-icons/io5";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoIosLogIn, IoIosLogOut  } from "react-icons/io";
import { KPISection, KPICard, KPICardText, KPITitle, KPIText} from "./KPIStyled";
import "./KPIsComponent.css";

export const KPIComponent = () => {

    return (
        <>
        
        <KPISection>
            <KPICard>    
               <IoBedOutline className="KPIicon"/>
                <KPICardText>
                    <KPITitle>8,461</KPITitle>
                    <KPIText>New Booking</KPIText>
                </KPICardText>
            </KPICard>

           <KPICard>
               <LuCalendarCheck2 className="KPIicon"/>
                <KPICardText>
                    <KPITitle>963</KPITitle>
                    <KPIText>Scheduled Room</KPIText>
                </KPICardText>
            </KPICard>

            <KPICard>
               <IoIosLogIn className="KPIicon"/>
                <KPICardText>
                    <KPITitle>753</KPITitle>
                    <KPIText>Check In</KPIText>
                </KPICardText>
            </KPICard>

            <KPICard>
               <IoIosLogOut className="KPIicon"/>
                <KPICardText>
                    <KPITitle>516</KPITitle>
                    <KPIText>Check Out</KPIText>
                </KPICardText>
            </KPICard>

        </KPISection>

        </>)
}