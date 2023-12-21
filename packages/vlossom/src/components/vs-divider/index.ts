import { VsComponent } from '@/declaration/types';
import VsDivider from './VsDivider.vue';
import type { VsDividerStyleSet } from './VsDivider.vue';

type VsDividerInstance = InstanceType<typeof VsDivider>;

export type { VsDividerInstance, VsDividerStyleSet };

export default {
    name: VsComponent.VsDivider,
    component: VsDivider,
};
