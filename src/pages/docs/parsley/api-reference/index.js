import React, { useEffect } from 'react';
import MuiMarkdown from 'markdown-to-jsx';
import MainWrapper from 'layouts/Main';
import axios from 'axios';
import { useState } from 'react';
import { Stack } from '@mui/material';
import MarkdownIt from 'markdown-it';
import { DocsSidebar } from 'components/docs/DocsSidebar';

const muiContentOverrides = {
  h1: {
    component: 'h1',
    props: {
      style: { fontSize: '24px' },
    },
  },
  h2: {
    component: 'h2',
    props: {
      style: { fontSize: '1.5em' },
    },
  },
  p: {
    component: 'p',
    props: {
      style: { fontSize: '24px' },
    },
  },

  img: {
    component: 'img',
    props: {
      style: { width: '80%', margin: '10px 10%' },
    },
  },
};

const fetchMarkdownFile = async () => {
  const response = await axios.get(
    `https://raw.githubusercontent.com/zesty-io/zesty-org/master/services/web-engine/introduction-to-parsley/parsley-index.md`,
  );
  return response.data;
};

const parseMarkdownFile = (markdown, setmdData, setnavData) => {
  const md = new MarkdownIt();
  const newMarkdown = [];
  const collection = [];

  const tokens = md.parse(markdown);

  let headingText;
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'heading_open' && tokens[i].tag === 'h2') {
      headingText = tokens[i + 1]?.content?.trim();
      if (
        headingText ===
        'description: This index collects all Parsley syntax and methods.'
      ) {
        continue;
      }
      const id = headingText
        ?.replace(/[^\w\s]/gi, '')
        ?.replace(/\s+/g, '-')
        ?.toLowerCase();

      newMarkdown.push(
        `<${tokens[i].tag} id="${id}" style="color:#3B454E" >${headingText} <a href="#${id}" className="heading-link">#</a></${tokens[i].tag}>`,
      );

      collection.push({
        value: id,
        label: headingText,
      });
    } else {
      // remove redundant h2
      const res = collection.find((e) => e.label === tokens[i].content);
      if (tokens[i].content === 'Parsley Index') {
        newMarkdown.push(`<h1 style="color:#3B454E">${tokens[i].content}</h1>`);
      } else if (tokens[i].content !== headingText && !res) {
        const renderedToken = md.renderer.render([tokens[i]], md.options, {});
        const res = renderedToken
          .replaceAll('</h2>', '')
          .replaceAll('<hr>', '');
        newMarkdown.push(res);
      }
    }
  }

  setmdData(newMarkdown.join(''));
  setnavData(
    collection.map((e) => {
      return { ...e, label: e.label.replace(/\\/g, '/').replaceAll('/', '') };
    }),
  );
  return newMarkdown.join('');
};

const index = () => {
  const [search, setsearch] = useState('');
  const [navData, setnavData] = useState([]);
  const [mdData, setmdData] = useState('');

  const getMd = async () => {
    const markdown = await fetchMarkdownFile();
    parseMarkdownFile(markdown, setmdData, setnavData);
  };

  const newNavData = navData?.filter((e) =>
    e.label.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    getMd();
  }, []);

  return (
    <MainWrapper>
      <Stack direction={'row'}>
        {/* SIDEBAR */}
        <DocsSidebar
          setsearch={setsearch}
          data={newNavData}
          onClick={undefined}
        />
        {/* MAIN PAGE */}
        <Stack pl={10} sx={{ maxWidth: '70vw' }}>
          <MuiMarkdown overrides={muiContentOverrides}>{mdData}</MuiMarkdown>
        </Stack>
      </Stack>
    </MainWrapper>
  );
};

export default index;
