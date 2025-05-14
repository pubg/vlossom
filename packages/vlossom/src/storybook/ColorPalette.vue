<template>
    <div class="color-palette">
        <div class="color-line" v-for="color in COLORS" :key="color">
            <h6>{{ color }}</h6>
            <div
                class="color"
                v-for="num in colorNumbers"
                :key="`${color}-${num}`"
                :style="{ backgroundColor: `var(--vs-${color}-${num})` }"
            >
                <span>{{ num }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { COLORS } from '@/declaration';

export default defineComponent({
    setup() {
        const colorNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
        return { COLORS, colorNumbers };
    },
});
</script>

<style scoped lang="scss">
.color-palette {
    display: flex;
    .color-line {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 10%;
        h6 {
            margin-bottom: 5px;
            white-space: nowrap;
        }

        .color {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 40px;
            margin-bottom: 5px;
            padding: 0 10px;

            span {
                font-size: 0.6rem;
                font-weight: 600;
                text-shadow:
                    -1px 0 white,
                    0 1px white,
                    1px 0 white,
                    0 -1px white;
            }
        }
    }

    .color-line + .color-line {
        margin-left: 5px;
    }
}
</style>
