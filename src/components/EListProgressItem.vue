<template>
    <div class="eListProgressItemLayout" :style="progressStyle">
        <div class="itemWrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps(['percentage']);

const progressStyle = computed(() => {
    return {
        background: `linear-gradient(to right, #F5EDED ${props.percentage * 100}%, transparent ${props.percentage * 100}%)`
    };
});
</script>

<style scoped lang="scss">
.eListProgressItemLayout {
    width: 100%;
    padding: 10px;
    background-color: #F5EDED; //用一部分背景表示进度，比如0.24，从左到右
    border-bottom: rgb(213, 213, 213) 2px solid;
    border-left: rgb(213, 213, 213) 2px solid;
    border-right: rgb(213, 213, 213) 2px solid;
}
</style>