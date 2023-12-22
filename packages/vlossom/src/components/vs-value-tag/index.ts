import { VsComponent } from '@/declaration/types';
import VsValueTag from './VsValueTag.vue';
import type { VsValueTagStyleSet } from './VsValueTag.vue';

type VsValueTagInstance = InstanceType<typeof VsValueTag>;

export type { VsValueTagInstance, VsValueTagStyleSet };

export default {
    name: VsComponent.VsValueTag,
    component: VsValueTag,
};
