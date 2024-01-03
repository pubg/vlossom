import { VsComponent } from '@/declaration/types';
import VsChip from './VsChip.vue';
import type { VsChipStyleSet } from './VsChip.vue';

type VsChipInstance = InstanceType<typeof VsChip>;

export type { VsChipInstance, VsChipStyleSet };

export default {
    name: VsComponent.VsChip,
    component: VsChip,
};
