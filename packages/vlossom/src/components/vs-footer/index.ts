import { VsComponent } from '@/declaration/types';
import VsFooter from './VsFooter.vue';
import type { VsFooterStyleSet } from './VsFooter.vue';

type VsFooterInstance = InstanceType<typeof VsFooter>;

export type { VsFooterInstance, VsFooterStyleSet };

export default {
    name: VsComponent.VsFooter,
    component: VsFooter,
};
