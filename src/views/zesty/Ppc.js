/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: PPC 
 * Name: ppc 
 * Model ZUID: 6-a88e8b93b7-w4n381
 * File Created On: Tue Jun 07 2022 18:38:44 GMT+0200 (Central European Summer Time)
 * 
 * Model Fields:
 * 
 
 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-a88e8b93b7-w4n381
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React  from 'react';

function Ppc({content}) {
    return (
        <>
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
  
export default Ppc;
