import axios from 'axios';

const baseUrl = "/api";

export const submitSentenceApi = (data) => {
    return axios({
        method: 'post',
        url: `${baseUrl}/submitSentence`,
        data: data
    })
}

export const generateSentenceApi = (data) => {
    return axios({
        method: 'post',
        url: `${baseUrl}/getSentence`,
        data: data
    })
}