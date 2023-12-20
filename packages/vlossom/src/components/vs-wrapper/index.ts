import { VsComponent } from '@/declaration/types';
import VsWrapper from './VsWrapper.vue';

export type VsWrapperInstance = InstanceType<typeof VsWrapper>;

export default {
    name: VsComponent.VsWrapper,
    component: VsWrapper,
};
