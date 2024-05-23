import { Ref, ref } from 'vue';
import { CssPosition, Placement, VsLayoutProvide } from '@/declaration';

export function useLayout() {
    const isNavOpen = ref(false);
    const header: Ref<{ position: CssPosition; height: string }> = ref({ position: 'relative', height: '' });
    const footer: Ref<{ position: CssPosition; height: string }> = ref({ position: 'relative', height: '' });
    const drawer: Ref<{ placement: Placement; size: string }> = ref({ placement: 'left', size: '' });

    function toggleNav() {
        isNavOpen.value = !isNavOpen.value;
    }

    function setHeaderLayout(position: CssPosition, height: string) {
        header.value = { position, height };
    }

    function setFooterLayout(position: CssPosition, height: string) {
        footer.value = { position, height };
    }

    function setDrawerLayout(placement: Placement, size: string) {
        drawer.value = { placement, size };
    }

    function getDefaultLayoutProvide(): VsLayoutProvide {
        return {
            isNavOpen,
            header,
            footer,
            drawer,
            toggleNav,
            setHeaderLayout,
            setFooterLayout,
            setDrawerLayout,
        };
    }

    return {
        isNavOpen,
        header,
        footer,
        drawer,
        toggleNav,
        setHeaderLayout,
        setFooterLayout,
        setDrawerLayout,
        getDefaultLayoutProvide,
    };
}
