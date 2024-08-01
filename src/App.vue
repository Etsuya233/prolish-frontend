<template>
    <div class="appLayout">
        <div class="top fc">
            
            <div class="title">
                Prolish
            </div>
            <div class="progress">
                <div class="progressIcon spin" v-if="globalLoading">
                    refresh
                </div>
            </div>
        </div>
        <div class="sentenceLayout">
                <div class="sentenceArea">
                    <div v-if="!sentenceData.loading" class="sentence">{{sentenceData.sentence}}</div>
                    <div v-else class="sentence">加载中...</div>
                </div>
                <div class="inputArea">
                    <div class="userInput">
                        <textarea placeholder="请输入翻译" rows="3" v-model="answerData.requestData.translation" />
                    </div>
                </div>
                <div class="answerArea">
                    总分：{{answerData.data.total}}<br/>
                    准确度：{{answerData.data.accuracy.score}}<br/>
                    完整度：{{answerData.data.completeness}}<br/>
                    流畅度：{{answerData.data.fluency}}<br/>
                    地道度：{{answerData.data.naturalness}}<br/>
                    矫正翻译：{{answerData.data.optimizedTranslation}}<br/>
                    地道翻译：{{answerData.data.naturalTranslation}}<br/>
                    <div class="mistake" v-for="mis in answerData.data.accuracy.analysis.data" >
                        <hr>
                        {{mis.title}}<br/>
                        {{mis.position}}<br/>
                        {{mis.reason}}<br/>
                    </div>
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

let globalLoading = ref(false);

let sentenceData = reactive({
    sentence: null,
    requestData: {
        "style": "随机",
        "emotion": "随机",
        "type": "随机",
        "size": 60,
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
    answerData.requestData.origin = sentenceData.sentence;
    let response = await submitSentenceApi(toRaw(answerData.requestData));
    answerData.data = response.data.data;
}

onMounted(async () => {

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
            linear-gradient(to right, #c2c2f6, #d4bcef, #c2c2f6);
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
        .sentenceArea {
            padding: 10px;
            .sentence {
                font-size: 25px;
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
            padding: 10px;
            width: 375px;
            .userInput {
                width: 100%;
                textarea {
                    width: 100%;
                    padding: 10px;
                    font-size: 25px;
                    border: 2px solid;
                    border-radius: 10px;
                }
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
    }
    .nav {
        z-index: 100;
        height: 60px;
        backdrop-filter: blur(8px);
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
