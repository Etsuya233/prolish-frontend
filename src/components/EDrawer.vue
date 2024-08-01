<template>
    <div class="eDrawerLayout">
        <ETransitionFade>
            <div class="shadow" @click="status = !status" v-if="status"></div>
        </ETransitionFade>
        <ETransitionSlideDown>
            <div class="window" v-if="status">
                <div class="title">
                    <div class="text">
                        {{props.title}}
                    </div>
                    <div class="close" @click="status = !status">
                        close
                    </div>
                </div>
                <slot></slot>
            </div>
        </ETransitionSlideDown>
    </div>
</template>

<script setup>
import {ref, reactive} from "vue";
import ETransitionFade from "@/components/ETransitionFade.vue";
import ETransitionSlideDown from "@/components/ETransitionSlideDown.vue";

const status = defineModel('status');
const props = defineProps(['title']);

</script>

<style lang="scss">
.eDrawerLayout {
    .shadow {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(20px);
        z-index: 200;
    }
    .window {
        position: fixed;
        background-color: white;
        z-index: 201;
        bottom: 0;
        width: 100%;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        .title {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            height: 70px;
            padding: 10px;
            .text {
                margin: 0 auto;
            }
            .close {
                font-family: Icon;
                font-size: 20px;
                padding-right: 10px;
            }
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

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