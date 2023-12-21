import { VsComponent } from '@/declaration/types';
import VsPage from './VsPage.vue';
import type { VsPageStyleSet } from './VsPage.vue';

type VsPageInstance = InstanceType<typeof VsPage>;

export type { VsPageInstance, VsPageStyleSet };

export default {
    name: VsComponent.VsPage,
    component: VsPage,
};
