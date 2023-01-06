import { get } from './api.js';

let questionsList = await pickQuestions();
let score = 0;

export function getQuestionsList(){
    return questionsList;
}

export function getScore(){
    return score;
}

export function increaseScore() {
    score++;
}

// resets the questionList and the score
export async function resetLeafletData() {
    questionsList = await pickQuestions();
    score = 0;
}

//gets all the questions from the database
export async function getAll() {
    return get('/data/questions');
}

// gets a question by id
export async function getById(id) {
    return get('/data/questions/' + id);
}

//from all the questions in the database, picks 5 random and returns a list
export async function pickQuestions() {
    let allQuestions = await getAll();
    let picked = [];
    for (let i = 0; i < 5; i++) {
        let random = Math.floor(Math.random() * allQuestions.length);
        picked[i] = allQuestions[random]
        allQuestions.splice(random,1);
    }
    return picked;
}
