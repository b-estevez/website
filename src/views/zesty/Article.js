/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 *
 * Label: Articles
 * Name: articles
 * Model ZUID: 6-45a908-qfw88c
 * File Created On: Fri Mar 04 2022 12:16:05 GMT-0800 (Pacific Standard Time)
 *
 * Model Fields:
 *
  * hero_image (images)
 * article (wysiwyg_advanced)
 * title (text)
 * description (text)
 * author (one_to_one)
 * date (date)
 * tags (one_to_many)

 *
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 *
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 *
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-45a908-qfw88c
 *
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React from 'react';
import { Box, Table, useTheme } from '@mui/material';
import FillerContent from 'components/globals/FillerContent';
import {
  List,
  ListItem,
  Stack,
  ThemeProvider,
  Typography,
} from '@mui/material';
import MuiMarkdown from 'markdown-to-jsx';
import { useEffect, useState } from 'react';
import BlogHero from 'revamp/ui/BlogHero';
import revampTheme from 'theme/revampTheme';
import dayjs from 'dayjs';

function Article({ content }) {
  const [newContent, setNewContent] = useState(content.article);
  const { palette } = useTheme();
  // const simliarTags = content.tags && content.tags?.data[0]?.meta?.zuid;

  // const { data: latestArticles, isPending: latestPending } = useFetch(
  //   '/-/all-articles-hydrated.json?limit=5',
  //   content.zestyProductionMode,
  // );

  // const {
  //   data: tagArticles,
  //   //  isPending: tagsPending
  // } = useFetch(
  //   `/-/similar-articles.json?limit=4&tag=${simliarTags}`,
  //   content.zestyProductionMode,
  // );

  const removeErrorHandlingString = /Error hydrating/gi;
  let cleanOutErrorHydrating;

  // Check if "Error hydrating" is being injected and clean out
  // Skip if wysiwyg is empty to avoid error
  const validateWysiwyg = () => {
    if (newContent?.includes('Error hydrating')) {
      cleanOutErrorHydrating = content?.article.replaceAll(
        removeErrorHandlingString,
        '',
      );
      return cleanOutErrorHydrating;
    } else {
      return newContent;
    }
  };
  const authorImage =
    content.author?.data[0]?.headshot?.data[0]?.url || FillerContent.image;
  const authorName = content.author?.data[0]?.name || FillerContent.header;
  const authorDate =
    dayjs(content.date).format('MMM DD, YYYY') || FillerContent.date;

  useEffect(() => {
    function decode(str) {
      let txt = document.createElement('textarea');
      txt.innerHTML = str;
      return txt.value;
    }
    setNewContent(decode(newContent));
  }, []);

  return (
    <Box>
      <ThemeProvider theme={() => revampTheme(palette.mode)}>
        <Stack>
          <BlogHero
            author={authorName}
            authorImage={authorImage}
            heading={content?.title || FillerContent.header}
            overline={content.overline}
            supportingText={authorDate}
            articleImage={
              content.hero_image?.data
                ? content.hero_image.data[0].url
                : FillerContent.image
            }
          />
          <Stack
            sx={(theme) => ({
              mb: 6,
              [theme.breakpoints.up('lg')]: {
                width: '800px',
                mx: 'auto',
              },
            })}
          >
            <MuiMarkdown
              options={{
                overrides: {
                  strong: {
                    component: Typography,
                    props: {
                      component: 'strong',
                      sx: (theme) => ({
                        color:
                          theme.palette.mode === 'dark'
                            ? 'black'
                            : 'text.primary',
                        fontWeight: 700,
                      }),
                    },
                  },
                  p: {
                    component: Typography,
                    props: {
                      fontSize: '18px',
                      lineHeight: '28px',
                      color: 'text.secondary',
                      mt: '20px',
                      px: 2,
                      sx: (theme) => ({
                        '& iframe': {
                          width: '100%',
                          height: 'auto',
                        },
                        '& strong': {
                          color:
                            theme.palette.mode === 'dark'
                              ? 'white'
                              : 'text.primary',
                          fontWeight: 700,
                        },
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                      }),
                    },
                  },
                  h1: {
                    component: Typography,
                    props: {
                      component: 'h1',
                      variant: 'h1',
                      mt: 6,
                      color: 'text.primary',
                      fontWeight: 800,
                      px: 2,
                      letterSpacing: '-0.02em',
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                            width: '100%',
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                      }),
                    },
                  },
                  h2: {
                    component: Typography,
                    props: {
                      component: 'h2',
                      variant: 'h2',
                      mt: 6,
                      color: 'text.primary',
                      fontWeight: 800,
                      px: 2,
                      letterSpacing: '-0.02em',
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                            width: '100%',
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                      }),
                    },
                  },
                  h3: {
                    component: Typography,
                    props: {
                      component: 'h3',
                      variant: 'h3',
                      mt: 6,
                      color: 'text.primary',
                      fontWeight: 800,
                      px: 2,
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                            width: '100%',
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                      }),
                    },
                  },
                  h4: {
                    component: Typography,
                    props: {
                      component: 'h4',
                      variant: 'h4',
                      mt: '20px',
                      color: 'text.primary',
                      letterSpacing: '-0.02em',
                      px: 2,
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                            width: '100%',
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                      }),
                    },
                  },
                  h5: {
                    component: Typography,
                    props: {
                      component: 'h5',
                      variant: 'h5',
                      mt: '20px',
                      color: 'text.primary',
                      letterSpacing: '-0.02em',
                      px: 2,
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                            width: '100%',
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                      }),
                    },
                  },
                  h6: {
                    component: Typography,
                    props: {
                      component: 'h6',
                      variant: 'h6',
                      mt: '20px',
                      color: 'text.primary',
                      letterSpacing: '-0.02em',
                      px: 2,
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          '&:has(img)': {
                            mt: '0',
                            px: 0,
                            width: '100%',
                          },
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                      }),
                    },
                  },
                  img: {
                    props: {
                      style: {
                        marginTop: '48px',
                        maxWidth: '100%',
                        height: '100%',
                      },
                    },
                  },
                  ul: {
                    component: List,
                    props: {
                      sx: (theme) => ({
                        [theme.breakpoints.up('xs')]: {
                          color: 'text.secondary',
                          listStyleType: 'disc',
                          fontSize: '18px',
                          lineHeight: '28px',
                          fontWeight: 500,
                          pl: 2,
                          '& .MuiListItem-root': {
                            display: 'list-item',
                          },
                          mx: 2,
                        },
                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                          px: 0,
                        },
                      }),
                    },
                  },
                  li: {
                    component: ListItem,
                    props: {
                      p: 0,
                      sx: {
                        mx: 2,
                      },
                    },
                  },
                  blockquote: {
                    component: Stack,
                    props: {
                      px: 2,
                      sx: (theme) => ({
                        mt: '20px',
                        borderLeft: `4px solid ${theme.palette.primary.main}`,

                        [theme.breakpoints.up('tablet')]: {
                          width: '640px',
                          mx: 'auto',
                        },
                        '&:has(h4)': {
                          '& > h4': {
                            mt: 0,
                          },
                        },
                      }),
                    },
                  },
                  table: {
                    component: Table,
                    props: {
                      sx: (theme) => ({
                        overflowX: 'auto',
                        display: 'block',
                        height: 'auto !important',
                        width: '100% !important',
                        mt: '20px',
                        '& img, span': {
                          mt: '0px !important',
                          p: 1,
                          width: 'auto',
                        },

                        '& td': {
                          color:
                            theme.palette.mode === 'dark'
                              ? 'black'
                              : 'text.primary',
                        },
                      }),
                    },
                  },
                },
              }}
            >
              {validateWysiwyg() || FillerContent.rich_text}
            </MuiMarkdown>
          </Stack>
        </Stack>
      </ThemeProvider>
    </Box>
  );
}

export default Article;
