import { VsComponent } from '@/declaration/types';
import VsLabelValue from './VsLabelValue.vue';
import type { VsLabelValueStyleSet } from './VsLabelValue.vue';

type VsLabelValueInstance = InstanceType<typeof VsLabelValue>;

export type { VsLabelValueInstance, VsLabelValueStyleSet };

export default {
    name: VsComponent.VsLabelValue,
    component: VsLabelValue,
};
