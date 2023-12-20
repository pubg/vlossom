import { VsComponent } from '@/declaration/types';
import VsContainer from './VsContainer.vue';

export type VsContainerInstance = InstanceType<typeof VsContainer>;

export default {
    name: VsComponent.VsContainer,
    component: VsContainer,
};
