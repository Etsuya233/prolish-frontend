<template>
    <div class="sentenceLayout">
        <div class="sentenceArea">
            <div class="sentence">{{sentenceData.sentence}}</div>
            <div class="control">
                <button @click="refreshSentence">刷新</button>
                <button @click="sentenceData.settings = !sentenceData.settings">{{sentenceData.settings? '完成设置': '设置'}}</button>
            </div>
            <div class="sentenceSetting" v-if="sentenceData.settings">
                口语化/日常交流：
                <select v-model="sentenceData.requestData.colloquial">
                    <option>随机</option>
                    <option>是</option>
                    <option>否</option>
                </select><br>
                情感：
                <select v-model="sentenceData.requestData.emotion">
                    <option>随机</option>
                    <option>积极</option>
                    <option>消极</option>
                </select><br>
                类型：
                <select v-model="sentenceData.requestData.type">
                    <option>随机</option>
                    <option>陈述句</option>
                    <option>疑问句</option>
                    <option>祈使句</option>
                    <option>感叹句</option>
                </select><br>
                长度：<input type="text" placeholder="默认是60字以内" v-model.number="sentenceData.requestData.size"></input><br>
                自定义：
                <textarea v-model:="sentenceData.requestData.custom">自定义内容</textarea>
            </div>
        </div>
        <div class="inputArea">
            <div class="userInput">
                <textarea placeholder="请输入翻译" rows="3" v-model="answerData.requestData.translation" />
            </div>
            <div class="control">
                <button @click="submitSentence">提交</button>
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
</template>

<script setup>
import axios from "axios";
import {ref, reactive, onMounted, toRaw} from "vue";
import {generateSentenceApi, submitSentenceApi} from "@/api/sentence.js";
import EButton from "@/components/EButton.vue";

let sentenceData = reactive({
    sentence: null,
    requestData: {
        "colloquial": "随机",
        "emotion": "随机",
        "type": "随机",
        "size": 60,
        "custom": "",
        "id": null
    },
    settings: false
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
    let response = await generateSentenceApi(toRaw(sentenceData.requestData));
    sentenceData.sentence = response.data.data;
}

const submitSentence = async () => {
    answerData.requestData.origin = sentenceData.sentence;
    let response = await submitSentenceApi(toRaw(answerData.requestData));
    answerData.data = response.data.data;
}

onMounted(async () => {
})

</script>

<style scoped lang="scss">
.sentenceLayout {
    padding-bottom: 60px;
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
</style>