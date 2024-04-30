import { colorScheme, getColorSchemeTemplate, chromaticParameters, size } from '@/storybook';
import { ref } from 'vue';
import { useVlossom } from '@/vlossom-framework';
import VsButton from '@/components/vs-button/VsButton.vue';
import VsModal from '@/components/vs-modal/VsModal.vue';
import VsForm from '@/components/vs-form/VsForm.vue';
import VsInput from '@/components/vs-input/VsInput.vue';
import VsDivider from '@/components/vs-divider/VsDivider.vue';

import type { ConfirmOptions } from '@/plugins';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta = {
    title: 'Plugins/Confirm',
    render: (args: any) => ({
        components: { VsButton, VsDivider },
        setup() {
            const $vs = useVlossom();
            const showResult = ref(false);
            const result = ref(false);

            async function confirm() {
                result.value = await $vs.confirm.open(args.text, {
                    okText: args.okText,
                    cancelText: args.cancelText,
                    size: args.size,
                    colorScheme: args.colorScheme,
                });
                showResult.value = true;
            }
            return { args, confirm, showResult, result };
        },
        template: `
			<div>
				<vs-button @click="confirm()"> Open Confirm </vs-button>
				<vs-divider />
				<div style="color: var(--vs-comp-font)">Result : <span v-if="showResult">{{ result }}</span> </div>
			</div>
		`,
    }),
    tags: ['autodocs'],
};

export default meta;
type OpenStory = StoryObj<{ text: string } | ConfirmOptions>;

export const Default: OpenStory = {
    args: {
        text: 'Are you sure?',
        okText: '',
        cancelText: '',
    },
    argTypes: {
        size,
        colorScheme,
    },
};

export const ColorScheme: OpenStory = {
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: `
			<div>
				${getColorSchemeTemplate(`
					<div>
						<vs-button color-scheme={{ color }} @click="$vs.confirm.open(args.text, {colorScheme: '{{ color }}'})" :style="{ marginBottom: '5px' }">
							Open Confirm ( {{'{{ color }}'.toUpperCase()}} )
						 </vs-button>
					</div>
				`)}
			</div>
			`,
    }),
    args: {
        text: 'Are you sure?',
        okText: '',
        cancelText: '',
    },
    argTypes: {
        size,
        colorScheme,
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const HtmlText: OpenStory = {
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: `
			<vs-button @click="$vs.confirm.open(args.text)"> Confirm </vs-button>
		`,
    }),
    args: {
        text: '<h1> Are you sure? </h1>',
        okText: '',
        cancelText: '',
    },
    argTypes: {
        size,
        colorScheme,
    },
};

export const NestedWithModal: OpenStory = {
    render: (args: any) => ({
        components: { VsButton, VsModal, VsForm, VsInput },
        setup() {
            const $vs = useVlossom();

            const isModalOpen = ref(false);
            const formRef = ref('formRef');
            const form = ref({ name: '', email: '' });

            const result = ref(false);

            function openModal() {
                isModalOpen.value = true;
                form.value = { name: '', email: '' };
            }

            function closeModal() {
                isModalOpen.value = false;
            }

            async function submit() {
                if (!(await (formRef.value as any)?.validate())) {
                    $vs.toast.warn('Invalid Form');
                    return;
                }

                if (!(await $vs.confirm.open(args.text))) {
                    return;
                }

                try {
                    setTimeout(() => {
                        $vs.toast.success('Request Success');
                    }, 500);
                    closeModal();
                } catch (error) {
                    $vs.toast.error(error as Error);
                }
            }

            return {
                args,
                isModalOpen,
                formRef,
                form,
                openModal,
                closeModal,
                submit,
                result,
            };
        },
        template: `
			<div>
				<vs-button @click="openModal()"> Open Modal </vs-button>
				<vs-modal v-model="isModalOpen" size="lg">
					<template #header>
						<div style="display:flex; justify-content: space-between">
							Modal
						</div>
					</template>
					<vs-form ref="formRef">
						<vs-input required v-model="form.name" label="Name" />
						<vs-input required v-model="form.email" label="Email" />
					</vs-form>
					<template #footer>
						<vs-button @click="submit()"> Submit </vs-button>
						<vs-button @click="closeModal()"> Cancel </vs-button>
					</template>
				</vs-modal>
			</div>
		`,
    }),
    args: {
        text: 'Are you sure?',
        okText: '',
        cancelText: '',
    },
    argTypes: {
        size,
        colorScheme,
    },
};

type PromptStory = StoryObj<{ text: string; confirmText: string }>;

export const Prompt: PromptStory = {
    render: (args: any) => ({
        components: { VsButton, VsDivider },
        setup() {
            const $vs = useVlossom();
            const showResult = ref(false);
            const result = ref(false);

            async function prompt() {
                result.value = await $vs.confirm.prompt(args.text, args.confirmText);
                showResult.value = true;
            }
            return { args, prompt, showResult, result };
        },
        template: `
			<vs-button @click="prompt()"> Open Prompt </vs-button>
			<vs-divider />
			<div style="color: var(--vs-comp-font)">Result : <span v-if="showResult">{{ result }}</span> </div>
		`,
    }),
    args: {
        text: "Type 'ABC'",
        confirmText: 'ABC',
    },
};
