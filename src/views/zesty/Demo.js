/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 *
 * Label: Demos
 * Name: demos
 * Model ZUID: 6-ccf3cd8a82-16sw3z
 * File Created On: Thu Mar 10 2022 10:14:31 GMT-0800 (Pacific Standard Time)
 *
 * Model Fields:
 *
  * header_title (text)

 *
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 *
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 *
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-ccf3cd8a82-16sw3z
 *
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */
import { React, useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { getCookie, setCookies } from 'cookies-next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Typography from '@mui/material/Typography';

import FillerContent from 'components/globals/FillerContent';
import Container from 'components/wrappers/FullWidthContainer';
import StandardFormWithSelect from 'components/cta/StandardFormWithSelect';

const Demo = ({ content }) => {
  let demoFormEmbedLink = `https://forms.zohopublic.com/zestyio/form/SalesSignupform/formperma/634ov0T9TZdP8vJsI1KBz8WyPgltGy_IJ5xGiMKdH5Q?a=b`;

  const [formURL, setFormURL] = useState(demoFormEmbedLink);

// code to adjust the iframe embed of the zoho form
  useEffect(() => {
    let gclid = getCookie('gclid');
    let utm_campaign = getCookie('utm_campaign');
    let utm_term = getCookie('utm_term');
    let utm_medium = getCookie('utm_medium');
    let utm_source = getCookie('utm_source');

    if(gclid){
      demoFormEmbedLink += '&gclid=' + gclid;
    }
    if(utm_campaign){
      demoFormEmbedLink += '&utm_campaign=' + utm_campaign;
    }
    if(utm_source){
      demoFormEmbedLink += '&utm_source=' + utm_source;
    }
    if(utm_source){
      demoFormEmbedLink += '&referrername=' + utm_source;
    }
    if(utm_medium){
      demoFormEmbedLink += '&utm_medium=' + utm_medium;
    }
    if(utm_term){
      demoFormEmbedLink += '&utm_term=' + utm_term;
    }


     
    setFormURL(demoFormEmbedLink )

    function resizeIFrameToFitContent( iFrame ) {
        iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
        iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
    }
    window.addEventListener('DOMContentLoaded', function(e) {

        var iFrame = document.getElementById( 'leadframe' );
        resizeIFrameToFitContent( iFrame );

        // or, to resize all iframes:
        var iframes = document.querySelectorAll("iframe");
        for( var i = 0; i < iframes.length; i++) {
            resizeIFrameToFitContent( iframes[i] );
        }
    } );
  })
  
  const theme = useTheme();
  return (
    <Container paddingX={0} paddingY={0} maxWidth={{ sm: 1, md: 1236 }}>
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column', md: 'row' }}
        position={'relative'}
      >
        <Box
          width={1}
          order={{ xs: 2, md: 1 }}
          display={'flex'}
          alignItems={'center'}
        >
          <Container>
            <Box marginBottom={4}>
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 'medium',
                }}
                gutterBottom
                color={'text.secondary'}
              >
                {content.header_title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                {content.callout_title}
              </Typography>
              <Typography color="text.secondary">
                {content.header_description}
              </Typography>
            </Box>
            {/* <Form
              eyebrow={content.header_title}
                title={content.callout_title}
                subtitle={content.header_description}
                ctaButtonText={content.callout_button_text}
              /> */}
            {/* 
            removed in place to 
            
            <StandardFormWithSelect
              leadDetail="Demo Sign Up"
              selectedValue={2}
              hideSelect={true}
              modalTitle="Thank you for submitting your request."
              modalMessage="Our team will be in touch soon to schedule a demo with you."
              phoneNumber={true}
            /> */}
            <iframe
             width="100%" 
             border="0"
             id="leadframe"
             src={formURL}
             style={{border: 0, height: '600px'}}
             >

             </iframe>
          </Container>
        </Box>
        <Box
          sx={{
            flex: { xs: '0 0 100%', md: '0 0 50%' },
            position: 'relative',
            maxWidth: { xs: '100%', md: '50%' },
            order: { xs: 1, md: 2 },
            minHeight: { xs: 'auto', md: 'calc(100vh - 58px)' },
          }}
        >
          <Box
            sx={{
              width: { xs: 1, md: '50vw' },
              height: '100%',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  overflow: 'hidden',
                  left: '0%',
                  width: 1,
                  height: 1,
                  position: { xs: 'relative', md: 'absolute' },
                  clipPath: {
                    xs: 'none',
                    md: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
                  },
                  shapeOutside: {
                    xs: 'none',
                    md: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
                  },
                }}
              >
                <Box
                  sx={{
                    height: { xs: 'auto', md: 1 },
                    '& img': {
                      objectFit: 'cover',
                    },
                    '& .lazy-load-image-loaded': {
                      height: 1,
                      width: 1,
                    },
                  }}
                >
                  <Box
                    component={LazyLoadImage}
                    effect="blur"
                    src={
                      content.callout_image.data[0]?.url || FillerContent.image
                    }
                    height={{ xs: 'auto', md: 1 }}
                    maxHeight={{ xs: 300, md: 1 }}
                    width={1}
                    maxWidth={1}
                    sx={{
                      filter:
                        theme.palette.mode === 'dark'
                          ? 'brightness(0.7)'
                          : 'none',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Demo;
