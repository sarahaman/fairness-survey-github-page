// COMPREHENSION QUESTIONS

const QUESTION_ONE = {
    question : `To what extent do you agree with the following statement: a scenario similar to 
                the one described beforehand - where a hospital has implemented an algorithm to
                determine whether patients are seen - might occur in real life`,
    options: {
        'A' : 'Strongly Agree',
        'B' : 'Somewhat Agree',
        'C' : 'Neither Agree nor Disagree',
        'D' : 'Somewhat Disagree',
        'E' : 'Strongly Disagree'
    }
}

const QUESTION_TWO = {
    question: `Suppose a different hospital has an ER waiting room containing:
               <br>4 men that need to be seen today
               <br>6 men that do not need to be seen today
               <br>10 women that need to be seen today
               <br>10 women that do not need to be seen today`,
    subquestions : {
        'two_1' : {
            question: `Under the rule of demographic parity, if 2 men are seen today how many 
                       women would be seen?`,
            options: {'A': '2', 'B': '4', 'C':'5'}
        },
        'two_2' : {
            question: ` Under the rule of equalized odds, if 2 men who need to be seen today are 
                        seen, how many women that need to be seen today would be seen?`,
            options: {'A': '2', 'B': '4', 'C':'5'}
        },
        'two_3' : {
            question: ` Under the rule of equalized odds, if 2 men who need to be seen today are 
                        seen, how many women that need to be seen today would be seen?`,
            options: {'A': '3', 'B': '5', 'C':'6'}
        }
    }
}

const QUESTION_THREE = {
    question: `Under the rule of demographic parity, in which of these cases can more  
               men be seen today than women?`,
    options: {
        'A': 'When the men on average have higher urgency indexes than women.',
        'B': 'When there are more men in the waiting room than women.',
        'C': 'When the men are on average older than the women.',
        'D': 'This cannot happen under demographic parity.'
    }
}

const TRUE_FALSE_OPTIONS = {'True' : '', 
                            'False': ''}

const DP_EO_OPTIONS = {'Demographic Parity': 'Demographic Parity',
                       'Equalized Odds': 'Equalized Odds'}

const QUESTION_FOUR = {
    question: `For the next three questions, you will be asked to answer whether a statement is TRUE or FALSE under each of the two rules:`,
    text : {'four_1' :  `The number of men who are seen must be equal to the number of women who are seen.`,
            'four_2' :  `Even if a man and a woman are presenting with identical symptoms, they can be treated differently.`,
            'four_3' :  `The proportion of men who are seen must be equal to the proportion of women who are seen.`},
    }

// Create a radio button set for each question
var question_one_radio = create_radio_options("q1", QUESTION_ONE.options);
var question_two_1_radio = create_radio_options("q2_1", QUESTION_TWO.subquestions.two_1.options);
var question_two_2_radio = create_radio_options("q2_2", QUESTION_TWO.subquestions.two_2.options);
var question_two_3_radio = create_radio_options("q2_3", QUESTION_TWO.subquestions.two_3.options);
var question_three_radio = create_radio_options("q3", QUESTION_THREE.options);
var question_four_1_table = create_mtable("q4_1", TRUE_FALSE_OPTIONS, DP_EO_OPTIONS);
var question_four_2_table = create_mtable("q4_2", TRUE_FALSE_OPTIONS, DP_EO_OPTIONS);
var question_four_3_table = create_mtable("q4_3", TRUE_FALSE_OPTIONS, DP_EO_OPTIONS);

// Create the pages 

const COMPREHENSION_PAGE_1 = 
    `<div class="prevent-select" style="text-align: left; width: 900px;">
        Please answer the following questions. As a reminder, here are the fairness definitions:<br><br>
        <b>Demographic Parity</b>: ${DEFINITIONS['Demographic Parity']}
        <br><br>
        <b> Equalized Odds</b>: ${DEFINITIONS['Equalized Odds']}
        <br><br>
        ${QUESTION_ONE.question}
        <br><br>
        ${question_one_radio}
    </div>
    <br>
    <br>`

const COMPREHENSION_PAGE_2 =
    `<div class="prevent-select" style="text-align: left; width: 900px;">
        Please answer the following questions. As a reminder, here are the fairness definitions:<br><br>
        <b>Demographic Parity</b>: ${DEFINITIONS['Demographic Parity']}
        <br><br>
        <b> Equalized Odds</b>: ${DEFINITIONS['Equalized Odds']}
        <br><br>
        ${QUESTION_TWO.question}
        <br>
        ${QUESTION_TWO.subquestions.two_1.question}
        <br>
        ${question_two_1_radio}
        <br>
        ${QUESTION_TWO.subquestions.two_2.question}
        <br>
        ${question_two_2_radio}
        <br>
        ${QUESTION_TWO.subquestions.two_3.question}
        <br>
        ${question_two_3_radio}
    </div>
    <br>
    <br>`

const COMPREHENSION_PAGE_3 =
    `<div class="prevent-select" style="text-align: left; width: 900px;">
        Please answer the following questions. As a reminder, here are the fairness definitions:<br><br>
        <b>Demographic Parity</b>: ${DEFINITIONS['Demographic Parity']}
        <br><br>
        <b> Equalized Odds</b>: ${DEFINITIONS['Equalized Odds']}
        <br><br>
        ${QUESTION_THREE.question}
        <br>
        ${question_three_radio}
    </div>
    <br>
    <br>`

const COMPREHENSION_PAGE_4 =
    `<div class="prevent-select" style="text-align: left; width: 900px;">
        Please answer the following questions. As a reminder, here are the fairness definitions:<br><br>
        <b>Demographic Parity</b>: ${DEFINITIONS['Demographic Parity']}
        <br><br>
        <b> Equalized Odds</b>: ${DEFINITIONS['Equalized Odds']}
        <br><br>
        ${QUESTION_FOUR.question}
        <br>
        ${QUESTION_FOUR.text.four_1}
        <br>
        ${question_four_1_table}
        <br>
        ${QUESTION_FOUR.text.four_2}
        <br>
        ${question_four_2_table}
        <br>
        ${QUESTION_FOUR.text.four_3}
        <br>
        ${question_four_3_table}
    </div>
    <br>
    <br>`

    //var comprehension_pages = [PAGE_1, PAGE_2, PAGE_3, PAGE_4]