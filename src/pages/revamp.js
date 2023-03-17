import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from '@mui/material';
import React, { useState } from 'react';
import Hero from 'revamp/ui/Hero';
import BlackHero from 'revamp/ui/BlackHero';
import Stats from 'revamp/ui/Stats';
import SingleTestimonial from 'revamp/ui/SingleTestimonial';
import revampTheme from 'theme/revampTheme';

const components = ['Hero', 'Black Hero', 'Stats', 'Single Testimonial'];
const revamp = () => {
  const [component, setComponent] = useState('');

  const renderComponent = () => {
    if (component === 'Hero') return <Hero />;
    if (component === 'Black Hero') return <BlackHero />;
    if (component === 'Stats') return <Stats />;
    if (component === 'Single Testimonial') return <SingleTestimonial />;

    return 'Please select a component';
  };

  return (
    <ThemeProvider theme={() => revampTheme('light')}>
      {renderComponent()}

      <FormControl fullWidth sx={{ mt: 4 }}>
        <InputLabel>Component</InputLabel>
        <Select
          value={component}
          label="Component"
          onChange={(e) => setComponent(e.target.value)}
        >
          {components.map((c, index) => (
            <MenuItem key={index} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default revamp;
