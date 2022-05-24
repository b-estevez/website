import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as helper from 'utils';
import { Box, Link } from '@mui/material';

export const AccordionMui = ({ header, data }) => {
  const title = helper.generateHeader(header);
  const generateTitle = (title) => {
    if (title?.includes('Tool')) {
      return 'Tools and Resources';
    }
    return title;
  };
  const arr = helper.transformJson(data);
  const handleClick = (item) => {
    window.open(item.titleHref, '_self');
  };
  return (
    <div>
      <Typography
        variant="p"
        component="h1"
        sx={{ whiteSpace: 'nowrap', fontSize: '18px' }}
        paddingY={2}
        paddingX={2}
      >
        {/* <Box dangerouslySetInnerHTML={{ __html: title }}></Box> */}
        {generateTitle(title)}
      </Typography>
      {arr.map((item) => {
        return (
          <Accordion>
            <AccordionSummary
              expanded={!item.children}
              expandIcon={item?.children ? <ExpandMoreIcon /> : false}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => handleClick(item)}
            >
              <Link href={item.href} underline="none">
                {item.title}
              </Link>
            </AccordionSummary>
            <AccordionDetails>
              {item?.children?.map((e) => {
                return (
                  <Box>
                    <Link href={e.href} sx={{ fontSize: '14px' }}>
                      <Box
                        paddingY={0.5}
                        dangerouslySetInnerHTML={{ __html: e.name }}
                      ></Box>
                    </Link>
                  </Box>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};
