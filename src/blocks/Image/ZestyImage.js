import FillerContent from 'components/globals/FillerContent';

/**
 *
 * @param {string} src - (required!) remote url of the image
 * @param {string} alt - (required!) alternative text of the image
 * @param {object} options - (required!) pass optimization options as key values pairs, see parameters options here -> https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation#auto-optimize-image-jpg-auto
 * @param {object} style - (optional) custom inline css style
 * @param {string} loading - {optional} options - lazy | eager
 * @param {object} attributes - (optional) any custom attributes you want to pass must be in key value pairs

 * @returns react <img/> component
 */

const ZestyImage = ({ options, src, alt, loading, style, attributes }) => {
  /* Taking the options object and converting it into a query string. */
  const imageUrl = Object.entries(options).reduce(
    (acc, item, idx) => {
      const newUrl = `${acc}${idx === 0 ? '?' : '&'}${item[0]}=${item[1]}`;
      return newUrl;
    },
    src ? src : FillerContent.photos[0].src,
  );

  return (
    <img
      width={options.width}
      height={options.height}
      {...attributes}
      src={imageUrl}
      alt={alt}
      loading={loading}
      style={style}
    />
  );
};

export default ZestyImage;
