import { VsComponent } from '@/declaration/types';
import VsWrapper from './VsWrapper.vue';

type VsWrapperInstance = InstanceType<typeof VsWrapper>;

export type { VsWrapperInstance };

export default {
    name: VsComponent.VsWrapper,
    component: VsWrapper,
};
