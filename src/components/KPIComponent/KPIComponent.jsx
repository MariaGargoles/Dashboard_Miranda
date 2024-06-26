import { IoBedOutline } from "react-icons/io5";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoIosLogIn, IoIosLogOut  } from "react-icons/io";
import { KPISection, KPICard } from "./KPIStyled";

export const KPIComponent = () => {

    return (
        <>
        
        <KPISection>
            <KPICard>    
               <IoBedOutline/>
                <div>
                    <h3>8,461</h3>
                    <p>New Booking</p>
                </div>
            </KPICard>

           <KPICard>
               <LuCalendarCheck2/>
                <div>
                    <h3>963</h3>
                    <p>Scheduled Room</p>
                </div>
            </KPICard>

            <KPICard>
               <IoIosLogIn/>
                <div>
                    <h3>753</h3>
                    <p>Check In</p>
                </div>
            </KPICard>

            <KPICard>
               <IoIosLogOut/>
                <div>
                    <h3>516</h3>
                    <p>Check Out</p>
                </div>
            </KPICard>

        </KPISection>

        </>)
}