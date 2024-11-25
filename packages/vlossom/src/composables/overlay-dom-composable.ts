import { onBeforeMount } from 'vue';

export function useOverlayDom() {
    onBeforeMount(() => {
        if (document.getElementById('vs-overlay')) {
            return;
        }
        const overlay = document.createElement('div');
        overlay.setAttribute('id', 'vs-overlay');

        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.zIndex = '10000';

        document.body.appendChild(overlay);
    });
}
