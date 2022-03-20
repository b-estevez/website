import React from 'react';

import { fetchPage } from '../lib/api';
import { ZestyView } from '../lib/ZestyView';
import Main from '../layouts/Main';

export default function Slug(props) {
  return (
    <Main model={props.meta.model_alternate_name} customRouting={props.navigationCustom } url={props.meta.web.uri}>
        <ZestyView content={props} />
    </Main>
  );
}

// This gets called on every request
export async function getServerSideProps(ctx) {

  const data = await fetchPage(ctx.resolvedUrl);

  // generate a status 404 page
  if (data.error) return { notFound: true }

  // Pass data to the page via props
  return { props: data };
}
