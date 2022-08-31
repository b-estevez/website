import AppBar from 'components/console/AppBar';
import Main from 'layouts/Main/Main';
import React from 'react';
import { Container } from '@mui/material';
import { InstancesApp } from './InstancesApp';
import { getCookie } from 'cookies-next';

const InstanceContainer = ({ children, isDashboard = false }) => {
  const isAuthenticated = getCookie('isAuthenticated');

  const renderChildren = () => {
    if (isAuthenticated) {
      if (isDashboard) {
        return children;
      } else {
        return <InstancesApp>{children}</InstancesApp>;
      }
    } else {
      window.location.replace('/login');
    }
  };

  return (
    <Main>
      <AppBar />
      <Container
        maxWidth={false}
        disableGutters
        sx={(theme) => ({
          maxWidth: theme.breakpoints.values.xl2,
        })}
      >
        {renderChildren()}
      </Container>
    </Main>
  );
};

export default InstanceContainer;
