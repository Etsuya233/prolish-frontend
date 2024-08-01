<template>
    <div class="appLayout">
        <div class="title">
            Prolish
        </div>
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
                        <textarea v-model="sentenceData.requestData.custom">自定义内容</textarea>
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
        <div class="nav">
            <div class="menuItem fc" @click="refreshSentence">
                <div class="menuItemWrapper">
                    <div class="icon">refresh</div>
                    <div class="text">刷新</div>
                </div>
            </div>
            <div class="menuItem fc" @click="submitSentence">
                <div class="menuItemWrapper">
                    <div class="icon">check</div>
                    <div class="text">提交</div>
                </div>
            </div>
            <div class="menuItem fc" @click="sentenceData.settings = !sentenceData.settings">
                <div class="menuItemWrapper">
                    <div class="icon">settings</div>
                    <div class="text">设置</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted, toRaw} from "vue";
import {generateSentenceApi, submitSentenceApi} from "@/api/sentence.js";

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

<style lang="scss" scoped>
.appLayout {
    width: 375px;
    overflow-x: hidden;
    .title {
        position: fixed;
        left: 0;
        right: 0;
        padding: 10px 10px 10px 10px;
        font-size: 30px;
        font-weight: bold;
        background:
            linear-gradient(to bottom, transparent, #fff 100%),
            linear-gradient(to right, #c2c2f6, #d4bcef, #c2c2f6);
    }
    .sentenceLayout {
        padding: 55px 0 70px 0;
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
        height: 70px;
        backdrop-filter: blur(8px);
        background-color: rgba(255, 255, 255, 0.5);
        position: fixed;
        bottom: 0;
        width: 100vw;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        .menuItem {
            margin: 10px;
            width: 125px;
            height: 100%;
            color: black;
            .icon {
                font-family: Icon;
                font-size: 30px;
                padding-bottom: 5px;
            }
            .text {
                font-size: 13px;
                text-align: center;
            }
        }
    }
}
</style>
