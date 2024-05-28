<template>
    <vs-layout>
        <vs-header
            class="header"
            position="fixed"
            primary
            height="60px"
            :style-set="{ backgroundColor: 'black', fontColor: 'white' }"
        >
            <div class="logo">
                <vs-image src="/assets/vlossom-logo.png" :style-set="{ height: '40px', width: '40px' }" />
                <span>Vlossom</span>
            </div>
            <vs-theme-button />
        </vs-header>

        <vs-container>
            <vs-page>
                <template #title>Vlossom Playground</template>

                <vs-section>
                    <template #title>Hello Vlossom!</template>

                    Vlossom is a Vue 3 component library that provides a set of high-quality components and themes for
                    your Vue 3 applications.
                </vs-section>
            </vs-page>
        </vs-container>

        <vs-footer
            class="footer"
            :style-set="{ backgroundColor: 'black', fontColor: '#dfdfdf' }"
            height="30px"
            position="fixed"
        >
            <span>&copy; {{ currentYear }} Vlossom</span>
        </vs-footer>
    </vs-layout>
</template>

<script lang="ts">
export default {
    name: 'Playground',
    setup() {
        const currentYear = new Date().getFullYear();

        return { currentYear };
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
.footer {
    font-size: 12px;
}
</style>
