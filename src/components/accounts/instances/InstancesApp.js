import React from 'react';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  lighten,
  Tabs,
  Tab,
  Container,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useZestyStore } from 'store';
import InstanceHeader from 'components/accounts/instances/InstanceHeader';
import { instanceTabs } from 'components/accounts/instances/tabs';
import { lang } from 'components/accounts/instances/lang';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

let capitalize = (s) => (s = s.charAt(0).toUpperCase() + s.slice(1));

const Index = ({ children }) => {
  const theme = useTheme();
  const isLG = useMediaQuery(theme.breakpoints.up('md'));
  const langcode = 'en';
  const currentPage =
    location.pathname.split('/').length > 2
      ? location.pathname.split('/')[3]
      : '';
  const [tabValue, setTabValue] = React.useState(currentPage);
  const router = useRouter();
  const { ZestyAPI, instance, setInstance } = useZestyStore((state) => state);
  const { zuid } = router.query;

  const handleChange = (newValue) => {
    setTabValue(newValue);
    //this will avoid error in the console
    if (newValue) {
      router.push({
        pathname: `/instances/[zuid]/${newValue}/`,
        query: { zuid },
      });
    } else {
      router.push({
        pathname: `/instances/[zuid]`,
        query: { zuid },
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    handleChange(newValue);
  };

  const getInstance = async () => {
    const res = await ZestyAPI.getInstance(zuid);
    setInstance(res.data);
  };

  React.useEffect(() => {
    if (router.isReady) getInstance();
  }, [router.isReady]);

  React.useEffect(() => {
    document.title =
      instance.name + ` Instance - ${currentPage} - Zesty.io Console`;
  }, [instance, currentPage]);

  return (
    <Box>
      {isLG ? (
        <Grid container>
          <Grid
            item
            md={3}
            lg={2}
            sx={{
              // borderRight: `1px solid ${grey[300]}`,
              maxWidth: { md: '384px' },
              position: 'sticky',
              top: '60px',
              height: `calc(100vh - 46px)`,
              overflow: 'auto',
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <InstanceHeader instance={instance} />
            <InstanceNavigation
              lists={instanceTabs}
              handleChange={handleChange}
              currentPage={currentPage}
              langcode={langcode}
            />
          </Grid>
          <Grid item md={9} lg={10}>
            {/* <Container maxWidth={false}>
              <Typography py={2} variant="h5" color="text.secondary">
                {currentPage ? capitalize(currentPage) : 'Overview'}
              </Typography>
            </Container>
            <Divider sx={{ mb: 2 }} /> */}
            <Box>{children}</Box>
          </Grid>
        </Grid>
      ) : (
        <Container>
          <InstanceHeader instance={instance} />
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="icon position tabs example"
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '.MuiTabs-scrollButtons.Mui-disabled': {
                opacity: 0.3,
              },
              mb: 2,
            }}
          >
            {instanceTabs
              .sort((a, b) => a.sort - b.sort)
              .map((tab) => (
                <Tab
                  icon={tab.icon}
                  value={tab.filename}
                  iconPosition="start"
                  label={lang[langcode].tabs[tab.filename]}
                />
              ))}
          </Tabs>
          {children}
        </Container>
      )}
    </Box>
  );
};

function InstanceNavigation({ lists, handleChange, currentPage, langcode }) {
  return (
    <Box px={1} py={1} pb={5}>
      <List>
        {lists.map((list, index) => (
          <ListItem
            key={index}
            onClick={() => handleChange(list.filename)}
            disablePadding
            selected={list.filename === currentPage}
            sx={(theme) => ({
              borderRadius: '5px',
              color: theme.palette.text.secondary,
              '&.Mui-selected': {
                ' .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
                bgcolor: lighten(theme.palette.primary.light, 0.9),
                pointerEvents: 'none',
                color: theme.palette.primary.main,
              },
            })}
          >
            <ListItemButton color="warning" sx={{ borderRadius: '5px' }}>
              <ListItemIcon sx={{ minWidth: 40 }}>{list.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    {lang[langcode].tabs[list.filename]}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
export const InstancesApp = React.memo(Index);
