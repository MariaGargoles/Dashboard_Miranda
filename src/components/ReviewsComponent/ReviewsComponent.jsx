
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaRegCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { ReviewSection, ReviewSectionTitle } from './ReviewsStyled';

export const ReviewsComponent = () => {
  


    return(
    <>
    <ReviewSection>
    <ReviewSectionTitle>Latest Review by Customers</ReviewSectionTitle>
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        
        <SwiperSlide>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <div>
                    <img></img>
                    <div>
                        <p>Kusnaidi Anderson</p>
                        <p>4m ago</p>
                    </div>
                    <FaRegCheckCircle/>
                    <GiCancel/>
                </div>    
            </div>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <div>
                    <img></img>
                    <div>
                        <p>Bella Saphira</p>
                        <p>4m ago</p>
                    </div>
                    <FaRegCheckCircle/>
                    <GiCancel/>
                </div>    
            </div>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <div>
                    <img></img>
                    <div>
                        <p>Thomas Al-Ghazali</p>
                        <p>4m ago</p>
                    </div>
                    <FaRegCheckCircle/>
                    <GiCancel/>
                </div>    
            </div>
            </SwiperSlide>


        <SwiperSlide>Slide 2</SwiperSlide>
        
      
      </Swiper>
      </ReviewSection>
    </>)
}


