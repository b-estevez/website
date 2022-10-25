import React from 'react';
import { ComingSoon } from 'components/accounts';

export { default as getServerSideProps } from 'lib/protectedRouteGetServerSideProps';

export default function Support() {
  return <ComingSoon />;
}

Support.data = {
  container: 'InstanceContainer',
};
