<template>
    <vs-header class="header" primary height="60px" :style-set="{ backgroundColor: 'black', fontColor: 'white' }">
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

            Vlossom is a Vue 3 component library that provides a set of high-quality components and themes for your Vue
            3 applications.
        </vs-section>
    </vs-page>
</template>

<script lang="ts">
export default {
    name: 'Playground',
    setup() {
        return {};
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
