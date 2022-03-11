/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: About 
 * Name: about 
 * Model ZUID: 6-7c4bbc-wh1sg6
 * File Created On: Mon Feb 21 2022 07:38:12 GMT-0800 (Pacific Standard Time)
 * 
 * Model Fields:
 * 
  * title (text)
 * hero_content (wysiwyg_basic)
 * page_content (wysiwyg_basic)
 * hero_image (images)
 * section_image (images)
 * team_members (one_to_many)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-7c4bbc-wh1sg6
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from 'components/Container';

// blocks
import Headline from 'blocks/banners/Headline';
import { Gallery } from 'blocks/graphics';
import { Numbers } from 'blocks/stats';
import { Story } from 'blocks/contentBlocks';
import { TeamWithSmallSquarePhotos } from 'blocks/team';
// filler content
import FillerContent from 'components/FillerContent';

function About({ content }) {
  //   Main is not needed in page builds as it will duplicate the header and footer

  return (
    <>
      <Box>
        <Box>
          <Container>
            <Headline title={content.title || FillerContent.header}
            description={content.description || FillerContent.header}/>
          </Container>
          <Container paddingY={'0 !important'}>
            <Gallery
            photos={content.team_photos?.data || FillerContent.photos} />
          </Container>
          <Container maxWidth={'800px !important'}>
            <Numbers
            stats={content.stats.data} />
          </Container>
          <Container maxWidth={'800px !important'}>
            <Divider />
          </Container>
          <Container>
            <Story
            title={content.hero_content || FillerContent.header}
            description={content.page_content || FillerContent.rich_text}
            logos={content.story_logos?.data || FillerContent.logos} />
          </Container>
          <Container maxWidth={'800px !important'}>
            <Divider />
          </Container>
          <Container>
            <TeamWithSmallSquarePhotos
            eyebrow={content.team_eyebrow || FillerContent.header}
            title={content.team_title || FillerContent.header}
            team={content.team_members.data} />
          </Container>
        </Box>

        {/* Zesty.io Output Example and accessible JSON object for this component. Delete or comment out when needed.  */}
        {/* <br />
         <br />
         <div
           style={{
             background: '#eee',
             border: '1px #000 solid',
             margin: '10px',
             padding: '20px',
           }}
         >
           <h2>Accessible Zesty.io JSON Object</h2>
           <pre>{JSON.stringify(content, null, 2)}</pre>
         </div> */}
        {/* End of Zesty.io output example */}
      </Box>
    </>
  );
}

export default About;
