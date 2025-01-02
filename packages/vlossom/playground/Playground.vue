<template>
    <vs-page>
        <template #title>
            <h2>Vlossom Playground</h2>
        </template>

        <vs-section>
            <template #title>
                <h3>Hello Vlossom!</h3>
            </template>

            <vs-tooltip>
                <vs-button>버튼</vs-button>
                <template #tooltip> HIHI </template>
            </vs-tooltip>

            <vs-tooltip>
                <vs-button>버튼</vs-button>
                <template #tooltip> HIHI </template>
            </vs-tooltip>

            <vs-tooltip>
                <vs-button>버튼</vs-button>
                <template #tooltip> HIHI </template>
            </vs-tooltip>

            <vs-tooltip>
                <vs-button>버튼</vs-button>
                <template #tooltip> HIHI </template>
            </vs-tooltip>

            <vs-tooltip>
                <vs-button>버튼</vs-button>
                <template #tooltip> HIHI </template>
            </vs-tooltip>

            Vlossom is a Vue 3 component library that provides a set of high-quality components and themes for your Vue
            3 applications.
        </vs-section>
    </vs-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Playground',
    setup() {
        return {};
    },
});
</script>
