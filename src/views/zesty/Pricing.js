/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: Pricing 
 * Name: pricing 
 * Model ZUID: 6-ef1038-d9tb16
 * File Created On: Fri Mar 04 2022 12:16:05 GMT-0800 (Pacific Standard Time)
 * 
 * Model Fields:
 * 
  * title (text)
 * content (wysiwyg_advanced)
 * fine_print (wysiwyg_basic)
 * volume_discount_image (images)
 * enterprise_image (images)
 * volume_pricing (text)
 * volume_discount_description (wysiwyg_advanced)
 * instance_definition (textarea)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-ef1038-d9tb16
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React  from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Container from 'components/Container';
import PricingHero from '../../blocks/pricing/PricingHero/PricingHero'
import SupportBanner from '../../blocks/pricing/SupportBanner/SupportBanner'
import PricingCompareTable from '../../blocks/pricing/PricingCompareTable/PricingCompareTable'
import Faq from '../../blocks/pricing/Faq/Faq'
import Plans from '../../blocks/pricing/Plans/Plans'

let zestyURL =
(undefined === process.env.PRODUCTION) == 'true' || process.env.PRODUCTION
  ? process.env.zesty.production
  : process.env.zesty.stage;

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
function Pricing({content}) {
    const theme = useTheme();
    const heroProps = { 
      title: content.title,
      subtitle: content.subtitle,
      tiers: content.tiers.data
    };
    const [pricingData, setPricingData] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
    // pricing levers
    try {
      const fetchData = async () => {
        const uri = `${zestyURL}/-/gql/pricing_levers.json`;
        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const pricingLevers = await response.json();
        setIsLoaded(true);
        setPricingData(pricingLevers);
        let leverCategories = []
        pricingLevers.forEach(item => {
        leverCategories.push(item.classification)
        })
        leverCategories.filter(onlyUnique)
        let cats = [...new Set(leverCategories)]
        setCategories(cats)
      };
      fetchData();
    } catch (error) {
      console.error(`Could Not Find Results: ${error}`);
    }

   
  }, []);
    return (
        <>
        <PricingHero {...heroProps}/>
         <Box bgcolor={'alternate.main'}>
          <Container>
            <SupportBanner text_content={content.banner_content} />
          </Container>
        </Box>
      <Container>
        {categories.map(cat => <PricingCompareTable tiers={content.tiers.data} category={cat} pricingLevers={pricingData}/>)}
      </Container>
      <Container maxWidth={400} paddingY={'0 !important'}>
        <Divider />
      </Container>
      <Container>
        <Faq />
      </Container>
      <Box
        position={'relative'}
        sx={{
          backgroundColor: theme.palette.alternate.main,
        }}
      >
        
        <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            width: '100%',
            marginBottom: theme.spacing(-1),
          }}
        >
          <path
            fill={theme.palette.background.paper}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box>
      </Box>
            {/* Zesty.io Output Example and accessible JSON object for this component. Delete or comment out when needed.  */}
            <h1 dangerouslySetInnerHTML={{__html:content.meta.web.seo_meta_title}}></h1>
            <div>{content.meta.web.seo_meta_description}</div>
            <div style={{background: '#eee', border: '1px #000 solid', margin: '10px', padding: '20px'}}>
                <h2>Accessible Zesty.io JSON Object</h2>
                <pre>{JSON.stringify(content, null, 2)}</pre>
            </div>
            {/* End of Zesty.io output example */}
        </>
    );
}
  
export default Pricing;
