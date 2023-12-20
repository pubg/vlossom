import { VsComponent } from '@/declaration/types';
import VsContainer from './VsContainer.vue';

type VsContainerInstance = InstanceType<typeof VsContainer>;

export type { VsContainerInstance };

export default {
    name: VsComponent.VsContainer,
    component: VsContainer,
};
