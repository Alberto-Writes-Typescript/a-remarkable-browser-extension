import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic'
        }
      }
    }
  }),
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config, { configType }) => {
    /**
     * Disabling all node dependencies from `a-remarkable-js-sdk` that are not
     * available in the browser environment. The fallback makes webpacker ignore
     * those dependencies and not try to bundle them.
     */
    // @ts-ignore
    config.resolve.fallback = {
      https: false,
      fs: false
    }

    // Return the altered config
    return config;
  }
}

export default config
