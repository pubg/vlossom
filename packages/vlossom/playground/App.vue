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
                <h1>Vlossom</h1>
            </div>
            <vs-theme-button />
        </vs-header>

        <vs-container>
            <playground />
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
import Playground from './Playground.vue';

export default {
    components: { Playground },
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
        padding-left: 2rem;

        h1 {
            margin-left: 1.2rem;
            font-size: 2.4rem;
        }
    }
}
.footer {
    font-size: 12px;
}
</style>
