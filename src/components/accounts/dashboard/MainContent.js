import { Timeline } from '@mui/lab';
import { Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useZestyStore } from 'store';
import ZInstanceItem from './ui/ZInstanceItem';
import ZMyCard from './ui/ZMyCard';
import ZTimelineItem from './ui/ZTimelineItem';
import * as helpers from 'utils';

const marketingCards = [
  {
    title: 'Mindshare Article',
    desc: 'meta description from content item',
  },
  {
    title: 'Marketer CTA',
    desc: 'marketer blurb from the marketer CTA schema content so team can update content.',
  },
  {
    title: 'Release Notes',
    desc: 'Latest Release notes highlights or Meta description from instance content item',
  },
];

const MainContent = ({
  initialInstanceZUID,
  initialInstanceName,
  instances,
  isInstancesLoading,
}) => {
  const theme = useTheme();
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const router = useRouter();
  const { userInfo, ZestyAPI } = useZestyStore((state) => state);
  const [instanceAudit, setInstanceAudit] = useState([]);
  const [isInstanceAuditLoading, setIsInstanceAuditLoading] = useState(false);
  const [instancesFavorites, setInstancesFavorites] = useState([]);

  const toggleFavorites = async (zuid) => {
    const isExisting = instancesFavorites?.find((e) => e === zuid);
    const favoritesSites = [...instancesFavorites, zuid];
    const filteredFavorites = instancesFavorites?.filter((e) => e !== zuid);
    const prefs = JSON.parse(userInfo.prefs);
    prefs.favorite_sites = !isExisting ? favoritesSites : filteredFavorites;
    const body = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      prefs: JSON.stringify(prefs),
    };
    const res = await ZestyAPI.updateUser(userInfo.ZUID, body, '');
    setInstancesFavorites(JSON.parse(res?.data?.prefs)?.favorite_sites);
  };

  useEffect(() => {
    const getAudit = async () => {
      if (typeof ZestyAPI?.getInstanceAuditInitZUID === 'function') {
        setIsInstanceAuditLoading(true);
        const response = await ZestyAPI.getInstanceAuditInitZUID(
          20,
          initialInstanceZUID,
        );

        if (!response?.error) setInstanceAudit(response?.data);

        setIsInstanceAuditLoading(false);
      }
    };

    if (router.isReady) getAudit();
  }, [initialInstanceZUID, router.isReady]);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      setInstancesFavorites(JSON.parse(userInfo?.prefs)?.favorite_sites);
    }
  }, [userInfo]);

  return (
    <>
      <Typography variant="h6" my={2}>
        Activity Stream
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={9}>
          <Grid container spacing={{ xs: 2, xl: 4 }}>
            {isInstancesLoading
              ? [...new Array(3)].map((i) => (
                  <Grid key={i} item xs={12} md={4}>
                    <ZInstanceItem isLoading={isInstancesLoading} />
                  </Grid>
                ))
              : instances?.slice(0, 3)?.map((instance, index) => (
                  <Grid key={index} item xs={12} md={4}>
                    <ZInstanceItem
                      isLoading={isInstancesLoading}
                      image={instance?.screenshotURL}
                      title={instance?.name}
                      zuidLink={`/instances/${instance.ZUID}`}
                      previewLink={`https://${instance?.randomHashID}-dev${
                        helpers?.isProd
                          ? '.webengine.zesty.io'
                          : '.preview.dev.zesty.io'
                      }`}
                      isFavorite={instancesFavorites?.find(
                        (c) => c === instance.ZUID,
                      )}
                      toggleFavorites={() => toggleFavorites(instance.ZUID)}
                    />
                  </Grid>
                ))}
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Timeline sx={{ p: 0 }}>
            {isInstanceAuditLoading
              ? [...new Array(5)].map((i) => (
                  <ZTimelineItem
                    sx={{
                      '::before': {
                        content: 'none',
                      },
                      mt: 1,
                    }}
                    key={i}
                    isLoading={isInstanceAuditLoading}
                  />
                ))
              : instanceAudit?.map((audit, index) => (
                  <ZTimelineItem
                    sx={{
                      '::before': {
                        content: 'none',
                      },
                      mt: 1,
                    }}
                    key={index}
                    title={`${dayjs().diff(
                      dayjs(audit?.updatedAt),
                      'day',
                    )} days ago`}
                    isLoading={isInstanceAuditLoading}
                  >
                    <Stack
                      sx={{ border: `1px solid ${grey[400]}`, p: 2 }}
                      component={Paper}
                      elevation={0}
                      direction={{ xs: 'column', lg: 'row' }}
                      justifyContent="space-between"
                    >
                      <Stack>
                        <Typography>{initialInstanceName}</Typography>
                        <Typography
                          variant="body2"
                          sx={{ wordBreak: 'break-word' }}
                        >
                          {audit.meta.message}
                        </Typography>
                      </Stack>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        mt={{ xs: 1 }}
                      >
                        {audit.meta.url && (
                          <Button
                            href={audit.meta.url}
                            size="small"
                            variant="contained"
                            color="primary"
                            sx={{
                              whiteSpace: {
                                md: 'nowrap',
                              },
                            }}
                          >
                            Open Resource
                          </Button>
                        )}

                        <Button
                          href={`/instances/${audit.entityZUID}`}
                          size="small"
                          variant="outlined"
                          color="primary"
                          sx={{
                            whiteSpace: {
                              md: 'nowrap',
                            },
                          }}
                        >
                          Edit Instance
                        </Button>
                      </Stack>
                    </Stack>
                  </ZTimelineItem>
                ))}
          </Timeline>
        </Grid>

        {isLG && (
          <Grid item lg={3}>
            {marketingCards?.map((card, index) => (
              <ZMyCard
                key={index}
                title={card.title}
                description={card.desc}
                sx={{ border: `1px solid ${grey[400]}`, p: 2 }}
                component={Paper}
                spacing={2}
                mb={4}
              >
                <Button variant="contained" color="primary">
                  Read Article
                </Button>
              </ZMyCard>
            ))}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default MainContent;
