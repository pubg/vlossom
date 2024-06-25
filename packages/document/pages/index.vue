<template>
    <vs-layout>
        <vs-header
            class="header"
            position="fixed"
            primary
            height="60px"
            :style-set="{ backgroundColor: 'black', fontColor: 'white' }"
        >
            <vs-theme-button />
        </vs-header>

        <vs-container>
            <vs-page>
                <template #title>
                    <h1>Vlossom Document</h1>
                </template>
            </vs-page>
        </vs-container>

        <vs-footer
            class="footer"
            :style-set="{ backgroundColor: 'black', fontColor: '#dfdfdf' }"
            height="30px"
            position="fixed"
        />
    </vs-layout>
</template>

<script lang="ts">
export default {
    setup() {
        return {};
    },
};
</script>
