// REact and MUI Imports
import { React } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import Head from 'next/head';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import slides
import { SlideMessage } from 'components/marketing/Join/SlideMessage';

// google analytics
// import * as ga from 'lib/ga';

import { getIsAuthenticated } from 'utils';

// messages
const firstMessage = (
  <Box paddingY={4}>
    <Typography variant="h4" gutterBottom>
      Hello!
    </Typography>
    <Typography variant="h6">
      We are excited for you to explore Zesty.
    </Typography>
    <Box paddingY={1}>
      <Typography variant="p">
        {' '}
        To help onboard you, can we ask two questions?
      </Typography>
    </Box>
  </Box>
);

const firstButton = `Yes, let's go!`;
const firstImage = `https://kfg6bckb.media.zestyio.com/homepageHero.png`;

// Join component

export default function Join(props) {
  const theme = useTheme();
  let abmessage, abbuttontext, abimage;

  // ab message
  if (props.campaign !== false) {
    abmessage = (
      <Box paddingY={4}>
        <Typography
          variant="h4"
          color="black"
          textAlign={'left'}
          fontWeight={'bold'}
          sx={{ mb: 2 }}
        >
          {props.ab.title}
        </Typography>
        <Box paddingY={1}>
          <Typography
            variant="body"
            dangerouslySetInnerHTML={{ __html: props.ab.description }}
          ></Typography>
        </Box>
      </Box>
    );
    abbuttontext = props.abcta_button_text
      ? props.abcta_button_text
      : `Let's get Started!`;
    abimage = props.ab.header_image ? props.ab.header_image : firstImage;
  } else {
    abmessage = firstMessage;
    abbuttontext = firstButton;
    abimage = firstImage;
  }

  // sx={{background: theme.palette.zesty.zestyDarkBlue}}

  // Hard coded values no zesty model for this page
  const seoTitle = 'Start your first project with Zesty.io';
  const seoDescription =
    'Create an account with Zesty.io to start your first instance free';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <link
          rel="icon"
          href="https://brand.zesty.io/favicon.png"
          type="image/png"
        />
      </Head>
      <Box sx={{ background: theme.palette.zesty.zestyFieldBlue }}>
        <Stack
          py={4}
          width={1}
          sx={{
            justifyItems: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="https://brand.zesty.io/zesty-io-logo-horizontal.png"
            alt="Zesty.io Logo"
            height={80}
          />
        </Stack>

        <SlideMessage
          message={abmessage}
          image={abimage}
          buttonText={abbuttontext}
        />
      </Box>
    </>
  );
}

export async function getServerSideProps({ res, query }) {
  // does not display with npm run dev
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=3600',
  );
  let abdata = {};
  let campaign = query.UTM_Campaign ? query.UTM_Campaign : false;

  if (campaign) {
    const abres = await fetch(
      'https://www.zesty.io/-/gql/a_b_test_data_set.json',
    );
    const abjsondata = await abres.json();
    let match = abjsondata.find(
      (d) => d.unique_identifier.toLowerCase() == campaign.toLowerCase(),
    );
    // if the campaign data has a match for A/B testing, grab it
    if (match) {
      abdata = match;
    } else {
      campaign = false;
    }
  }

  let data = {
    production:
      process.env.PRODUCTION == 'true' || process.env.PRODUCTION === true
        ? true
        : false,
  };
  const isAuthenticated = getIsAuthenticated(res);

  // Pass data to the page via props
  return {
    props: {
      ...data,
      ab: abdata,
      campaign: campaign,
      zesty: {
        isAuthenticated,
      },
    },
  };
}
