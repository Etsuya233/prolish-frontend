<template>
    <div class="eInputLayout">
<!--        <div class="title">-->
<!--        -->
<!--        </div>-->
        <div class="inputArea">
            <input type="text" v-model="value" />
        </div>
    </div>
</template>

<script setup>
const value = defineModel('value');
</script>

<style scoped lang="scss">
.eInputLayout {
    padding: 0 10px;
    .title {
    
    }
    .inputArea {
        width: 100%;
        input {
            --webkit-appearance: none;
            outline: none;
            border: 2px solid rgb(227, 227, 227);
            border-radius: 10px;
            padding: 10px;
            width: 100%;
            
        }
        input:focus {
            border: 2px solid rgb(112, 112, 112);
        }
    }
}
</style>