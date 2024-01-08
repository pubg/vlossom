<template>
    <vs-page>
        <template #title>Vlossom Playground</template>

        Hello World
    </vs-page>
    <vs-section style="border: solid 1px red">
        <div class="box parent">
            <div class="box child"></div>
        </div>
    </vs-section>
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
.parent {
    background-color: rgba(0, 0, 0, 1);
    width: 100px;
    height: 100px;
}

.child {
    background-color: blue;
    width: 50px;
    height: 50px;
    padding: 20px;

    border: solid 5px rgba(255, 255, 0, 0.5);
}
</style>
