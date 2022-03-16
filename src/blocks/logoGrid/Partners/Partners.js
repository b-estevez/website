import React from 'react';
import Box from '@mui/material/Box';



const Partners = ({logoPartners}) => {
console.log("🚀 ~ file: Partners.js ~ line 7 ~ Partners ~ logoPartners", logoPartners)

  return (
    <Box display="flex" flexWrap="wrap" justifyContent={'center'}>
      {logoPartners.map((item, i) => (
        <Box
          maxWidth={{ xs: 80, sm: 90 }}
          marginTop={{ xs: 1 }}
          marginRight={{ xs: 3, sm: 6, md: 12 }}
          key={i}
        >
          <Box
            component="img"
            height={1}
            width={1}
            src={item?.url}
            alt={item.zuid}

          />
        </Box>
      ))}
    </Box>
  );
};

export default Partners;
