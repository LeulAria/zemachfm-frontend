/* eslint-disable */
const webpacked = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

webpacked['i18n'] = {
  locales: ['en', 'am'],
  defaultLocale: 'en',
};
webpacked.images = {
  domains: ['zemachfm.com'],
}
webpacked.target = 'serverless';

module.exports = webpacked;
