import { VsComponent } from '@/declaration/types';
import VsCheckbox from './VsCheckbox.vue';
import type { VsCheckboxStyleSet } from './VsCheckbox.vue';

type VsCheckboxInstance = InstanceType<typeof VsCheckbox>;

export type { VsCheckboxInstance, VsCheckboxStyleSet };

export default {
    name: VsComponent.VsCheckbox,
    component: VsCheckbox,
};
