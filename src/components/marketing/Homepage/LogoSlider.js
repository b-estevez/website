/**
 * MUI Imports
 */

import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import MuiMarkdown from 'mui-markdown';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
/**
 * Static Assets Imports
 */

import HeartQuote from '../../../../public/assets/images/homepage/heartQuote.svg';
import Star from '../../../../public/assets/images/homepage/star.svg';

/**
 * Components Imports
 */
import Marquee from 'react-fast-marquee';
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { useTheme } from '@mui/material';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const LogoSlider = ({ content, FillerContent, theme, isMedium, isLarge }) => {
  return (
    <Box
      component="section"
      sx={{
        mt: 10,
        py: 10,
        background: `url(${content.integrations_background?.data[0].url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: 850,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <MuiMarkdown
        overrides={{
          h2: {
            component: Typography,
            props: {
              variant: 'h3',
              component: 'h2',
              sx: {
                color: theme.palette.zesty.zestyDarkText,
                fontWeight: 'bold',
                textAlign: 'center',
              },
            },
          },
          p: {
            component: Typography,
            props: {
              variant: 'h6',
              component: 'p',
              sx: {
                mt: 1,
                color: theme.palette.zesty.zestyZambezi,
                textAlign: 'center',
              },
            },
          },
        }}
      >
        {content.integration_title_and_description || FillerContent.description}
      </MuiMarkdown>

      <Box>
        <Box sx={{ mt: 5 }}>
          <Marquee direction="right" gradient={false} speed={30}>
            {content.integrations_logos?.data.map((item, index) => (
              <Box
                key={index}
                sx={{ height: 127, width: '100%' }}
                component={'img'}
                src={item.logo?.data[0].url || FillerContent.logos[0].url}
                alt={item.name}
              />
            ))}
          </Marquee>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Marquee gradient={false} direction="left" speed={30}>
            {content.integrations_logos?.data.map((item, index) => (
              <Box
                key={index}
                sx={{ height: 127, width: '100%' }}
                component={'img'}
                src={item.logo?.data[0].url || FillerContent.logos[0].url}
                alt={item.name}
              />
            ))}
          </Marquee>
        </Box>
      </Box>
    </Box>
  );
};

export default LogoSlider;
