import { React, useEffect, useState, useRef, useCallback } from 'react';
import { useTheme } from '@emotion/react';
import { Container, Box, Button, Grid, Typography } from '@mui/material';


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import slides
import { SlideQuestions } from 'components/marketing/Join/SlideQuestions';
import { SlideMessage } from 'components/marketing/Join/SlideMessage';
import { DancingLogo } from 'components/marketing/Join/DancingLogo';
import { Signup } from 'components/marketing/Join/Signup';
import { WelcomeScreen } from 'components/marketing/Join/WelcomeScreen';
import { QuizTwoTone } from '@mui/icons-material';

// messages
const firstMessage = <>
    <Typography variant="h2">Hi there!</Typography>
    <Typography variant="h6">We are excited for you to explore Zesty ;)</Typography>
    <Box paddingY={1}>
        <Typography variant="p"> To help onboard you, may we ask two questions?</Typography>
    </Box>
</>;
const firstButton = `Yes, Let's Go!`;
const firstQuestion = "What team are you on?";
const firstAnswers = [
    {
        answer: 'Development',
        value: 'developer'
    },
    {
        answer: 'Marketing',
        value: 'marketer'
    },
    {
        answer: 'Management',
        value: 'manager'
    }
];

const secondQuestion = "What are you building?";
const secondAnswers = [
    {
        answer: 'Website',
        value: 'website'
    },
    {
        answer: 'Landing Page',
        value: 'landing-page'
    },
    {
        answer: 'Ecommerce',
        value: 'ecommerce'
    },
    {
        answer: 'App',
        value: 'app'
    },
    {
        answer: 'IoT Project',
        value: 'iot'
    },
    {
        answer: 'All Those Things ;)',
        value: 'all'
    },

];

 // for everyone
const thirdQuestion = "What CMS are you currently using?";
const thirdAnswers = [
    {
        answer: 'Wordpress',
        value: 'wordpress'
    },
    {
        answer: 'Drupal / Acquia',
        value: 'drupal'
    },
    {
        answer: 'Contentful',
        value: 'contentful'
    },
    {
        answer: 'Prismic',
        value: 'prismic'
    },
    {
        answer: 'Strapi',
        value: 'strapi'
    },
    {
        answer: 'GraphCMS / Hygraph',
        value: 'graphcms'
    },
    {
        answer: 'Kentico',
        value: 'kentico'
    },
    {
        answer: 'Webflow / Wix / Weebly',
        value: 'other'
    },
    {
        answer: 'Other / Custom',
        value: 'other'
    },
    {
        answer: 'Content Stack',
        value: 'kentico'
    },
    {
        answer: 'Adobe',
        value: 'adobe'
    }
];


// on if developer was picked

const fourthQuestion = "What Technologies are you using?";
const fourthAnswers = [
    {
        answer: 'React / Next.js / Gatsby',
        value: 'react'
    },
    {
        answer: 'Vue / Nuxt',
        value: 'vue'
    },
    {
        answer: 'PHP',
        value: 'php'
    },
    {
        answer: 'Node.js',
        value: 'node'
    },    
    {
        answer: 'Traditional HTML/Javascript',
        value: 'traditional'
    },
    {
        answer: '.Net',
        value: 'node'
    },      
];



export default function Join(props) {
    const theme = useTheme();

    const [currentAnimation, setCurrentAnimation] = useState('rollIn');

    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slidePrev();
    }, []);
  
    const handleNext = useCallback(() => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slideNext();
      setCurrentAnimation('still');

    }, []);

    const handleAnswers = (answer) => {
        setCurrentAnimation('jiggle');
        handleNext();
    }

    const handleExit = () => {
        window.location = '/'
    }

    const handlePrompt = () => {
        setCurrentAnimation('bouncing');
        handleNext();
    }

    const handleAnimation = (ani) => {
        setCurrentAnimation(ani)
    }


    return (
    <Box>
        <DancingLogo animation={currentAnimation} />
        <Swiper
            pagination={{
            type: "progressbar",
            }}
            ref={sliderRef}
            navigation={false}
            modules={[Pagination, Navigation]}
        >
            <SwiperSlide> 
                <Grid container>  
                    <Grid item lg={7} md={7} xs={12}>
                        <WelcomeScreen />
                    </Grid>  
                    <Grid item lg={5} md={5} xs={12}>
                        <Container sx={{padding: '5em'}}>

                            <SlideMessage 
                                message={firstMessage} 
                                buttonText={firstButton} 
                                exitButtonText={'No, get me outta here!'}
                                exitButtonAction={handleExit}
                                answerCallBack={handlePrompt} 
                                hoverAnimation={handleAnimation}
                                
                            />
                        </Container>
                    </Grid>
                   
                </Grid>
            </SwiperSlide>
            <SwiperSlide>
                <Grid container>
                    <Grid item lg={6} md={6} xs={12}>
                        <SlideQuestions 
                            question={firstQuestion} 
                            answers={firstAnswers} 
                            answerCallBack={handleAnswers}
                            hoverAnimation={handleAnimation}
                            />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        Welcome to Zesty Component
                    </Grid>
                </Grid>
            </SwiperSlide>
            <SwiperSlide>
                <SlideQuestions question={secondQuestion} answers={secondAnswers} answerCallBack={handleAnswers} hoverAnimation={handleAnimation} />
            </SwiperSlide>
            <SwiperSlide>
                <Signup message="Thanks, now let's get your started!." />
            </SwiperSlide>
            <SwiperSlide>
                <>
                    <SlideQuestions question={thirdQuestion} answers={thirdAnswers} answerCallBack={handleAnswers} hoverAnimation={handleAnimation} />
                    <Button onClick={handleNext}  variant="outlined">Skip</Button>
                </>
            </SwiperSlide>
            <SwiperSlide>NPM starter, Youtube Video, Join Community Chat, Talk to an onbording specialist</SwiperSlide>
        </Swiper>
       
    </Box>
       
    )
}


const payload = {
    "question": '',
    "answer": '',
    "path": '',
    "email": '',
  }
  
  function sendPayload(payload){
    if(isLive()){
      fetch('https://us-central1-zesty-prod.cloudfunctions.net/onboardQuestion', {
        method: 'POST',
        credentials: 'omit',
        body:    JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      console.log(payload)
    }
  }

  // sendPayload(payload); 