import { getCookie } from 'cookies-next';

export const langTransformer = ({ data = {}, lang = 'fetch' }) => {
  const hasFormData = data?.request?.body?.mode === 'formdata' ? true : false;
  const hasToken = data?.request?.auth?.type === 'bearer' ? true : false;

  const headers = [
    {
      key: 'Content-Type',
      value: 'application/json',
    },
  ];

  hasToken &&
    headers.push({
      key: 'Authorization',
      value: `Bearer ${getCookie('APP_SID') || 'YOUR_API_KEY'}`,
    });

  const responseData = data.response ? `${data?.response[0]?.body}` : `{}`;

  const langSwitcher = (lang) => {
    switch (lang) {
      case 'Javascript Fetch':
        return fetchRequest;
      default:
        return fetchRequest;
    }
  };

  console.log(data, 343434);
  const getBody = (data) => {
    switch (data?.request?.body?.mode) {
      case 'formdata':
        return `
  const body = new FormData();
  ${
    hasFormData
      ? data.request.body.formdata
          .map((e) => {
            return `body.append('${e.key}', '${e.value}')\n`;
          })
          .join('  ')
      : ''
  }
      `;
      case 'raw':
        return `const body = ${data?.request?.body?.raw}`;
      default:
        return ``;
    }
  };
  const fetchRequest = `
  const request = async () => {
  const endpoint = '${data.request.url.raw}'
  ${getBody(data)}
  const res = await fetch(endpoint, {
    method: '${data.request.method}',
    headers: {
      ${headers
        .map((e) => {
          return `${e.key} : '${e.value}'\n`;
        })
        .join('      ')}
    },
    ${data.request.body ? 'body: JSON.stringify(body)' : '\0'}
  })
  const data = await res.json();
  return data;
}
  `;

  return { request: langSwitcher(lang), response: responseData };
};

// todo convert to recursive FN //
export const transFormMainData = (mainCollection) => {
  mainCollection = mainCollection.map((e) => {
    return {
      ...e,
      parent: `/${e?.info?.name?.split(' ')[0]?.toLowerCase()}`,
      url: `/${e?.info?.name?.split(' ')[0]?.toLowerCase()}`,
    };
  });

  // const test2 = (data, parent = null, base = null) => { (data?.item || data)?.forEach((e) => {
  //     if (e.request && e.name) {
  //       return (e['testt'] = `${}${parent}/#${e.name}`);
  //     } else if (e.item || e.name) {
  //       e['testt'] = `${parent}${e.name}`;
  //       return test2(e.item, e.name, data.name);
  //     } else if (e.name) {
  //     }
  //   });
  // };
  // console.log(test2(mainCollection, null, null), 77777777);

  // console.log(mainCollection, 7777);
  const newCollection = mainCollection?.map((e) => {
    const res = e.item.map((q) => {
      if (q.request) {
        return {
          ...q,
          parent: e.parent || e.name,
          url: e.parent + '/#' + q.name.replaceAll(' ', '-'),
        };
      }

      return { ...q, parent: e.parent || e.name, url: e.parent + q.name };
    });
    return { ...e, item: res };
  });

  const newColletion1 = newCollection.map((e) => {
    const res = e.item.map((q) => {
      const res2 = q?.item?.map((w) => {
        if (w.request) {
          return {
            ...w,
            parent: q.name,
            url: `${e.parent}${q.name}/#${w.name.replaceAll(' ', '-')}`,
          };
        }
        return { ...w, parent: q.name, url: e.parent + w.name };
      });
      return { ...q, item: res2 };
    });
    return { ...e, item: res };
  });

  const result = newColletion1.map((e) => {
    const res = e.item.map((q) => {
      const res2 = q?.item?.map((w) => {
        const res3 = w?.item?.map((y) => {
          return {
            ...y,
            parent: w?.name,
            url: e.parent + `${w.name}/#${y.name.replaceAll(' ', '-')}`,
          };
        });
        return { ...w, item: res3 };
      });
      return { ...q, item: res2 };
    });
    return { ...e, item: res };
  });
  return result;
};
