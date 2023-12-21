import { VsComponent } from '@/declaration/types';
import VsInput from './VsInput.vue';
import type { InputType, InputButton, VsInputStyleSet } from './VsInput.vue';

type VsInputInstance = InstanceType<typeof VsInput>;

export type { VsInputInstance, VsInputStyleSet, InputType, InputButton };

export default {
    name: VsComponent.VsInput,
    component: VsInput,
};
