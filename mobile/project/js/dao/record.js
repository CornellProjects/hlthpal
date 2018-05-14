/**
 * Data access object holding all the required fields that make up a record.
 */
export default class Record {

    constructor(answers, symptoms, score) {
        this.answers = answers;
        this.symptoms = symptoms;
        this.score = score;
    }

}