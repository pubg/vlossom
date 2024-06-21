import { getStoryContext } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';

import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
    async preVisit(page) {
        await injectAxe(page);
    },
    async postVisit(page, context) {
        const storyContext = await getStoryContext(page, context);

        if (!storyContext.parameters?.a11y?.disable) {
            await checkA11y(page, '#storybook-root', {
                detailedReport: true,
                detailedReportOptions: {
                    html: true,
                },
                axeOptions: {
                    rules: {
                        'color-contrast': { enabled: false },
                        label: { enabled: false },
                    },
                },
            });
        }
    },
};

module.exports = config;
