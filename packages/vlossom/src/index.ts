import './styles/index.scss';
import type { Vlossom } from './vlossom-framework';

declare module 'vue' {
    interface ComponentCustomProperties {
        $vlossom: Vlossom;
    }
}

export * from './vlossom-framework';
export * from './components';
export * from './composables';
export * from './declaration';
export * from './utils';
