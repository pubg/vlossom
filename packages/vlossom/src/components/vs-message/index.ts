import { VsComponent } from '@/declaration/types';
import VsMessage from './VsMessage.vue';

type VsMessageInstance = InstanceType<typeof VsMessage>;

export type { VsMessageInstance };

export default {
    name: VsComponent.VsMessage,
    component: VsMessage,
};
