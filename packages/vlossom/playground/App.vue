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
