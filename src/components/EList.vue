<template>
    <div class="eListLayout">
        <slot></slot>
    </div>
</template>

<script setup>

</script>

<style lang="scss">
.eListLayout {
    .eListItemLayout, .eListProgressItemLayout {
        border-bottom: rgb(213, 213, 213) 2px solid;
        border-left: rgb(213, 213, 213) 2px solid;
        border-right: rgb(213, 213, 213) 2px solid;
    }
    .eListItemLayout:first-of-type,
    .eListProgressItemLayout:first-of-type
    {
        border-top: rgb(213, 213, 213) 2px solid;
        border-radius: 10px 10px 0 0;
    }
    .eListItemLayout:last-of-type,
    .eListProgressItemLayout:last-of-type {
        border-radius: 0 0 10px 10px;
    }
    .eListItemLayout:only-child,
    .eListProgressItemLayout:only-child {
        border-radius: 10px;
    }
    .itemWrapper {
        transition: transform 0.2s;
        &:active {
            transform: scale(0.95);
        }
    }
}
</style>