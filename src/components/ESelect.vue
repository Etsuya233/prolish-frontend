<template>
    <div class="eSelectLayout">
        <div class="selectArea">
            <div class="selectBlock" :class="{selected: selected === index}" v-for="(obj, index) in props.data" @click="clicked(index)">
                {{obj}}
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue";

const props = defineProps(['data']);
const value = defineModel('value');
let selected = ref(0);

const clicked = (index) => {
    value.value = props.data[index];
    selected.value = index;
}

onMounted(() => {
    props.data.forEach((item, index) => {
       if(value.value === item){
           clicked(index);
       }
    });
})
</script>

<style scoped lang="scss">
.eSelectLayout {
    width: 100%;
    padding: 0 10px;
    .selectArea {
        border: rgb(213, 213, 213) 2px solid;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
    }
    .selectBlock {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        padding: 10px 0;
        border-left: rgb(213, 213, 213) 2px solid;
        text-align: center;
        transition: background-color 0.2s ease;
        &:not(:first-child) {
            border-left: rgb(213, 213, 213) 2px solid;
        }
        &:first-child {
            border-left: none;
        }
    }
    .selected {
        background-color: #F5EDED;
    }
}
</style>