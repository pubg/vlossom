import { VsComponent } from '@/declaration/types';
import VsButton from './VsButton.vue';
import type { VsButtonStyleSet } from './VsButton.vue';

type VsButtonInstance = InstanceType<typeof VsButton>;

export type { VsButtonInstance, VsButtonStyleSet };

export default {
    name: VsComponent.VsButton,
    component: VsButton,
};
