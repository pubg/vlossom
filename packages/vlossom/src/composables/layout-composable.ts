import { Ref, ref } from 'vue';
import { BarLayout, DrawerLayout, VsLayoutProvide } from '@/declaration';
import { utils } from '@/utils';

export function useLayout() {
    const header: Ref<BarLayout> = ref({ position: 'relative', height: '' });
    const footer: Ref<BarLayout> = ref({ position: 'relative', height: '' });
    const drawer: Ref<DrawerLayout> = ref({ drawerOpen: false, placement: 'left', size: '' });

    function setHeaderLayout(headerLayout: BarLayout) {
        if (utils.object.isEqual(headerLayout, header.value)) {
            return;
        }
        header.value = headerLayout;
    }

    function setFooterLayout(footerLayout: BarLayout) {
        if (utils.object.isEqual(footerLayout, footer.value)) {
            return;
        }
        footer.value = footerLayout;
    }

    function setDrawerLayout(drawerLayout: DrawerLayout) {
        if (utils.object.isEqual(drawerLayout, drawer.value)) {
            return;
        }
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
