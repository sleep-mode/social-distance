import axios from 'axios';

/* Example
import { postScore, getHighScores } from './game/utils/api';

postScore({
  id: clientId,
  nickname: name,
  message: "1등할거다",
  score: Math.floor(Math.random() * 1000)
});
getHighScores();
*/

interface ScoreData {
  id: string; // clientId
  nickname: string;
  score: number;
  message: string;
}

const reqApi = axios.create({
  baseURL: 'https://gylmaxhi6e.execute-api.ap-northeast-2.amazonaws.com/',
  timeout: 5000
});

export async function getHighScores () { // get Top 5
  let req = await reqApi.get(`/scores`);
  return req.data.Items;
}

export async function postScore (score: ScoreData) {
  let req = await reqApi.post(`/scores`, {
    id: score.id,
    date: new Date().toISOString().substring(0, 10),
    name: score.nickname,
    msg: score.message,
    score: score.score
  });
  return req;
}

