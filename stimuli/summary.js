// Initial fairest response


const CONSISTENCY_OPTIONS_TEXT = {
    "Fully consistent": `Wow! You act consistently with your professed beliefs. You should become the philosopher king of a new utopic state!`,

    "Inconsistencies": `
            You did not act consistently >:( do our forced choice now...<br>
            <b>Demographic Parity:</b>${DEFINITIONS['Demographic Parity']}<br>
            <b>Equalized Odds:</b>${DEFINITIONS['Equalized Odds']}<br>
            <b>The goal of this final question is to show the participants the cases where their initial choice in the most
            fair model for the emergency room context and their actions diverged.</b><br><br>
            How do you make sense of this disparity? Also, pick a model. Maybe explain why? Do we want text data???
            ` 
};

//const init_fairest_response = this.jsPsych.data.get()
//    .filter({type_of_trial : "initial_eval"})
//    .values()[0].response.final_fairest;

//const fairest_counts = this.jsPsych.data.get()
//        .filter({type_of_trial: "compare_models"})
//            .select('fairest')
//            .frequencies();

//function get_frequency_text(fairest_counts) {
//    let num_trials = 0;
//    let frequency_text = '<ul>';
//    
//    Object.entries(fairest_counts).forEach(([choice, count]) => {
//            num_trials += count;
//            frequency_text += `<li>${choice}: ${count} selections</li>`;
//        });
        
//    frequency_text += '</ul>';
//    return {frequency_text, num_trials};
//}

function get_consistency_text(fairest_counts, init_fairest_response, num_trials) {
    if (fairest_counts[init_fairest_response] == num_trials){
        return CONSISTENCY_OPTIONS_TEXT["Fully consistent"];
    } else {
        return CONSISTENCY_OPTIONS_TEXT["Inconsistencies"];
    }
};

let {frequency_text, num_trials} = get_frequency_text(fairest_counts);
let consistency_text = get_consistency_text(fairest_counts, init_fairest_response, num_trials);
let reconciliation_radio = create_radio_options("final_fairest", swap(MODEL_SHORTHAND));

let summary_html_2 = `
    <div class="prevent-select" style="text-align: left; width: 900px;">
        <h2>Your Selection Summary</h2>
        You originally selected the ${init_fairest_response} model as the most fair, based on its definition.<br><br>
        Your actual selections were:<br><br>
        ${frequency_text}<br>
        ${consistency_text}<br>
    </div>
    <br>
    <br>
`;
const summary = {
   type: jsPsychSurveyHtmlForm,
   html: summary_html_2,
  on_load: function() {
     document.getElementById("jspsych-content").style.margin = "50px auto"
   },
 data: {
     type_of_trial: "summary"
 }}

// --- End --- //


