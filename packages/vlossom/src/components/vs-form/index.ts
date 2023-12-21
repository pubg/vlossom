import { VsComponent } from '@/declaration/types';
import VsForm from './VsForm.vue';

type VsFormInstance = InstanceType<typeof VsForm>;

export type { VsFormInstance };

export default {
    name: VsComponent.VsForm,
    component: VsForm,
};
