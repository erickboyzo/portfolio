const deviconMap = {
  html: 'html5',
  angular: 'angularjs',
  scss: 'sass',
  'node.js': 'nodejs',
  vue: 'vuejs',
  vite: 'vitejs',
};

const ommitColorFrom = ['github'];
const useOriginal = ['express'];
const waterMarkType = ['less'];

const filters = {
  deviconIcon: (value: string) => {
    if (!value) return value;

    const formattedValue = value.replace(/\s/g, '')
      .toLowerCase();
    const mapped = deviconMap[formattedValue] ?? formattedValue;

    let type = 'plain';
    if (useOriginal.includes(mapped)) {
      type = 'original';
    } else if (waterMarkType.includes(mapped)) {
      type = 'plain-wordmark';
    }
    return `devicon-${mapped}-${type} ${ommitColorFrom.includes(mapped) ? '' : 'colored'}`;
  },
  replacePlaceHolder: (value, inputValue) => {
    if (!value || !inputValue) return value;
    const regex = /{}/g;
    return value.replace(regex, inputValue);
  },
  formatName: (value) => {
    if (!value) return value;
    return value.replace(/-/g, ' ');
  },
};
export default filters;
