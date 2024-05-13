import { defineComponent, ref } from 'vue';
import VsButton from '@/components/vs-button/VsButton.vue';

export const CompA = defineComponent({
    components: { VsButton },
    template: `
        <p>Component: A</p>
        <span>count: {{ count }}</span>
        <vs-button :style="{ width: '10px', marginLeft: '10px', marginTop: '10px'}" @click="count++">+</vs-button>`,
    data() {
        const count = ref(0);
        return { count };
    },
});
