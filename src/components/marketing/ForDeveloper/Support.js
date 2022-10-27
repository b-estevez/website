/**
 * MUI Imports
 */
import { Box, Typography } from '@mui/material';

/**
 * Components Imports
 */
import Container from 'blocks/container/Container';
import MuiMarkdown from 'mui-markdown';

const Support = ({ theme, eyebrow, titleAndDescription, isSmall, isLarge }) => {
  return (
    <Box component="section">
      <Container sx={isSmall ? { p: 0 } : { py: 7 }}>
        <Box
          sx={{
            background: theme.palette.zesty.zestyDarkBlue,
            borderRadius: isSmall ? 0 : 5,
            p: isSmall ? 4 : 17,
            py: isSmall ? 10 : 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: isLarge ? 'column' : 'row',
            gap: 2,
            boxShadow: '4px 4px 31px rgba(73, 73, 73, 0.64)',
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h3"
              sx={{
                color: theme.palette.zesty.zestyWhite,
                fontWeight: 'bold',
              }}
            >
              {eyebrow}
            </Typography>

            <MuiMarkdown
              overrides={{
                h2: {
                  component: Typography,
                  props: {
                    component: 'h2',
                    variant: 'h3',
                    sx: {
                      color: theme.palette.zesty.zestyOrange,
                      fontWeight: 800,
                      mt: 2,
                    },
                  },
                },
                p: {
                  component: Typography,
                  props: {
                    component: 'p',
                    variant: 'h6',
                    sx: {
                      color: theme.palette.zesty.zestyWhite,
                      mt: 5,
                    },
                  },
                },
                span: {
                  component: Typography,
                  props: {
                    component: 'span',
                    variant: 'h6',
                    sx: {
                      color: theme.palette.zesty.zestyWhite,
                      mt: 5,
                    },
                  },
                },
                ul: {
                  component: Typography,
                  props: {
                    component: 'ul',
                    sx: {
                      mt: 5,
                      paddingInlineStart: 0,
                    },
                  },
                },
                li: {
                  component: Typography,
                  props: {
                    component: 'li',
                    sx: {
                      listStyle: 'none !important',
                      mb: 3,
                      '&:before': {
                        content: `"✓"`,
                        color: theme.palette.zesty.zestyOrange,
                        fontWeight: 800,
                        mr: 2,
                      },
                    },
                  },
                },
              }}
            >
              {titleAndDescription}
            </MuiMarkdown>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Support;
