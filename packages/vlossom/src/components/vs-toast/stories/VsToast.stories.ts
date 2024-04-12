import { colorScheme, getColorSchemeTemplate, chromaticParameters, align } from '@/storybook';
import VsButton from '@/components/vs-button/VsButton.vue';

import type { ToastOptions } from '@/plugins';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta = {
    title: 'Plugins/Toast',
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: `
			<vs-button @click="$vs.toast.show(args.text,
			{
				autoClose: args.autoClose,
				timeout: args.timeout,
				placement: args.placement,
				align: args.align,
				colorScheme: args.colorScheme,
			})"
			>
				Show Toast
			</vs-button>
		`,
    }),
    tags: ['autodocs'],
    args: {
        text: 'This is Toast Message!',
    },
    argTypes: {
        autoClose: { control: 'boolean' },
        timeout: { control: 'number' },
        placement: {
            control: 'select',
            options: ['top', 'bottom'],
        },
        align,
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<{ text: string } | ToastOptions>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: `
			<div>
				${getColorSchemeTemplate(`
					<div>
						<vs-button color-scheme={{ color }} @click="$vs.toast.show(args.text, {colorScheme: '{{ color }}'})" :style="{ marginBottom: '5px' }">
							Show Toast ( {{'{{ color }}'.toUpperCase()}} )
						 </vs-button>
					</div>
				`)}
			</div>
			`,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const State: Story = {
    render: () => ({
        components: { VsButton },
        template: `
		<div>
			<vs-button color-scheme="green" @click="$vs.toast.success('This is Toast Message!')"> toast.success </vs-button>
			<vs-button color-scheme="light-blue" @click="$vs.toast.info('This is Toast Message!')"> toast.info </vs-button>
			<vs-button color-scheme="red" @click="$vs.toast.error('This is Toast Message!')"> toast.error </vs-button>
			<vs-button color-scheme="orange" @click="$vs.toast.warn('This is Toast Message!')"> toast.warn </vs-button>
		</div>
		`,
    }),
};

export const HtmlText: Story = {
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: `
			<vs-button @click="$vs.toast.show(args.text)">Show Toast</vs-button>
		`,
    }),
    args: {
        text: '<h1>This is Toast Message!😀</h1>',
    },
};

export const AutoClose: Story = {
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: `
			<vs-button @click="$vs.toast.show(args.text, { timeout: args.timeout })">Auto Closing Toast (after {{args.timeout}}ms)</vs-button>
			<vs-button @click="$vs.toast.show(args.text, { autoClose: false })">Manual Closing Show Toast</vs-button>
		`,
    }),
    args: {
        timeout: 1000,
    },
};

const TOAST_POSITION = ['top-start', 'top-center', 'top-end', 'bottom-start', 'bottom-center', 'bottom-end'];
function getPlacementTemplate() {
    return TOAST_POSITION.map((position) => {
        const [placement, alignedAt] = position.split('-');
        return `<vs-button @click="$vs.toast.show('This is Toast Message!', { placement: '${placement}', align: '${alignedAt}' })">
			${placement} ${alignedAt}
		</vs-button>`;
    }).join('\n');
}

export const Position: Story = {
    render: () => ({
        components: { VsButton },
        template: `${getPlacementTemplate()}`,
    }),
};
