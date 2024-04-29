<template>
    <vs-header class="header" primary height="60px">
        <div class="logo">
            <vs-image src="/assets/vlossom-logo.png" :style-set="{ height: '40px', width: '40px' }" />
            <span>Vlossom</span>
        </div>
        <vs-theme-button />
    </vs-header>
    <vs-page>
        <template #title>Vlossom Playground</template>

        <vs-section>
            <template #title>Hello Vlossom!</template>
            <vs-button>Hello</vs-button>
            <vs-button v-for="color in COLORS" :color-scheme="color">Hello</vs-button>
            <vs-divider />
            <vs-button primary>Hello</vs-button>
            <vs-button v-for="color in COLORS" :color-scheme="color" primary>Hello</vs-button>
        </vs-section>
    </vs-page>
</template>

<script lang="ts">
import { COLORS } from './../src/declaration';

export default {
    name: 'Playground',
    setup() {
        return {
            COLORS,
        };
    },
};
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;

    .logo {
        display: flex;
        align-items: center;

        span {
            font-size: 1.5rem;
            font-weight: bold;
            margin-left: 10px;
        }
    }
}
</style>
