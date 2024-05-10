import { defineComponent } from 'vue';
import VsButton from '@/components/vs-button/VsButton.vue';

export const ModalCloseButton = defineComponent({
    components: { VsButton },
    template: `
        <vs-button>Close</vs-button>
    `,
});
