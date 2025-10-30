
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
                        <b>Complaint:</b> ${persons[n]["complaint"]}<br>
                        <b>Urgency:</b> ${esi_text}
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
