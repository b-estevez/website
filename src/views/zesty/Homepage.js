/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 *
 * Label: Homepage
 * Name: homepage
 * Model ZUID: 6-31079c-vdg69q
 * File Created On: Mon Feb 21 2022 07:38:12 GMT-0800 (Pacific Standard Time)
 *
 * Model Fields:
 *
  * title (text)
 * content (wysiwyg_advanced)
 * image (images)
 * customer_logo_heading (text)
 * main_headline (text)
 * main_description (wysiwyg_advanced)
 * og_image (images)

 *
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 *
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 *
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-31079c-vdg69q
 *
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

/**
 * MUI Imports
 */
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Components Imports
 */
// import Hero from 'components/marketing/Homepage/Hero';
// import SimpleHeroWithImageAndCtaButtons from 'blocks/zesty/Hero/SimpleHeroWithImageAndCtaButtons';
// import SimpleCardLogo from 'blocks/zesty/LogoGrid/SimpleCardLogo';
// import CardsInContainer from 'blocks/zesty/Cards/CardsInContainer';
// import Growth from 'blocks/zesty/Growth/Growth';
// import CaseStudyCards from 'blocks/zesty/Cards/CaseStudyCards';
// import LogoSlider from 'blocks/zesty/Slider/LogoSlider';
// import Bottom from 'blocks/zesty/Bottom/Bottom';
import { AccountPageloading } from 'components/accounts/ui/loading';

// Helpers Imports
// import FillerContent from 'components/globals/FillerContent';
// import AlternateColumns from 'blocks/zesty/PageLayouts/AlternateColumns';
// import WithHighlightedCard from 'blocks/zesty/Testimonials/WithHighlightedCard';
import Dashboard from 'components/accounts/dashboard';
// import DarkBlueCta from 'blocks/zesty/Cta/DarkBlueCta';
// import AOS from 'aos';
// import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import { useZestyStore } from 'store';
import revampTheme from 'theme/revampTheme';
import { ThemeProvider, useTheme } from '@mui/material';
import Hero from 'revamp/ui/Hero';
import BlackHero from 'revamp/ui/BlackHero';

// import TabsSection from 'revamp/ui/TabsSection';
// import GridFeature from 'revamp/ui/GridFeature';
// import SingleTestimonial from 'revamp/ui/SingleTestimonial';
// import Stats from 'revamp/ui/Stats';
// import EnterpriseGrowth from 'revamp/ui/EnterpriseGrowth';
// import FeatureBulletWithTestimonials from 'revamp/ui/FeatureBulletWithTestimonials';
// import SecurityFeature from 'revamp/ui/SecurityFeature';
// import GetDemoSection from 'revamp/ui/GetDemoSection';

import dynamic from 'next/dynamic';

const TabsSection = dynamic(() => import('revamp/ui/TabsSection'), {
  loading: () => <p>Loading...</p>,
});
const GridFeature = dynamic(() => import('revamp/ui/GridFeature'), {
  loading: () => <p>Loading...</p>,
});
const SingleTestimonial = dynamic(() => import('revamp/ui/SingleTestimonial'), {
  loading: () => <p>Loading...</p>,
});
const Stats = dynamic(() => import('revamp/ui/Stats'), {
  loading: () => <p>Loading...</p>,
});
const EnterpriseGrowth = dynamic(() => import('revamp/ui/EnterpriseGrowth'), {
  loading: () => <p>Loading...</p>,
});
const FeatureBulletWithTestimonials = dynamic(
  () => import('revamp/ui/FeatureBulletWithTestimonials'),
  {
    loading: () => <p>Loading...</p>,
  },
);
const SecurityFeature = dynamic(() => import('revamp/ui/SecurityFeature'), {
  loading: () => <p>Loading...</p>,
});
const GetDemoSection = dynamic(() => import('revamp/ui/GetDemoSection'), {
  loading: () => <p>Loading...</p>,
});

function Homepage({ content }) {
  const { loading } = useZestyStore();
  const [isDark, setIsDark] = useState(true);
  const { palette } = useTheme();

  useEffect(() => {
    if (new Date().getTime() % 2 === 0) setIsDark(false);
    else setIsDark(true);
  }, []);

  if (loading) {
    return <AccountPageloading title={'Zesty.io'} />;
  }

  if (content?.zesty?.isAuthenticated) {
    return <Dashboard content={content} />;
  }

  return (
    <>
      <ThemeProvider theme={() => revampTheme(palette.mode)}>
        {!isDark ? <Hero /> : <BlackHero />}
      </ThemeProvider>
      <ThemeProvider theme={() => revampTheme(palette.mode)}>
        <TabsSection />
        <GridFeature />
        <SingleTestimonial />
        <Stats />
        <SecurityFeature />
        <EnterpriseGrowth />
        <FeatureBulletWithTestimonials />
        <GetDemoSection />
      </ThemeProvider>
    </>
  );
}

export default Homepage;
