<template>
    <Transition name="slide-down">
        <slot></slot>
    </Transition>
</template>

<script setup>

</script>

<style lang="scss">
.slide-down-enter-active, .slide-down-leave-active {
    transition: transform 0.2s ease;
}

.slide-down-enter-from, .slide-down-leave-to {
    transform: translateY(100%);
}

.slide-down-enter-to, .slide-down-leave-from {
    transform: translateY(0);
}
</style>