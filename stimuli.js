// ---- config.js ----
// How many persons we want to generate
const NUM_PERSONS = 6;

// Possible ESI scores and a translation of their relative 
// urgency into plain text
const ESI_URGENCY_DICTIONARY = {
    "1": "Most urgent",
    "2": "Mostly urgent",
    "3": "Moderately urgent",
    "4": "A little urgent",
    "5": "Not urgent"
}

// ESI scores of 3 and greater are considered urgent
const ESI_URGENCY_THRESHOLD = 3;

// A consistent fairness scale used when rating how fair a
// particular model is
const FAIRNESS_SCALE = {
    "1" : "Extremely unfair",
    "2" : "",
    "3" : "",
    "4" : "Neither fair nor unfair",
    "5" : "",
    "6" : "",
    "7" : "Extremely fair"
}

// Definitions of each fairness metric
const DEFINITIONS = {
    'Demographic Parity' : `The fraction of patients that <i>are seen</i> today that are male should 
                            equal the fraction of patients that are male. Similarly, the fraction 
                            of patients that <i>are seen</i> today that are female should be equal to 
                            the fraction of patients that are female.`,

    'Equalized Odds' : `The fraction of patients that <b>should be seen today</b> and <i>are seen today</i> that 
                        are men is equal to the fraction of patients that <b>should be seen today</b> and 
                        <i>are seen today</i> that are women.` 
}

// Shorthand used for each fairness metric model type when storing data
const MODEL_SHORTHAND = {
    "No Correction": "control",
    "Demographic Parity": "dp",
    "Equalized Odds" : "eo"
}


// ---- utils.js ----
// NEED TO COMMENT ALL OF THIS  

function swap(obj) { 
    return Object.fromEntries(Object.entries(obj).map(a => a.reverse()))
}

function format_into_underscores(str){
    return str.toLowerCase().replace(/\s+/g, '_');
}

// Creating radio buttons
function create_radio_button(category, value, text){
    let id = category + "_" + value;
    return `<label for="${id}">
        <div class="vmulti">
                <input name="${category}" type="radio" value="${value}" id="${id}" />
                ${text}
            </div>
        </label>
        `;
}

function create_radio_options(question_id, option_dict){
    options_html = '';

    for (let [value, text] of Object.entries(option_dict)){
        radio_option = create_radio_button(question_id, value, text)
        options_html += radio_option
    }

    return options_html
}

// Creating matrix tables
function create_mtable_scale(scale_dict){
    let scale_html = `<div class="mtable-scale-container">
                      <div class="mtable-scale-spacer"></div>`;

    for (let [point, text] of Object.entries(scale_dict)){
        scale_point = `<div class="mtable-scale-point">${point}<br>${text}</div>`
        scale_html += scale_point
    }

    scale_html += "</div>"

    return scale_html
}

function create_mtable_variable(label, text, num_points){
    let variable_html = `<div class="mtable-statement-container">
                        <div class="mtable-statement-text">${text}</div>`;

    for (let i = 1; i <= num_points; i++) {
        let point = i.toString()
        let id = `${label}_${point}`
        let statement_point = `<label class="mtable-statement-point" for="${point}">
                                <input name="${label}" type="radio" value="${point}" id="${id}" />
                            </label>`
        variable_html += statement_point
    }

    variable_html += '</div>'
    return variable_html;
}

function create_mtable(measure, scale_dict, variable_dict){
    let num_points = Object.keys(scale_dict).length;
    let mtable_html = `<div class="mtable-container">`

    // Create the scale
    let scale = create_mtable_scale(scale_dict);
    mtable_html += scale;

    // Create the statements
    for (let [label, text] of Object.entries(variable_dict)){
        let question_id_label = `${measure}_${label}`
        let variable = create_mtable_variable(question_id_label, text, num_points)
        mtable_html += variable;
    }
    
    mtable_html += '</div>'
    return mtable_html;
}

// ---- experiment_introduction.js ----
// ---------- INTRODUCTION PAGE ---------- //

const introduction_page_text = `
    Thank you for agreeing to participate in this study. The study will have two parts: <br> <br> 
        
    In the first part, you will walk through an example situation about trying to be fair to men 
    and women when admitting patients to an ER at a hospital. You will learn that there are multiple 
    ways to define being "fair" and that those definitions can conflict with each other. After the
    example, there will be some questions assessing your understanding of the defintions of fairness 
    (these will not affect your payment in any way).<br><br>

    In the second part, you will see the differnt fairness definitions in action on a real world data and 
    have a chance to evaluate how they perform.<br><br>

    When you are ready, click "Next" to begin part one. <br><br>
    `

const introduction_page = `
    <div class="compare-instructions-display">
    </div>
    <br> 
    <br>
    <hr>
    <p style="text-align: left; width: 900px;">
        ${introduction_page_text}
    </p>
    `

// ---- explanation.js ----

// --------- EXPLANATION PAGES --------- //
// NEED TO ADD COMMENTS - 09/09

const GENDER_GROUP = {
    NONE_1 : "group1 nogroup",
    NONE_2: "group2 nogroup",
    WOMEN : "group1",
    MEN : "group2"
};

const GROUP_TOTALS = {
    URGENT_WOMEN: "12",
    URGENT_MEN: "8",
    NONURGENT_WOMEN: "8",
    NONURGENT_MEN: "12",
    UNGROUPED: "20"
};

const STATUS_GROUP = {
    SELECTED : "selected",
    UNSELECTED: ""
};

const SELECTION_PATTERNS = {
  DEFAULT: [0, 0, 0, 0],
  CONTROL: [10, 2, 6, 2],
  DEMOGRAPHIC_PARITY: [8, 2, 8, 2],
  EQUALIZED_ODDS: [9, 2, 6, 3]
};

const EXPLANATION_PAGE_CONFIG = {
    page_1: {
        page_text : `Suppose we have 40 people waiting in an emergency room, and we can only see 20 of them within the hour. 
                     <br> <br> Some people have urgent conditions and need to be seen immediately, while others can wait 
                     until later. We'll highlight the people who need to be seen immediately in a darker gray.`,
        selection_order: SELECTION_PATTERNS.DEFAULT
    },

    page_2: {
        page_text : `We would like to see the people who need to be seen, and wait to see the people who can wait. 
                     However, we are likely to make some mistakes in our decision process, so we might end up 
                     seeing a set of people like this.`, 
        selection_order: SELECTION_PATTERNS.CONTROL
    },

    page_3: {
        page_text : `Now suppose that our population of patients is made up of half women (purple) and half men 
                     (green).<br> <br>Again, among both women and men, some patients need to be seen today (darker 
                     colors) while others do not (lighter colors). Let's examine our original selection with gender 
                     shown.`,
        selection_order: SELECTION_PATTERNS.DEFAULT
    }, 

    page_4: {
        page_text : `Now that we are paying attention to gender, we are arguably being unfair to the men. Despite 
                     making up half of the population, men are only 8 / 20 = 40% of the selected patients. In other 
                     words, patients have a lower chance of being selected simply by being men. <br> This is arguably 
                     a problem if we want to be fair. How might we fix this?`,
        selection_order: SELECTION_PATTERNS.CONTROL
    },

    page_5: {
        page_text : `One solution, called <b>Demographic Parity</b>, is to make sure that we select a pool of patients 
                     that is representative of the whole population. So, since our patient population is split evenly 
                     between women and men, we will make sure to select 10 women and 10 men. In this scenario, we might 
                     get a selection like this. <br> <br> Now, women and men have an equal chance of being selected.`,
        selection_order: SELECTION_PATTERNS.DEMOGRAPHIC_PARITY
    },

    page_6: {
        page_text : `However, now we are arguably being unfair to the women. <br> <br> Of the people who need to be seen today 
             (darker squares), women have only an 8 / 12 = 66.7% chance of being selected, while men have an 8 / 8 = 100% chance. 
             In other words, patients who need to be seen have a lower chance of being selected simply by being women. <br> <br>
             Like before, this is arguably a problem if we want to be fair. How might we fix this?`,
        selection_order: SELECTION_PATTERNS.DEMOGRAPHIC_PARITY
    },

    page_7: {
        page_text : `In another solution, called <b>Equalized Odds</b>, we will make sure that women and men who need to be seen today 
             have an equal chance of being selected. We will do the same for patients who do not need to be seen today. <br> <br>
             So, of the patients who need to be seen today, we will select 9 / 12 = 75% of the women, and we will select 6 / 8 = 75% 
             of the men. Similarly, of the patients who do not need to be seen today, we will select 2 / 8 = 25% of the women, and 
             we will select 3 / 12 = 25% of the men. <br> <br> Now, women and men who need to be seen today have an equal chance of 
             being selected.`,
        selection_order: SELECTION_PATTERNS.EQUALIZED_ODDS
    },

    page_8: {
        page_text : `However, we now no longer have <b>Demographic Parity</b>. <br> <br> Despite making up half of the population, men make up 
             only 9 / 20 = 45% of the selected patients. In fact, it is impossible to satisfy both of the solutions we have considered here.
             <br> <br> Next, we will ask you some questions about these fairness definitions. Note that your answers to these will 
             not affect your payment in any way.`,
        selection_order: SELECTION_PATTERNS.EQUALIZED_ODDS
    }
};

// --- Creating the explanation squares --- //

// Generate a person element
const generate_person = (status) => `<div class="person ${status}"></div>`;

// Create an array of like person elements
const generate_person_elements = (status, count) =>
    Array.from({ length: count }, () => generate_person(status)).join('');

// Generate selected and unselected persons for a given group and urgency type
const generate_subcontainer = (urgency_type, num_selected, num_unselected) =>`
    <div class="${urgency_type}">
        ${generate_person_elements(STATUS_GROUP.SELECTED, num_selected)}
        ${generate_person_elements(STATUS_GROUP.UNSELECTED, num_unselected)}
    </div>
    `;

// Generate a group container with both urgency types
// NOTE: pos = urgent, neg = non-urgent; inherited from previous code
const generate_group_container = (group, pos_selected, pos_unselected, neg_selected, neg_unselected) => `
    <div class="group-container ${group}">
        ${generate_subcontainer('pos-container', pos_selected, pos_unselected)}
        ${generate_subcontainer('neg-container', neg_selected, neg_unselected)}
    </div>
    `;

// Creates the full set of person elements (squares) for all groups
// Rename - 09/08
function generate_squares(groups, selection_pattern) {
    TOTALS = [12, 8, 8, 12]
    var squares_html = '<div class="groups">';
    
    // Process each group
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const pos_selected = selection_pattern[i * 2];
        const pos_unselected = TOTALS[i * 2] - pos_selected;
        const neg_selected = selection_pattern[i * 2 + 1];
        const neg_unselected = TOTALS[i * 2 + 1] - neg_selected;
        
        const group_container = generate_group_container(
            group,
            pos_selected,
            pos_unselected,
            neg_selected,
            neg_unselected
        );
        
        squares_html += group_container;
    }
    
    squares_html += '</div>';
    return squares_html;
}

// --- Create the explanation pages --- //

const create_proportion_text = (group_id, group_label, num_selected, total) => `
    <div id="numbers_${group_id}">
            ${group_label}
            ${num_selected} / ${total} selected
        </div>
    `;

const GROUP_LABELS = {
    URGENT_UNGROUPED: `<b>Urgent Patients</b><br>`,
    NONURGENT_UNGROUPED: `<b>Non-Urgent Patients</b><br>`,
    URGENT_WOMEN: `<b>Women</b><br><b>Urgent Patients</b><br>`,
    URGENT_MEN: `<b>Men</b><br><b>Urgent Patients</b><br>`,
    NONURGENT_WOMEN: `<b>Women</b><br><b>Non-Urgent Patients</b><br>`,
    NONURGENT_MEN: `<b>Men</b><br><b>Non-Urgent Patients</b><br>`
}

// Tidy this into prettier functions at some point; can probably be done 
// in a more organized fashion - SH 09/09
const get_selection_count_grouped = (selections, index) => 
    selections[index] == 0 ? '?' : String(selections[index]);

const get_selection_count_ungrouped = (selections, index_1, index_2) => 
    selections[index_1] == 0 ? '?' : String(selections[index_1] + selections[index_2]);

function create_explanation_pages(page, config){
    const is_grouped_page = page !== "page_1" && page !== "page_2";
    const groups = is_grouped_page ?
        [GENDER_GROUP.WOMEN, GENDER_GROUP.MEN] :
        [GENDER_GROUP.NONE_1, GENDER_GROUP.NONE_2]; // tech debt ;_;
    
    var pos_text = ""; // positive / urgent
    var neg_text = ""; // negative / non-urgent

    if (is_grouped_page) {
        pos_text = `
            <div class="numbers grouped">
                ${create_proportion_text("pos_1", GROUP_LABELS.URGENT_WOMEN,
                    get_selection_count_grouped(config.selection_order, 0),
                    GROUP_TOTALS.URGENT_WOMEN)}
                ${create_proportion_text("pos_2", GROUP_LABELS.URGENT_MEN,
                    get_selection_count_grouped(config.selection_order, 2),
                    GROUP_TOTALS.URGENT_MEN)}
            </div>
        `;
        
        neg_text = `
            <div class="numbers grouped">
                ${create_proportion_text("neg_1", GROUP_LABELS.NONURGENT_WOMEN,
                    get_selection_count_grouped(config.selection_order, 1),
                    GROUP_TOTALS.NONURGENT_WOMEN)}
                ${create_proportion_text("neg_2", GROUP_LABELS.NONURGENT_MEN,
                    get_selection_count_grouped(config.selection_order, 3),
                    GROUP_TOTALS.NONURGENT_MEN)}
            </div>
        `;
    } else {
        pos_text = `<div class="numbers ungrouped">${create_proportion_text("pos",
            GROUP_LABELS.URGENT_UNGROUPED,
            get_selection_count_ungrouped(config.selection_order, 0, 2),
            GROUP_TOTALS.UNGROUPED)}</div>`;
            
        neg_text = `<div class="numbers ungrouped">${create_proportion_text("neg",
            GROUP_LABELS.NONURGENT_UNGROUPED,
            get_selection_count_ungrouped(config.selection_order, 1, 3),
            GROUP_TOTALS.UNGROUPED)}</div>`;
    }

    return `
        <div class="display-container">
            ${pos_text}
            ${generate_squares(groups, config.selection_order)}
            ${neg_text}
        </div>
        <p class="instructions-paragraph" style="text-align: left;">
            ${config.page_text}
        </p>
    `;
}

const explanation_pages = Object.entries(EXPLANATION_PAGE_CONFIG)
    .map(([page, config]) => create_explanation_pages(page, config));



// ---- comprehension.js ----
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
    question: `Suppose a different hospital has an ER waiting room containing:<br>
               <br>4 men that need to be seen today
               <br>6 men that do not need to be seen today
               <br>10 women that need to be seen today
               <br>10 women that do not need to be seen today<br>`,
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
    question: `For the next three questions, you will be asked to answer whether a statement is TRUE or FALSE under each of the two rules:<br>`,
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

// ---- definition_evaluation.js ----

// INITIAL EVALUATION

const er_fairest_radio = create_radio_options("er_fairest", swap(MODEL_SHORTHAND))
const initial_eval_mtable = create_mtable("initial_eval", FAIRNESS_SCALE, swap(MODEL_SHORTHAND))

const initial_eval_questions = `
    <div class="prevent-select" style="text-align: left; width: 900px;">
        Please answer the following questions. As a reminder, here are the fairness definitions:<br><br>
        <b>Demographic Parity</b>: ${DEFINITIONS['Demographic Parity']}
        <br><br>
        <b> Equalized Odds</b>: ${DEFINITIONS['Equalized Odds']}
        <br><br>
        In the context of admitting patients to an Emergency Room, which of the fairness definitions do you think is most fair to apply to men and women?
        <br>
        ${er_fairest_radio}
        <br>
        In the context of admitting patients to an Emergency Room, how fair do you think it is to apply each definition to men and women?
        ${initial_eval_mtable}
        <br>
    </div>
    <br>
`

// ---- comparison_instructions.js ----
const INSTRUCTIONS_FOR_COMPARISONS_PAGE_TEXT = {
    page_1: `In the next portion of the experiment, you will see how the fairness definitions you just learned about might be applied in 
             the real world. <br><br> Specifically, you will examine decisions made on Emergency Room (ER) patients.`,
    
    page_2: `In each round, you will see a set of six patients, learning their chief complaint, gender, and level of urgency (ranging 
             from not urgent to the most urgent).<br><br> Each patient's chief complaint is the main symptom or issue that they 
             reported to the intake desk at the ER. Examples include chest pain, fatigue, and arm injury.<br><br>Each patient's 
             gender will be indicated by the color of their rectangle. Women will apear in purple, and men in green.<br><br>`,

    page_3: `For each group of six patients, you will see how three models decide to admit or deny the patients.<br><br>Admitted patients 
             will have a thick dark outline, while denied patients will not.`,

    page_4: `The three models that you see will be trained on different fairness goals with regard to the gender of the patients (i.e., 
             different ways of trying to make sure men and women are treated fairly).<br><br>One will try to achieve demographic parity, 
             another equalized odds, and the third will not try to achieve any fairness definition.<br><br>However, you will not be told 
             which model is which.`,

    page_5: `After seeing the decisions of each model, you will be asked to rate the models on how fair they are to men and women. You 
             will also be asked to choose which model you think is the most fair.<br><br>There will be [number] rounds of this. Press 
             the button below to begin. `
}

function create_example_patient(person_id, gender, age, complaint, esi){
    let esi_text = ESI_URGENCY_DICTIONARY[esi]
    let urgency_status = "nonurgent"; // Always non-urgent

    const example_patient_html = `
        <div class="profile ${person_id} ${gender} ${urgency_status}" id=${person_id}">
            <div class="profile-col profile-text">
                <div>
                    <b>Age:</b> ${age}<br>
                    <b>Gender:</b> ${gender}<br>
                    <b>Complaint:</b> 
                    <br>
                    ${complaint}
                    <br>
                    <b>Urgency:</b>
                    ${esi_text}
                </div>
            </div>
        </div>
    `
    return example_patient_html
};

const EXAMPLE_PATIENTS = {
    "PATIENT 1": create_example_patient("1", "Woman", "62", "Fatigue", "1"),
    "PATIENT 2": create_example_patient("2", "Woman", "29", "Nausea", "4"),
    "PATIENT 3": create_example_patient("3", "Man", "45", "Arm Injury", "2"),
    "PATIENT 4": create_example_patient("4", "Man", "34", "Leg Pain", "5")
}

// Create the comparison instructions pages

const compare_instructions_page1 = `
    <div class="compare-instructions-display"></div>
    <br><br>
    <hr>
    <p style="text-align: left; width: 900px;">
    ${INSTRUCTIONS_FOR_COMPARISONS_PAGE_TEXT.page_1}
    </p>
`

const compare_instructions_page2 = `
    <div class="compare-instructions-display">
        <div class="profiles-container" style="width: 50%; margin: auto;">
        ${EXAMPLE_PATIENTS["PATIENT 1"]}
        ${EXAMPLE_PATIENTS["PATIENT 2"]}
        ${EXAMPLE_PATIENTS["PATIENT 3"]}
        ${EXAMPLE_PATIENTS["PATIENT 4"]}
        </div>
    </div>
    <br><br>
    <hr>
    <p style="text-align: left; width: 900px;">
    ${INSTRUCTIONS_FOR_COMPARISONS_PAGE_TEXT.page_2}
    </p>
`

const compare_instructions_page3 = `
    <div class="compare-instructions-display">
        <div class="profiles-container" style="width: 50%; margin: auto;">
        ${EXAMPLE_PATIENTS["PATIENT 1"]}
        ${EXAMPLE_PATIENTS["PATIENT 2"]}
        ${EXAMPLE_PATIENTS["PATIENT 3"]}
        ${EXAMPLE_PATIENTS["PATIENT 4"]}
        </div>
    </div>
    <br><br>
    <hr>
    <p style="text-align: left; width: 900px;">
    ${INSTRUCTIONS_FOR_COMPARISONS_PAGE_TEXT.page_3}
    </p>
`

const compare_instructions_page4 = `
    <div class="compare-instructions-display">
        <div class="model-explain">
            <div class="model-explain-stack">
                <span>Model A</span>
                <span>Model B</span>
                <span>Model C</span>
            </div>
            <div class="model-explain-stack">
                <div class="line left" style="transform: rotate(30deg);"></div>
                <div class="line left"></div>
                <div class="line left" style="transform: rotate(-30deg);"></div>
            </div>
            <div class="model-explain-stack">
                <span style="font-size: 40px;">?</span>
            </div>
            <div class="model-explain-stack">
                <div class="line right" style="transform: rotate(-30deg);"></div>
                <div class="line right"></div>
                <div class="line right" style="transform: rotate(30deg);"></div>
            </div>
            <div class="model-explain-stack">
                <span>No Fairness</span>
                <span>Demographic Parity</span>
                <span>Equalized Odds</span>
            </div>
        </div>
    </div>
    <br>
    <br>
    <hr>
    <p style="text-align: left; width: 900px;">
    ${INSTRUCTIONS_FOR_COMPARISONS_PAGE_TEXT.page_4}
    </p>
`

const compare_instructions_page5 = `
    <div class="compare-instructions-display">
    </div>
    <br>
    <br>
    <hr>
    <p style="text-align: left; width: 900px;">
    ${INSTRUCTIONS_FOR_COMPARISONS_PAGE_TEXT.page_5}
    </p>
`
const comparison_instructions = [
    compare_instructions_page1,
    compare_instructions_page2,
    compare_instructions_page3,
    compare_instructions_page4,
    compare_instructions_page5
];


// ---- compare_models.js ----

function create_person(persons, model, n){
    let person_id = `person-${n}`;
    let esi = parseInt(persons[n]["esi"]);
    let esi_text = ESI_URGENCY_DICTIONARY[esi]
    let gender = persons[n]["gender"];
    const urgency_status = "nonurgent";

    let person_html = `
            <div class="profile ${persons[n]["decisions"][model]} ${gender} ${urgency_status}" id=${person_id}>
                <div class="profile-col profile-text">
                    <div>
                        <b>Age:</b> ${persons[n]["age"]}<br>
                        <b>Gender:</b> ${gender}<br>
                        <b>Complaint:</b> 
                        <br>
                        ${persons[n]["complaint"]}
                        <br>
                        <b>Urgency:</b>
                        ${esi_text}
                    </div>
                </div>
            </div>
    `
    return person_html
}

function profile_column(persons, model) {
    // Initialize the profile container class
    let profile_column_html = '<div class="profiles-container">';

    // Create person blocks for each 
    for (let i = 0; i < NUM_PERSONS; i++) {
         profile_column_html += create_person(persons, model, i);
        } 
    
    profile_column_html += "</div>";

    return profile_column_html

}

function compare_models_stimulus(persons) {
    let models = ["control", "dp", "eo"]
    shuffleArray(models)

    // Create models scale 
    let ANONYMIZED_MODELS = {
        "Model A" : models[0],
        "Model B" : models[1],
        "Model C" : models[2]
    };

    let fairness_mtable_html = create_mtable("fair", FAIRNESS_SCALE, swap(ANONYMIZED_MODELS))
    let fairness_radio_html = create_radio_options("fairest", swap(ANONYMIZED_MODELS))

    let string = `
        <div class="stimulus-wrapper">
            <div class="models-container">
                <div class="profiles-label">Model A</div>
                <div class="profiles-label">Model B</div>
                <div class="profiles-label">Model C</div>
                ${profile_column(persons, ANONYMIZED_MODELS['Model A'])}
                ${profile_column(persons, ANONYMIZED_MODELS['Model B'])}
                ${profile_column(persons, ANONYMIZED_MODELS['Model C'])}
            </div>
            <br>
            <br>
            <div class="questions-container">
                <div class="prevent-select" style="text-align: left;">
                    How fair do you think each model is?
                    <br>
                    ${fairness_mtable_html}
                    <br>
                    In this example, which model do you think is the most fair?
                    <br>
                    ${fairness_radio_html}
                </div>
            </div>
            <br>
        </div>
        <button class="model-compare-button" onclick="compare_models_check_finish()">Done</button>
        <br><br>
        </div>
    `

    return string
}

function compare_models_check_finish() {
    // check that they have answered all questions
    try {
        current_fairest = document.querySelector('input[name="fairest"]:checked').value
        current_fair_control = document.querySelector('input[name="fair_control"]:checked').value
        current_fair_dp = document.querySelector('input[name="fair_dp"]:checked').value
        current_fair_eo = document.querySelector('input[name="fair_eo"]:checked').value
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Please answer all questions on the page.")

            return
        } else {
            throw err
        }
    }

    jsPsych.finishTrial()
}


