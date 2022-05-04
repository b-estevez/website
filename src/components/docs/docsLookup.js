export async function docsLookup(ctx){
    // default data object
    let data = {}
    // setup default path
    let markdownFilePath = 'homepage.md'
    // some file structures have a README.md as the index, this will be use to check that
    let markdownFilePathREADME = 'README.md'
    // split url 
    let urlPath = ctx.resolvedUrl

    if(urlPath !== '/docs/'){
        // remove /docs/, the trailing foward slash, and  and make new string with .md reference
        markdownFilePath = urlPath.replace('/docs/','').replace(/\/$/,'.md')
        markdownFilePathREADME = urlPath.replace('/docs/','').replace(/\/$/,'README.md')
    }

    // table of contents
   try {
       let url = 'https://raw.githubusercontent.com/zesty-io/zesty-org/master/TableOfContents.md'
       let res = await fetch(url)
       
       data.toc = await res.text();
   } catch(err){
       data.error = err
   }
   
   try {
        // docs data
        let url = `https://raw.githubusercontent.com/zesty-io/zesty-org/master/${markdownFilePath}`
        console.log(url)
        let res = await fetch(url)
        data.markdown = await res.text();
   } catch(err){
       data.error = err
   }

   // generate a status 404 page
   if (data.error) return { notFound: true }
 
   // Pass data to the page via props
   return { props: data };
}