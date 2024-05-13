import VsButton from '@/components/vs-button/VsButton.vue';

export const ModalCloseButton = {
    components: { VsButton },
    template: `
        <vs-button>Close</vs-button>
    `,
};

export const containerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    border: '1px solid rgb(240, 240, 240)',
    borderRadius: '4px',
    color: 'var(--vs-comp-font)',
    height: '800px',
    overflow: 'hidden',
    position: 'relative',
    padding: '2rem',
    width: '600px',
};
