import axios from 'axios';
import { encodeScore, decodeScore } from "./helpers";

const reqApi = axios.create({
  baseURL: 'https://gylmaxhi6e.execute-api.ap-northeast-2.amazonaws.com/',
  timeout: 5000
});

export async function getHighScores () {
  let req = await reqApi.get(`/scores?limit=9`);
  return req.data.Items.map(item => {
    return { name: item.name, time: decodeScore(item.score)}
  });
}

export async function postScore (name, time) {
  const score = encodeScore(time);
  let req = await reqApi.post(`/scores`, {
    date: new Date().toISOString().substring(0, 10),
    name,
    score
  });
  return req;
}

