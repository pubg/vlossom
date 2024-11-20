<template>
    <vs-layout drawer-responsive>
        <vs-header
            class="header"
            fixed
            primary
            height="72px"
            :style-set="{ backgroundColor: 'black', fontColor: 'white' }"
            :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }"
        >
            <div class="logo">
                <vs-image src="/assets/vlossom-logo.png" :style-set="{ height: '40px', width: '40px' }" />
                <h1>Vlossom</h1>
            </div>
            <vs-theme-button />
        </vs-header>

        <vs-drawer v-model="isDrawerOpen" position="fixed" use-layout-padding>
            <vs-button>test</vs-button>
        </vs-drawer>

        <vs-container>
            <playground />
        </vs-container>

        <vs-footer
            class="footer"
            :style-set="{ backgroundColor: 'black', fontColor: '#dfdfdf' }"
            height="40px"
            fixed
            :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center' }"
        >
            <span>&copy; {{ currentYear }} Vlossom</span>
        </vs-footer>
    </vs-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import Playground from './Playground.vue';

export default {
    components: { Playground },
    setup() {
        const currentYear = new Date().getFullYear();
        const isDrawerOpen = ref(false);

        return { currentYear, isDrawerOpen };
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
