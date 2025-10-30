///// SETUP /////

// initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData()
    }
})

const dp_first = Math.random() > 0.5

// Add subject properties to the data array

// Assigns each subject a (unique?) random identifier
const subject_id = jsPsych.randomization.randomID(10)

// Captures the subject's prolific ID
const url_pid = jsPsych.data.getURLVariable("PROLIFIC_PID")

jsPsych.data.addProperties({
    subject_id: subject_id, 
    prolific_id: url_pid
})

var current_persons = null
var current_fairest = null
var current_fair_control = null
var current_fair_dp = null
var current_fair_eo = null

///// TRIALS /////

// consent form
// const consent = {
//     type: jsPsychHtmlButtonResponse,
//     stimulus: consent_html,
//     choices: ["Consent NOT given", "Consent given"],
//     button_html: [
//         `<button class="jspsych-btn" onclick="window.open('https://app.prolific.com/submissions/complete?cc=C18LAPRX', '_blank')">%choice%</button>`,
//         `<button class="jspsych-btn">%choice%</button>`
//     ],
//     on_finish: function(data) {
//         // if no consent, send back to prolific with no consent code
//         if (data.response == 0) {
//             document.getElementById("jspsych-content").style.margin = "auto"

//             jsPsych.endExperiment(
//                 "You chose not to consent to participate.<br>If you were not automatically directed back to Prolific, please go back and enter the completion code C18LAPRX"
//             )
//         }
//     },
//     data: {
//         type_of_trial: "consent"
//     }
// }

// prolific id, instructions
// const prolific_id = {
//     type: jsPsychSurveyText,
//     questions: [
//         {
//             prompt: "Please copy and paste your Prolific ID here.",
//             name: "prolific_id",
//             required: true
//         }
//     ],
//     data: {
//         type_of_trial: "prolific"
//     },
//     on_load: function() {
//         document.getElementById("jspsych-content").style.margin = "auto"

//         if (url_pid) {
//             jsPsych.finishTrial()
//         }
//     },
//     on_finish: function(data) {
//         document.getElementById("jspsych-content").style.margin = "50px auto"

//         if (data.response) {
//             data.prolific_id_man = data.response["prolific_id"]
//         }
//     }
// }



const first_instructions = {
    type: jsPsychInstructions,
    pages: function() {
        let pages = []

        pages.push(
            introduction_page,
        )

        return pages
    },
    allow_keys: false,
    show_clickable_nav: true,
    show_page_number: true,
    on_load: function() {
        document.getElementById("jspsych-content").style.margin = "50px auto"
    },
    data: {
        type_of_trial: "first_instructions"
    }
}

const explanation = {
    type: jsPsychInstructions,
    pages: function() {
        return explanation_pages
    },
    allow_keys: false,
    show_clickable_nav: true,
    show_page_number: true,
    data: {
        type_of_trial: "explanation"
    }
}

const comprehension_one = {
    type: jsPsychSurveyHtmlForm,
    html: COMPREHENSION_PAGE_1,
    on_load: function() {
        document.getElementById("jspsych-content").style.margin = "50px auto"
    },
    data: {
        type_of_trial: "comprehension"
    }
}

const comprehension_two = {
    type: jsPsychSurveyHtmlForm,
    html: COMPREHENSION_PAGE_2,
    on_load: function() {
        document.getElementById("jspsych-content").style.margin = "50px auto"
    },
    data: {
        type_of_trial: "comprehension"
    }
}

const comprehension_three = {
    type: jsPsychSurveyHtmlForm,
    html: COMPREHENSION_PAGE_3,
    on_load: function() {
        document.getElementById("jspsych-content").style.margin = "50px auto"
    },
    data: {
        type_of_trial: "comprehension"
    }
}

const comprehension_four = {
    type: jsPsychSurveyHtmlForm,
    html: COMPREHENSION_PAGE_4,
    on_load: function() {
        document.getElementById("jspsych-content").style.margin = "50px auto"
    },
    data: {
        type_of_trial: "comprehension"
    }
}
const initial_eval = {
    type: jsPsychSurveyHtmlForm,
    html: initial_eval_questions,
    on_load: function() {
        document.getElementById("jspsych-content").style.margin = "50px auto"
    },
    data: {
        type_of_trial: "initial_eval"
    }
}

const compare_instructions = {
    type: jsPsychInstructions,
    pages: function() {
        let pages = []

        pages.push(
            compare_instructions_page1,
            compare_instructions_page2,
            compare_instructions_page3,
            compare_instructions_page4,
            compare_instructions_page5
        )

        return pages
    },
    allow_keys: false,
    show_clickable_nav: true,
    show_page_number: true,
    on_load: function() {
        document.getElementById("jspsych-content").style.margin = "50px auto"
    },
    data: {
        type_of_trial: "compare_instructions"
    }
}

const compare_models = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        return compare_models_stimulus(jsPsych.timelineVariable("persons"))
    },
    choices: "NO_KEYS",
    on_load: function () {
        current_persons = jsPsych.timelineVariable("persons")
    },
    on_finish: function(data) {
        data.fairest = current_fairest
        data.fair_control = current_fair_control
        data.fair_dp = current_fair_dp
        data.fair_eo = current_fair_eo
    },
    data: {
        type_of_trial: "compare_models"
    }
}

const compare_models_timeline = {
    timeline: [compare_models],
    timeline_variables: conditions,
    randomize_order: false
}

var models_viewed = [];
var experiment = [];

experiment.push(
    first_instructions,
    explanation,
    comprehension_one,
    comprehension_two,
    comprehension_three,
    comprehension_four,
    initial_eval,
    compare_instructions,
    compare_models_timeline,
    summary
)

jsPsych.run(experiment)