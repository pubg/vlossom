import { VsComponent } from '@/declaration/types';
import VsProgress from './VsProgress.vue';
import type { VsProgressStyleSet } from './VsProgress.vue';

type VsProgressInstance = InstanceType<typeof VsProgress>;

export type { VsProgressInstance, VsProgressStyleSet };

export default {
    name: VsComponent.VsProgress,
    component: VsProgress,
};
