/**
 * MUI Imports
 */
import { Box, Card, Container, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
/**
 * Helpers Imports
 */
import * as helper from 'utils';
import FillerContent from 'components/globals/FillerContent';

/**
 * Local assets
 */
import chevronLeft from '../../../../public/assets/images/chevron-left.svg';
import zesty from '../../../../public/assets/images/zesty.svg';

/**
 *
 * @param {array} data - array items that is needed to loop through cards
 * @returns
 */

const Features = ({
  data,
  features_header,
  header_size = 48,
  feature_description,
  textHighlight = 'Zesty',
  background = '',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDarkMode = theme.palette.mode === 'dark';

  const bracketImg = chevronLeft.src || FillerContent.dashboard_image;
  const zestyImg = zesty.src || FillerContent.dashboard_image;
  return (
    <Box
      component="section"
      paddingBottom={isMobile ? 20 : 20}
      sx={{
        position: 'relative',
        zIndex: '500',
        background: isDarkMode
          ? theme.palette.zesty.zestyDarkBlue
          : theme.palette.common.white,
      }}
    >
      <Box
        sx={{
          zIndex: '10',
          position: 'absolute',
          left: 0,
          bottom: 0,
          display: isMobile ? 'none' : 'flex',
        }}
      >
        {background === 'chevron' && (
          <Box component="img" src={bracketImg} alt="bg" />
        )}
      </Box>
      <Box
        sx={{
          zIndex: '10',
          position: 'absolute',
          left: 0,
          bottom: 0,
          display: isMobile ? 'none' : 'flex',
          width: '100%',
        }}
      >
        {background === 'zesty' && (
          <Box
            component="img"
            sx={{ width: '100%', maxWidth: 1920 }}
            src={zestyImg}
            alt="bg"
          />
        )}
      </Box>
      <Container>
        <Box sx={{ py: 10 }}>
          <Typography
            component={'h2'}
            variant={'p'}
            sx={{
              lineHeight: 1,
              color: isDarkMode
                ? theme.palette.common.white
                : theme.palette.zesty.zestyZambezi,
              textAlign: 'center',
              fontSize: isMobile ? '24px' : header_size,
            }}
            dangerouslySetInnerHTML={{
              __html: helper.strColorChanger(
                features_header || FillerContent.header,
                textHighlight,
                theme.palette.zesty.zestyOrange,
              ),
            }}
          />
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mt: 2,
              textAlign: 'center',
              color: isDarkMode
                ? theme.palette.zesty.zestyDarkBlue
                : theme.palette.zesty.zestyZambezi,
            }}
          >
            {feature_description || ''}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyItems: 'center',
            justifyContent: 'center',
            gap: '4rem',
            position: 'relative',
            zIndex: '1000',
          }}
        >
          {data.map((e, i) => {
            return (
              <div key={i}>
                <Card
                  sx={{
                    width: '20rem',
                    minHeight: 320,
                    padding: '3rem 2rem',
                    background: theme.palette.common.white,
                    py: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ minHeight: 200, height: '100%' }}>
                    <img src={e?.icon_image} alt="" />
                    <Typography
                      component={'p'}
                      variant={'p'}
                      sx={{
                        py: 2,
                        color: theme.palette.zesty.zestyOrange,
                        textAlign: 'left',
                        fontSize: '20px',
                      }}
                    >
                      {e?.feature_name}
                    </Typography>
                    <Typography
                      component={'h2'}
                      variant={'p'}
                      sx={{
                        color: isDarkMode
                          ? theme.palette.zesty.zestyDarkBlue
                          : theme.palette.secondary.darkCharcoal,
                        textAlign: 'left',
                        fontSize: '16px',
                        fontWeight: 'light',
                      }}
                    >
                      {e?.content}
                    </Typography>
                  </Box>
                </Card>
              </div>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
