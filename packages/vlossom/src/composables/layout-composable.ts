import { Ref, ref } from 'vue';
import { BarLayout, DrawerLayout, DrawerLayouts, VsLayoutProvide } from '@/declaration';
import { utils } from '@/utils';

export function useLayout() {
    const header: Ref<BarLayout> = ref({ position: 'relative', height: '' });
    const footer: Ref<BarLayout> = ref({ position: 'relative', height: '' });
    const drawers: Ref<DrawerLayouts> = ref({
        left: { drawerOpen: false, placement: 'left', size: '' },
        top: { drawerOpen: false, placement: 'top', size: '' },
        right: { drawerOpen: false, placement: 'right', size: '' },
        bottom: { drawerOpen: false, placement: 'bottom', size: '' },
    });

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
        const drawer = drawers.value[drawerLayout.placement];
        if (utils.object.isEqual(drawerLayout, drawer)) {
            return;
        }
        drawers.value = {
            ...drawers.value,
            [drawerLayout.placement]: drawerLayout,
        };
    }

    function getDefaultLayoutProvide(): VsLayoutProvide {
        return {
            header,
            footer,
            drawers,
            setHeaderLayout,
            setFooterLayout,
            setDrawerLayout,
        };
    }

    return {
        header,
        footer,
        drawers,
        setHeaderLayout,
        setFooterLayout,
        setDrawerLayout,
        getDefaultLayoutProvide,
    };
}
