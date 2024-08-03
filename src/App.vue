<template>
    <div class="appLayout">
        <div class="top fc">
            <div class="title">
                Prolish
            </div>
            <div class="progress">
                <ETransitionFade>
                    <div class="progressIcon spin" v-if="globalLoading">
                        refresh
                    </div>
                </ETransitionFade>
            </div>
        </div>
        <div class="sentenceLayout">
                <div class="sentenceArea">
                    <textarea v-model="sentenceData.sentence" rows="4"></textarea>
                </div>
                <div class="inputArea">
                    <div class="userInput">
                        <textarea placeholder="请输入翻译" rows="4" v-model="answerData.requestData.translation" />
                    </div>
                </div>
                <div class="answerAreaV2">
                    <EList>
                        <EListProgressItem :percentage="answerData.data.total / 5">总分：{{roundBy2(answerData.data.total)}}</EListProgressItem>
                    </EList>
                    <EList>
                        <EListProgressItem :percentage="answerData.data.accuracy.score / 5">准确度：{{roundBy2(answerData.data.accuracy.score)}}</EListProgressItem>
                        <EListProgressItem :percentage="answerData.data.completeness / 5">完整度：{{roundBy2(answerData.data.completeness)}}</EListProgressItem>
                        <EListProgressItem :percentage="answerData.data.fluency / 5">流畅度：{{roundBy2(answerData.data.fluency)}}</EListProgressItem>
                        <EListProgressItem :percentage="answerData.data.naturalness / 5">地道度：{{roundBy2(answerData.data.naturalness)}}</EListProgressItem>
                    </EList>
                    <EList v-if="(answerData.data.optimizedTranslation !== null && answerData.data.optimizedTranslation !== '') || (answerData.data.naturalTranslation !== null && answerData.data.naturalTranslation !== '')">
                        <EListItem v-if="answerData.data.optimizedTranslation !== null && answerData.data.optimizedTranslation !== ''">
                            <div class="translation">
                                <div class="title">优化翻译</div>
                                <div class="content">{{answerData.data.optimizedTranslation}}</div>
                            </div>
                        </EListItem>
                        <EListItem>
                            <div class="translation" v-if="answerData.data.naturalTranslation !== null && answerData.data.naturalTranslation !== ''">
                                <div class="title">地道翻译</div>
                                <div class="content">{{answerData.data.optimizedTranslation}}</div>
                            </div>
                        </EListItem>
                    </EList>
                    <EList v-if="answerData.data.accuracy.analysis.data !== null && answerData.data.accuracy.analysis.data.length > 0">
                        <EListItem v-for="obj in answerData.data.accuracy.analysis.data">
                            <div class="mis">
                                <div class="title">{{obj.title}}</div>
                                <div class="subtitle">{{obj.position}}</div>
                                <div class="content">{{obj.reason}}</div>
                            </div>
                        </EListItem>
                    </EList>
                </div>
            </div>
        <div class="nav">
            <div class="menuItem fc" @click="refreshSentence">
                <div class="icon">refresh</div>
            </div>
            <div class="menuItem fc" @click="submitSentence">
                <div class="icon">check</div>
            </div>
            <div class="menuItem fc" @click="sentenceData.settings = !sentenceData.settings">
                <div class="icon">settings</div>
            </div>
        </div>
        <EDrawer v-model:status="sentenceData.settings" title="设置">
            <div class="settings">
                <table>
                    <tr class="settingsItem">
                        <th>字数</th><td><ERange v-model:value="sentenceData.requestData.size" /></td>
                    </tr>
                    <tr class="settingsItem">
                        <th>情感</th><td><ESelect :data="['随机', '积极', '消极']" v-model:value="sentenceData.requestData.emotion"/></td>
                    </tr>
                    <tr class="settingsItem">
                        <th>风格</th><td><ESelect :data="['随机', '正式', '口语']" v-model:value="sentenceData.requestData.style"/></td>
                    </tr>
                    <tr class="settingsItem">
                        <th>句式</th><td><ESelect :data="['随机', '陈述', '感叹', '疑问', '祈使']" v-model:value="sentenceData.requestData.type"/></td>
                    </tr>
                    <tr class="settingsItem">
                        <th>自定义</th><td><EInput v-model:value="sentenceData.requestData.custom"/></td>
                    </tr>
                </table>
            </div>
        </EDrawer>
        
        
    </div>
</template>

<script setup>
import {ref, reactive, onMounted, toRaw} from "vue";
import {generateSentenceApi, submitSentenceApi} from "@/api/sentence.js";
import EDrawer from "@/components/EDrawer.vue";
import EInput from "@/components/EInput.vue";
import ERange from "@/components/ERange.vue";
import ESelect from "@/components/ESelect.vue";
import EListItem from "@/components/EListItem.vue";
import EList from "@/components/EList.vue";
import EListProgressItem from "@/components/EListProgressItem.vue";
import ETransitionFade from "@/components/ETransitionFade.vue";

let globalLoading = ref(false);

let sentenceData = reactive({
    sentence: null,
    requestData: {
        "style": "随机",
        "emotion": "随机",
        "type": "随机",
        "size": 40,
        "custom": "",
        "id": null
    },
    settings: false,
    loading: false
});

let answerData = reactive({
    data: {
        "completeness": 0,
        "accuracy": {
            "score": 0,
            "valid": false,
            "analysis": {
                "data": []
            }
        },
        "fluency": 0,
        "naturalness": 0,
        "optimizedTranslation": null,
        "naturalTranslation": null,
        "total": 0
    },
    requestData: {
        "origin": null,
        "translation": null
    }
})

const refreshSentence = async () => {
    sentenceData.loading = true;
    globalLoading.value = true;
    let response = await generateSentenceApi(toRaw(sentenceData.requestData));
    sentenceData.sentence = response.data.data;
    globalLoading.value = false;
    sentenceData.loading = false;
}

const submitSentence = async () => {
    globalLoading.value = true;
    answerData.requestData.origin = sentenceData.sentence;
    let response = await submitSentenceApi(toRaw(answerData.requestData));
    answerData.data = response.data.data;
    globalLoading.value = false;
}

const roundBy2 = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

onMounted(async () => {
    await refreshSentence();
})

</script>

<style lang="scss" scoped>
.spin {
    animation: rotate 2s linear infinite;
}
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.appLayout {
    width: 375px;
    overflow-x: hidden;
    .top {
        position: fixed;
        left: 0;
        right: 0;
        padding: 10px 10px 10px 10px;
        font-size: 30px;
        font-weight: bold;
        background:
            linear-gradient(to bottom, transparent, #fff 100%),
            linear-gradient(to right, rgba(194, 194, 246, 0.7), rgba(212, 188, 239, 0.7), rgba(194, 194, 246, 0.7));
        backdrop-filter: blur(10px);
        .title {
        
        }
        .progress {
            margin-left: auto;
            .progressIcon {
                font-family: Icon;
                color: black;
            }
        }
    }
    .sentenceLayout {
        padding: 55px 0 60px 0;
        textarea {
            outline: none;
            width: 100%;
            padding: 10px;
            font-size: 20px;
            border: 2px solid rgb(213, 213, 213);
            border-radius: 10px;
            transition: border 0.2s;
            &:focus {
                border: 2px solid #666666;
            }
        }
        .sentenceArea {
            padding: 10px;
            .sentence {
                font-size: 20px;
            }
            .control {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .sentenceSetting {
                background-color: #7FA1C3;
                padding: 10px;
                color: white;
            }
        }
        .inputArea {
            padding: 0 10px;
            .userInput {
                width: 100%;
            }
            .control {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .answerArea {
            margin: 10px;
            background-color: #F5EDED;
            padding: 10px;
        }
        .answerAreaV2 {
            padding: 0 10px;
            & > * {
                margin: 10px 0;
            }
            .translation {
                display: flex;
                flex-direction: column;
                .title {
                    font-weight: bold;
                }
            }
            .mis {
                .title {
                    font-weight: bold;
                }
                .subtitle {
                    font-size: 15px;
                    color: #666666;
                }
            }
        }
    }
    .nav {
        z-index: 100;
        height: 60px;
        backdrop-filter: blur(20px);
        background-color: rgba(255, 255, 255, 0.5);
        position: fixed;
        bottom: 0;
        width: 100vw;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        user-select: none;
        .menuItem {
            width: 125px;
            height: 100%;
            color: black;
            transition: transform 0.2s;
            &:active {
                transform: scale(0.9);
            }
            .icon {
                font-family: Icon;
                font-size: 30px;
            }
        }
    }
    .settings {
        padding: 10px;
        .settingsItem {
            height: 50px;
            th {
                width: 80px;
            }
            td {
                width: 295px;
            }
        }
    }
}
</style>
