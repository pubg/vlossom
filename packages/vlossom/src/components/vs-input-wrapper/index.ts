import { VsComponent } from '@/declaration/types';
import VsInputWrapper from './VsInputWrapper.vue';

export type VsInputWrapperInstance = InstanceType<typeof VsInputWrapper>;

export default {
    name: VsComponent.VsInputWrapper,
    component: VsInputWrapper,
};
