import { VsComponent } from '@/declaration/types';
import VsSection from './VsSection.vue';
import type { VsSectionStyleSet } from './VsSection.vue';

type VsSectionInstance = InstanceType<typeof VsSection>;

export type { VsSectionInstance, VsSectionStyleSet };

export default {
    name: VsComponent.VsSection,
    component: VsSection,
};
