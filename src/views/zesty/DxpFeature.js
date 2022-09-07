/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: DXP Features 
 * Name: dxp_features 
 * Model ZUID: 6-f686a0abe7-8zs3jw
 * File Created On: Wed Jun 15 2022 00:51:14 GMT+0800 (Philippine Standard Time)
 * 
 * Model Fields:
 * 
  * hero_title (text)
 * hero_description (textarea)
 * hero_graphic (images)
 * section_1 (wysiwyg_basic)
 * section_1_features (one_to_many)
 * section_2 (wysiwyg_basic)
 * section_2_features (one_to_many)
 * section_3 (wysiwyg_basic)
 * section_3_features (one_to_many)
 * section_2_cta (text)
 * section_2_cta_link (internal_link)
 * section_3_cta (text)
 * section_3_cta_link (internal_link)
 * why_zesty (wysiwyg_basic)
 * case_studies_title (text)
 * testimonials (one_to_many)
 * bottom_description (wysiwyg_basic)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-f686a0abe7-8zs3jw
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

/**
 * MUI Imports
 */
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Features from 'blocks/features/Features/Features';

// Helpers Imports
import FillerContent from 'components/globals/FillerContent';
import Hero from 'components/marketing/DxpFeatures/Hero';

import React from 'react';

function DxpFeature({ content }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sx'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const isLarge = useMediaQuery(theme.breakpoints.down('lg'));
  const isExtraLarge = useMediaQuery(theme.breakpoints.down('xl'));
  const isDarkMode = theme.palette.mode === 'dark';

  const pageData = {
    theme,
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
    isDarkMode,
    content,
    FillerContent,
  };

  console.log(content);

  const feature_data =
    content.section_1_features?.data.reduce((acc, item) => {
      acc.push({
        icon_image: item.icon_image.data[0].url,
        feature_name: item.feature_name,
        content: item.content,
      });

      return acc;
    }, []) || [];

  const feature_header = content.section_1;
  return (
    <>
      <Hero {...pageData} />
      <Features
        header_size={32}
        textHighlight={'Workflow management'}
        data={feature_data}
        features_header={content.section_1}
      />
    </>
  );
}

export default DxpFeature;
