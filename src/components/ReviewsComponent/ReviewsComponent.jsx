
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaRegCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { ReviewSection, ReviewSectionTitle, ReviewCard, ReviewCardText, ReviewPersonCard, ReviewInnerContainer, ReviewImage, ReviewName, ReviewTime  } from './ReviewsStyled';
import "./ReviewsComponent.css"

export const ReviewsComponent = () => {
  


    return(
    <>
    <ReviewSection>
    <ReviewSectionTitle>Latest Review by Customers</ReviewSectionTitle>
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        
        <SwiperSlide className="SwiperSlide">
            <ReviewCard>
                <ReviewCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</ReviewCardText>
                <ReviewInnerContainer>
                    <ReviewImage src="src/assets/3.jpg"/>
                    <ReviewPersonCard>
                        <ReviewName>Kusnaidi Anderson</ReviewName>
                        <ReviewTime>4m ago</ReviewTime>
                    </ReviewPersonCard>
                    <FaRegCheckCircle className='iconcheck'/>
                    <GiCancel className='iconcross'/>
                </ReviewInnerContainer>    
            </ReviewCard>
            <ReviewCard>
                <ReviewCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</ReviewCardText>
                <ReviewInnerContainer>
                    <ReviewImage src="src/assets/2.jpg"/>
                    <ReviewPersonCard>
                        <ReviewName>Bella Saphira</ReviewName>
                        <ReviewTime>4m ago</ReviewTime>
                    </ReviewPersonCard>
                    <FaRegCheckCircle className='iconcheck'/>
                    <GiCancel className='iconcross'/>
                </ReviewInnerContainer>    
            </ReviewCard>
            <ReviewCard>
                <ReviewCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</ReviewCardText>
                <ReviewInnerContainer>
                    <ReviewImage src="src/assets/1.jpg"/>
                    <ReviewPersonCard>
                        <ReviewName>Thomas Al-Ghazali</ReviewName>
                        <ReviewTime>4m ago</ReviewTime>
                    </ReviewPersonCard>
                    <FaRegCheckCircle className='iconcheck'/>
                    <GiCancel className='iconcross'/>
                </ReviewInnerContainer>    
            </ReviewCard>
            </SwiperSlide>


        <SwiperSlide className="SwiperSlide">  
            <ReviewCard>
                <ReviewCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</ReviewCardText>
                <ReviewInnerContainer>
                    <ReviewImage src="src/assets/3.jpg"/>
                    <ReviewPersonCard>
                        <ReviewName>Kusnaidi Anderson</ReviewName>
                        <ReviewTime>4m ago</ReviewTime>
                    </ReviewPersonCard>
                    <FaRegCheckCircle className='iconcheck'/>
                    <GiCancel className='iconcross'/>
                </ReviewInnerContainer>    
            </ReviewCard>
            <ReviewCard>
                <ReviewCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</ReviewCardText>
                <ReviewInnerContainer>
                    <ReviewImage src="src/assets/2.jpg"/>
                    <ReviewPersonCard>
                        <ReviewName>Bella Saphira</ReviewName>
                        <ReviewTime>4m ago</ReviewTime>
                    </ReviewPersonCard>
                    <FaRegCheckCircle className='iconcheck'/>
                    <GiCancel className='iconcross'/>
                </ReviewInnerContainer>    
            </ReviewCard>
            <ReviewCard>
                <ReviewCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</ReviewCardText>
                <ReviewInnerContainer>
                    <ReviewImage src="src/assets/1.jpg"/>
                    <ReviewPersonCard>
                        <ReviewName>Thomas Al-Ghazali</ReviewName>
                        <ReviewTime>4m ago</ReviewTime>
                    </ReviewPersonCard>
                    <FaRegCheckCircle className='iconcheck'/>
                    <GiCancel className='iconcross'/>
                </ReviewInnerContainer>    
            </ReviewCard></SwiperSlide>
        
      
      </Swiper>
      </ReviewSection>
    </>)
}


