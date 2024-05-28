import { Ref, ref } from 'vue';
import { BarLayout, DrawerLayout, VsLayoutProvide } from '@/declaration';

export function useLayout() {
    const header: Ref<BarLayout> = ref({ position: 'relative', height: '' });
    const footer: Ref<BarLayout> = ref({ position: 'relative', height: '' });
    const drawer: Ref<DrawerLayout> = ref({ drawerOpen: false, placement: 'left', size: '' });

    function setHeaderLayout(headerLayout: BarLayout) {
        header.value = headerLayout;
    }

    function setFooterLayout(footerLayout: BarLayout) {
        footer.value = footerLayout;
    }

    function setDrawerLayout(drawerLayout: DrawerLayout) {
        drawer.value = drawerLayout;
    }

    function getDefaultLayoutProvide(): VsLayoutProvide {
        return {
            header,
            footer,
            drawer,
            setHeaderLayout,
            setFooterLayout,
            setDrawerLayout,
        };
    }

    return {
        header,
        footer,
        drawer,
        setHeaderLayout,
        setFooterLayout,
        setDrawerLayout,
        getDefaultLayoutProvide,
    };
}
