import { VsComponent } from '@/declaration/types';
import VsInput from './VsInput.vue';
import type { InputType, VsInputStyleSet } from './VsInput.vue';

type VsInputInstance = InstanceType<typeof VsInput>;

export type { VsInputInstance, VsInputStyleSet, InputType };

export default {
    name: VsComponent.VsInput,
    component: VsInput,
};
