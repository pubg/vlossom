import { VsComponent } from '@/declaration/types';
import VsForm from './VsForm.vue';

export type VsFormInstance = InstanceType<typeof VsForm>;

export default {
    name: VsComponent.VsForm,
    component: VsForm,
};
