// COMPREHENSION QUESTIONS

const QUESTION_ONE = {
    question: `Suppose a different hospital has an ER waiting room containing:<br>
               <br>4 men that need to be seen today
               <br>6 men that do not need to be seen today
               <br>10 women that need to be seen today
               <br>10 women that do not need to be seen today`,
    subquestions : {
        'one_1' : {
            question: `<br>Under the rule of demographic parity, if 2 men are seen today how many 
                       women would be seen?<br>`,
            options: {'A': '2', 'B': '4', 'C':'5'}
        },
        'one_2' : {
            question: `<br>Under the rule of equalized odds, if 2 men who need to be seen today are 
                        seen, how many women that need to be seen today would be seen?<br>`,
            options: {'A': '2', 'B': '4', 'C':'5'}
        },
        'one_3' : {
            question: `<br>Under the rule of equalized odds, if 2 men who need to be seen today are 
                        seen, how many women that need to be seen today would be seen?<br>`,
            options: {'A': '3', 'B': '5', 'C':'6'}
        }
    }
}

const QUESTION_TWO = {
    question: `Under the rule of demographic parity, in which of these cases can more  
               men be seen today than women?`,
    options: {
        'A': 'When, on average, the men need to be seen more urgently than the women.',
        'B': 'When there are more men in the waiting room than women.',
        'C': 'When the men are on average older than the women.',
        'D': 'This cannot happen under demographic parity.'
    }
}

const TRUE_FALSE_OPTIONS = {'True' : '', 
                            'False': ''}

const DP_EO_OPTIONS = {'Demographic Parity': 'Demographic Parity',
                       'Equalized Odds': 'Equalized Odds'}

const QUESTION_THREE = {
    question: `For the next three questions, you will be asked to answer whether a statement is TRUE or FALSE under each of the two rules:<br>`,
    text : {'three_1' :  `The number of men who are seen is always equal to the number of women who are seen.`,
            'three_2' :  `Even if a man and a woman are presenting with identical symptoms, they can be treated differently.`,
            'three_3' :  `The proportion of men who are seen is always equal to the proportion of women who are seen.`},
    }

const QUESTION_FOUR = {
    question : `To what extent do you agree with the following statement: a scenario similar to 
                the one described beforehand - where a hospital has implemented an algorithm to
                determine whether patients are seen - might occur in real life.<br>`,
    options: {
        'A' : 'Strongly Agree',
        'B' : 'Somewhat Agree',
        'C' : 'Neither Agree nor Disagree',
        'D' : 'Somewhat Disagree',
        'E' : 'Strongly Disagree'
    }
}
// Create a radio button set for each question
var question_one_1_radio = create_radio_options("q1_1", QUESTION_ONE.subquestions.one_1.options);
var question_one_2_radio = create_radio_options("q1_2", QUESTION_ONE.subquestions.one_2.options);
var question_one_3_radio = create_radio_options("q1_3", QUESTION_ONE.subquestions.one_3.options);
var question_two_radio = create_radio_options("q2", QUESTION_TWO.options);
var question_three_1_table = create_mtable("q3_1", TRUE_FALSE_OPTIONS, DP_EO_OPTIONS);
var question_three_2_table = create_mtable("q3_2", TRUE_FALSE_OPTIONS, DP_EO_OPTIONS);
var question_three_3_table = create_mtable("q3_3", TRUE_FALSE_OPTIONS, DP_EO_OPTIONS);
var question_four_radio = create_radio_options("q4", QUESTION_FOUR.options);


// Create the pages 
function createComprehensionPage(question, subquestion = null, responseElement = '') {
    return `
        <div class="prevent-select" style="text-align: left; width: 900px;">

        Please answer the following questions. As a reminder, here are the fairness definitions:<br><br>

        <b>Demographic Parity</b>: ${DEFINITIONS['Demographic Parity']}<br><br>
        <b>Equalized Odds</b>: ${DEFINITIONS['Equalized Odds']}<br><br>

        ${question}
        ${subquestion ? `<br>${subquestion}` : ''}
        <br>
        ${responseElement}
        </div>
        <br><br>
    `;
}

// Declare the comprehension pages
const COMPREHENSION_PAGE_1_1 = createComprehensionPage(
    QUESTION_ONE.question,
    QUESTION_ONE.subquestions.one_1.question,
    question_one_1_radio
);

const COMPREHENSION_PAGE_1_2 = createComprehensionPage(
    QUESTION_ONE.question,
    QUESTION_ONE.subquestions.one_2.question,
    question_one_2_radio
);

const COMPREHENSION_PAGE_1_3 = createComprehensionPage(
    QUESTION_ONE.question,
    QUESTION_ONE.subquestions.one_3.question,
    question_one_3_radio
);

const COMPREHENSION_PAGE_2 = createComprehensionPage(
    QUESTION_TWO.question,
    null,
    question_two_radio
);

const COMPREHENSION_PAGE_3_1 = createComprehensionPage(
    QUESTION_THREE.question,
    QUESTION_THREE.text.three_1,
    question_three_1_table
);

const COMPREHENSION_PAGE_3_2 = createComprehensionPage(
    QUESTION_THREE.question,
    QUESTION_THREE.text.three_2,
    question_three_2_table
);

const COMPREHENSION_PAGE_3_3 = createComprehensionPage(
    QUESTION_THREE.question,
    QUESTION_THREE.text.three_3,
    question_three_3_table
);

const COMPREHENSION_PAGE_4 = createComprehensionPage(
    QUESTION_FOUR.question,
    null,
    question_four_radio
);

var comprehension_pages = [COMPREHENSION_PAGE_1_1, COMPREHENSION_PAGE_1_2, COMPREHENSION_PAGE_1_3,
                            COMPREHENSION_PAGE_2,
                            COMPREHENSION_PAGE_3_1, COMPREHENSION_PAGE_3_2, COMPREHENSION_PAGE_3_3,
                            COMPREHENSION_PAGE_4];