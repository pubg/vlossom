import { VsComponent } from '@/declaration/types';
import VsLabelValue from './VsLabelValue.vue';

type VsLabelValueInstance = InstanceType<typeof VsLabelValue>;

export type { VsLabelValueInstance };

export default {
    name: VsComponent.VsLabelValue,
    component: VsLabelValue,
};
