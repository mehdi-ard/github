import evn from './env';

const common = {};

const development = {
  endPointAdmin: 'https://api.github.com'
};

const production = {
  endPointAdmin: 'https://api.github.com'
};

export default {
  ...common,
  ...evn(() => production, () => development)
};
