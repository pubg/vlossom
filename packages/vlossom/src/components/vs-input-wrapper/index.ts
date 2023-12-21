import { VsComponent } from '@/declaration/types';
import VsInputWrapper from './VsInputWrapper.vue';

type VsInputWrapperInstance = InstanceType<typeof VsInputWrapper>;

export type { VsInputWrapperInstance };

export default {
    name: VsComponent.VsInputWrapper,
    component: VsInputWrapper,
};
