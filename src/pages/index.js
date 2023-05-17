import React from 'react';
import Slug from './[...slug]';
import { fetchPage, productsData } from '../lib/api';
import { getIsAuthenticated } from 'utils';

function IndexPage(content) {
  return <Slug {...content} />;
}

export default IndexPage;
const cache = {};

// Function to fetch the page data
async function fetchPageData(url) {
  // Check if the data is already cached
  if (cache[url]) {
    return cache[url];
  }

  // Fetch the page data
  const data = await fetchPage(url);

  // Cache the data
  cache[url] = data;

  return data;
}

// This gets called on every request
export async function getServerSideProps({ req, res, resolvedUrl }) {
  // needs to add this here, because the [...slug].js in pages don't get triggered in homepage path /
  // in able to use zesty.isAuthenticated to swap layout in /
  const isAuthenticated = getIsAuthenticated(res);

  // issue:  multiple call of getServersideprops
  let data = await fetchPageData(resolvedUrl);

  const products = await productsData();
  data = {
    ...data,
    zesty: {
      isAuthenticated,
      templateUrl: process.env.TEMPLATE_URL,
      products,
    },
    algolia: {
      apiKey: process.env.ALGOLIA_APIKEY,
      appId: process.env.ALGOLIA_APPID,
      index: process.env.ALGOLIA_INDEX,
    },
  };

  // logic needed to prevent caching in homepage for zesty users
  if (req?.headers?.cookies?.include('APP_SID')) {
    data.zestyUser = true;
    // does not display with npm run dev
    res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
  } else {
    data.zestyUser = false;
    // does not display with npm run dev
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=3600',
    );
  }

  // its usage is for marketplace
  res.setHeader('set-cookie', `PRODUCTION=${process.env.PRODUCTION}`);
  // Pass data to the page via props
  return { props: { ...data } };
}
