import { VsComponent } from '@/declaration/types';
import VsNotice from './VsNotice.vue';
import type { VsNoticeStyleSet } from './VsNotice.vue';

type VsNoticeInstance = InstanceType<typeof VsNotice>;

export type { VsNoticeInstance, VsNoticeStyleSet };

export default {
    name: VsComponent.VsNotice,
    component: VsNotice,
};
