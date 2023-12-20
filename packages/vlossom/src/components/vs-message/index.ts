import { VsComponent } from '@/declaration/types';
import VsMessage from './VsMessage.vue';

export type VsMessageInstance = InstanceType<typeof VsMessage>;

export default {
    name: VsComponent.VsMessage,
    component: VsMessage,
};
