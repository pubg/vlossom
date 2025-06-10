<template>
    <vs-layout drawer-responsive :style="{ minHeight: '100vh' }">
        <vs-header
            class="header bar-center"
            fixed
            primary
            height="60px"
            :style-set="{ backgroundColor: 'black', fontColor: 'white' }"
        >
            <div class="header-left">
                <vs-menu-button v-model="isDrawerOpen" :style-set="{ fontColor: '#fff' }" />
                <vs-image
                    src="/assets/vlossom-logo.png"
                    :style="{ marginLeft: '16px' }"
                    :style-set="{ height: '36px', width: '36px' }"
                />
                <h1>Vlossom</h1>
            </div>
            <vs-theme-button />
        </vs-header>

        <vs-drawer v-model="isDrawerOpen" fixed>
            <vs-button @click="isDrawerOpen = false">Close Drawer</vs-button>
        </vs-drawer>

        <vs-container>
            <playground />
        </vs-container>

        <vs-footer
            class="footer bar-center"
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
.bar-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header {
    .header-left {
        display: flex;
        align-items: center;
        padding-left: 1.2rem;

        h1 {
            margin-left: 0.6rem;
            font-size: 2.4rem;
        }
    }
}
.footer {
    font-size: 12px;
}
</style>
