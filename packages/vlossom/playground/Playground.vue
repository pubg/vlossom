<template>
    <vs-page>
        <template #title>
            <h2>Vlossom Playground</h2>
        </template>

        <vs-section>
            <template #title>
                <h3>Hello Vlossom!</h3>
            </template>

            Vlossom is a Vue 3 component library that provides a set of high-quality components and themes for your Vue
            3 applications.
        </vs-section>

        <vs-section>
            <template #title>
                <h3>VsButton - with `Circle`</h3>
            </template>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap">
                <!-- Original Button -->
                <vs-button
                    :dense="true"
                    :loading="true"
                    :circle="true"
                    :primary="true"
                    :outline="true"
                    :responsive="true"
                    :large="true"
                    state="idle"
                    color-scheme="none"
                    style-set="primary"
                >
                    <span>Original</span>
                </vs-button>

                <!-- Dense + Primary -->
                <vs-button :dense="true" :circle="true" :primary="true" state="idle" color-scheme="primary">
                    <span>Dense</span>
                </vs-button>

                <!-- Large + Outline -->
                <vs-button :large="true" :circle="true" :outline="true" state="success" color-scheme="secondary">
                    <span>Large</span>
                </vs-button>

                <!-- Loading + Primary -->
                <vs-button :loading="true" :circle="true" :primary="true" state="warning" color-scheme="accent">
                    <span>Loading</span>
                </vs-button>

                <!-- Responsive + Outline -->
                <vs-button :responsive="true" :circle="true" :outline="true" state="error" style-set="secondary">
                    <span>Responsive</span>
                </vs-button>

                <!-- Dense + Large -->
                <vs-button :dense="true" :large="true" :circle="true" state="idle" style-set="primary">
                    <span>Dense Large</span>
                </vs-button>

                <!-- Primary + Outline + Loading -->
                <vs-button :primary="true" :outline="true" :loading="true" :circle="true" color-scheme="primary">
                    <span>Primary Loading</span>
                </vs-button>

                <!-- All Options -->
                <vs-button
                    :dense="true"
                    :loading="true"
                    :circle="true"
                    :primary="true"
                    :outline="true"
                    :responsive="true"
                    :large="true"
                    state="success"
                    color-scheme="accent"
                    style-set="secondary"
                >
                    <span>All</span>
                </vs-button>

                <!-- Additional 30 buttons with different combinations -->
                <vs-button :circle="true" state="success" color-scheme="primary">
                    <span>Success</span>
                </vs-button>

                <vs-button :circle="true" state="error" color-scheme="secondary">
                    <span>Error</span>
                </vs-button>

                <vs-button :circle="true" state="warning" color-scheme="accent">
                    <span>Warning</span>
                </vs-button>

                <vs-button :circle="true" :dense="true" state="idle">
                    <span>Dense Idle</span>
                </vs-button>

                <vs-button :circle="true" :large="true" state="success">
                    <span>Large Success</span>
                </vs-button>

                <vs-button :circle="true" :loading="true" state="error">
                    <span>Loading Error</span>
                </vs-button>

                <vs-button :circle="true" :responsive="true" state="warning">
                    <span>Responsive Warning</span>
                </vs-button>

                <vs-button :circle="true" :primary="true" style-set="primary">
                    <span>Primary Style</span>
                </vs-button>

                <vs-button :circle="true" :outline="true" style-set="secondary">
                    <span>Outline Style</span>
                </vs-button>

                <vs-button :circle="true" :dense="true" :primary="true" style-set="primary">
                    <span>Dense Primary</span>
                </vs-button>

                <vs-button :circle="true" :large="true" :outline="true" style-set="secondary">
                    <span>Large Outline</span>
                </vs-button>

                <vs-button :circle="true" :loading="true" :primary="true" color-scheme="primary">
                    <span>Loading Primary</span>
                </vs-button>

                <vs-button :circle="true" :responsive="true" :outline="true" color-scheme="secondary">
                    <span>Responsive Outline</span>
                </vs-button>

                <vs-button :circle="true" :dense="true" :large="true" state="success">
                    <span>Dense Large Success</span>
                </vs-button>

                <vs-button :circle="true" :primary="true" :outline="true" state="error">
                    <span>Primary Outline Error</span>
                </vs-button>

                <vs-button :circle="true" :loading="true" :responsive="true" state="warning">
                    <span>Loading Responsive</span>
                </vs-button>

                <vs-button :circle="true" :dense="true" :primary="true" color-scheme="accent">
                    <span>Dense Primary Accent</span>
                </vs-button>

                <vs-button :circle="true" :large="true" :outline="true" color-scheme="primary">
                    <span>Large Outline Primary</span>
                </vs-button>

                <vs-button :circle="true" :loading="true" :primary="true" style-set="secondary">
                    <span>Loading Primary Style</span>
                </vs-button>

                <vs-button :circle="true" :responsive="true" :outline="true" style-set="primary">
                    <span>Responsive Outline Style</span>
                </vs-button>

                <vs-button :circle="true" :dense="true" :large="true" :primary="true">
                    <span>Dense Large Primary</span>
                </vs-button>

                <vs-button :circle="true" :primary="true" :outline="true" :loading="true">
                    <span>Primary Outline Loading</span>
                </vs-button>

                <vs-button :circle="true" :responsive="true" :large="true" :outline="true">
                    <span>Responsive Large Outline</span>
                </vs-button>

                <vs-button :circle="true" :dense="true" :primary="true" :loading="true">
                    <span>Dense Primary Loading</span>
                </vs-button>

                <vs-button :circle="true" :large="true" :outline="true" :responsive="true">
                    <span>Large Outline Responsive</span>
                </vs-button>

                <vs-button :circle="true" :loading="true" :primary="true" :dense="true">
                    <span>Loading Primary Dense</span>
                </vs-button>

                <vs-button :circle="true" :responsive="true" :outline="true" :large="true">
                    <span>Responsive Outline Large</span>
                </vs-button>

                <vs-button :circle="true" :dense="true" :large="true" :outline="true">
                    <span>Dense Large Outline</span>
                </vs-button>

                <vs-button :circle="true" :primary="true" :loading="true" :responsive="true">
                    <span>Primary Loading Responsive</span>
                </vs-button>

                <vs-button :circle="true" :outline="true" :dense="true" :large="true">
                    <span>Outline Dense Large</span>
                </vs-button>

                <vs-button :circle="true" :loading="true" :responsive="true" :primary="true">
                    <span>Loading Responsive Primary</span>
                </vs-button>

                <vs-button :circle="true" :large="true" :dense="true" :outline="true">
                    <span>Large Dense Outline</span>
                </vs-button>

                <!-- Large Circle Buttons -->
                <vs-button :circle="true" :large="true" style="width: 100px; height: 100px">
                    <span>100px</span>
                </vs-button>

                <vs-button :circle="true" :large="true" :primary="true" style="width: 120px; height: 120px">
                    <span>120px</span>
                </vs-button>

                <vs-button :circle="true" :large="true" :outline="true" style="width: 140px; height: 140px">
                    <span>140px</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :primary="true"
                    :outline="true"
                    style="width: 160px; height: 160px"
                >
                    <span>160px</span>
                </vs-button>

                <vs-button :circle="true" :large="true" :loading="true" style="width: 180px; height: 180px">
                    <span>180px</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :primary="true"
                    :loading="true"
                    style="width: 200px; height: 200px"
                >
                    <span>200px</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :outline="true"
                    :loading="true"
                    style="width: 220px; height: 220px"
                >
                    <span>220px</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :primary="true"
                    :outline="true"
                    :loading="true"
                    style="width: 240px; height: 240px"
                >
                    <span>240px</span>
                </vs-button>

                <vs-button :circle="true" :large="true" :responsive="true" style="width: 260px; height: 260px">
                    <span>260px</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :primary="true"
                    :responsive="true"
                    style="width: 280px; height: 280px"
                >
                    <span>280px</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :outline="true"
                    :responsive="true"
                    style="width: 300px; height: 300px"
                >
                    <span>300px</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :primary="true"
                    :outline="true"
                    :responsive="true"
                    style="width: 320px; height: 320px"
                >
                    <span>320px</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :loading="true"
                    :responsive="true"
                    style="width: 340px; height: 340px"
                >
                    <span>340px</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :primary="true"
                    :loading="true"
                    :responsive="true"
                    style="width: 360px; height: 360px"
                >
                    <span>360px</span>
                </vs-button>

                <!-- Color Scheme Variations -->
                <vs-button :circle="true" :large="true" color-scheme="primary" style="width: 100px; height: 100px">
                    <span>Primary</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="secondary" style="width: 100px; height: 100px">
                    <span>Secondary</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="accent" style="width: 100px; height: 100px">
                    <span>Accent</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="success" style="width: 100px; height: 100px">
                    <span>Success</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="warning" style="width: 100px; height: 100px">
                    <span>Warning</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="error" style="width: 100px; height: 100px">
                    <span>Error</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="info" style="width: 100px; height: 100px">
                    <span>Info</span>
                </vs-button>

                <!-- Color Scheme with Outline -->
                <vs-button
                    :circle="true"
                    :large="true"
                    :outline="true"
                    color-scheme="primary"
                    style="width: 100px; height: 100px"
                >
                    <span>Primary O</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :outline="true"
                    color-scheme="secondary"
                    style="width: 100px; height: 100px"
                >
                    <span>Secondary O</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :outline="true"
                    color-scheme="accent"
                    style="width: 100px; height: 100px"
                >
                    <span>Accent O</span>
                </vs-button>

                <!-- Color Scheme with Loading -->
                <vs-button
                    :circle="true"
                    :large="true"
                    :loading="true"
                    color-scheme="success"
                    style="width: 100px; height: 100px"
                >
                    <span>Success L</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :loading="true"
                    color-scheme="warning"
                    style="width: 100px; height: 100px"
                >
                    <span>Warning L</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :loading="true"
                    color-scheme="error"
                    style="width: 100px; height: 100px"
                >
                    <span>Error L</span>
                </vs-button>

                <!-- Color Scheme with Primary -->
                <vs-button
                    :circle="true"
                    :large="true"
                    :primary="true"
                    color-scheme="info"
                    style="width: 100px; height: 100px"
                >
                    <span>Info P</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :primary="true"
                    color-scheme="success"
                    style="width: 100px; height: 100px"
                >
                    <span>Success P</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :primary="true"
                    color-scheme="warning"
                    style="width: 100px; height: 100px"
                >
                    <span>Warning P</span>
                </vs-button>

                <!-- Color Scheme with Combined Options -->
                <vs-button
                    :circle="true"
                    :large="true"
                    :primary="true"
                    :outline="true"
                    color-scheme="error"
                    style="width: 100px; height: 100px"
                >
                    <span>Error PO</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :primary="true"
                    :loading="true"
                    color-scheme="info"
                    style="width: 100px; height: 100px"
                >
                    <span>Info PL</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :outline="true"
                    :loading="true"
                    color-scheme="success"
                    style="width: 100px; height: 100px"
                >
                    <span>Success OL</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :primary="true"
                    :outline="true"
                    :loading="true"
                    color-scheme="warning"
                    style="width: 100px; height: 100px"
                >
                    <span>Warning POL</span>
                </vs-button>

                <!-- All Color Schemes -->
                <vs-button :circle="true" :large="true" color-scheme="none" style="width: 100px; height: 100px">
                    <span>None</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="gray" style="width: 100px; height: 100px">
                    <span>Gray</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="red" style="width: 100px; height: 100px">
                    <span>Red</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="orange" style="width: 100px; height: 100px">
                    <span>Orange</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="yellow" style="width: 100px; height: 100px">
                    <span>Yellow</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="yellow-green" style="width: 100px; height: 100px">
                    <span>Yellow-Green</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="green" style="width: 100px; height: 100px">
                    <span>Green</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="teal" style="width: 100px; height: 100px">
                    <span>Teal</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="light-blue" style="width: 100px; height: 100px">
                    <span>Light Blue</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="blue" style="width: 100px; height: 100px">
                    <span>Blue</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="indigo" style="width: 100px; height: 100px">
                    <span>Indigo</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="purple" style="width: 100px; height: 100px">
                    <span>Purple</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="pink" style="width: 100px; height: 100px">
                    <span>Pink</span>
                </vs-button>

                <vs-button :circle="true" :large="true" color-scheme="brown" style="width: 100px; height: 100px">
                    <span>Brown</span>
                </vs-button>

                <!-- Color Schemes with Outline -->
                <vs-button
                    :circle="true"
                    :large="true"
                    :outline="true"
                    color-scheme="red"
                    style="width: 100px; height: 100px"
                >
                    <span>Red O</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :outline="true"
                    color-scheme="blue"
                    style="width: 100px; height: 100px"
                >
                    <span>Blue O</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :outline="true"
                    color-scheme="green"
                    style="width: 100px; height: 100px"
                >
                    <span>Green O</span>
                </vs-button>

                <!-- Color Schemes with Loading -->
                <vs-button
                    :circle="true"
                    :large="true"
                    :loading="true"
                    color-scheme="purple"
                    style="width: 100px; height: 100px"
                >
                    <span>Purple L</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :loading="true"
                    color-scheme="orange"
                    style="width: 100px; height: 100px"
                >
                    <span>Orange L</span>
                </vs-button>

                <vs-button
                    :circle="true"
                    :large="true"
                    :loading="true"
                    color-scheme="teal"
                    style="width: 100px; height: 100px"
                >
                    <span>Teal L</span>
                </vs-button>
            </div>
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
