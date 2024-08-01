<template>
    <div class="eRangeLayout">
<!--        <div class="title">-->
<!--        -->
<!--        </div>-->
        <div class="input">
            <div class="inputWrapper">
                <input type="range" min="1" max="200" value="40" v-model="value"/>
            </div>
            <div class="val">
                {{value}}
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive} from "vue";

const value = defineModel('value');


</script>

<style scoped lang="scss">
.eRangeLayout {
    .title {

    }
    .input {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        .inputWrapper {
            display: flex;
            width: 100%;
            padding: 0 10px;
            input {
                width: 100%;
                outline: none;
                --webkit-appearance: none;
            }
        }
        .val {
            width: 50px;
        }
    }
}
</style>