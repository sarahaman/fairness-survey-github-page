
function get_disagreements(init_fairest_response, trials) {
    let disagreements = [];
    trials.forEach(trial => {
        const is_consistent = trial['fairest'] === init_fairest_response;
        if (!is_consistent) {
            disagreements.push(trial);
        }
    });
    return disagreements
}

function get_models_to_show(init_fairest_response, disagreements) {
    const models_to_show = new Set();
    models_to_show.add(init_fairest_response);
    disagreements.forEach(trial => {
        models_to_show.add(trial['fairest']);
    });
    return Array.from(models_to_show);
}

function create_reconcilliation_container(persons, models_to_show) {
    // Create reconcilliation container for a single trial 

    let initial_choice = models_to_show[0];
    let selected_fairest = models_to_show[1];

    let reconcilliation_container_html = `
    <div class="models-container">
        <div class="profiles-label">${initial_choice}</div>
        <div class="profiles-label">${selected_fairest}</div>
        <div class="profiles-label">Model C</div>
        
        ${profile_column(persons, initial_choice)}
        ${profile_column(persons, selected_fairest)}
        </div>`;

    return reconcilliation_container_html;
}

function compare_reconciliation_stimulus(init_fairest_response, acted_on, persons) {

    let name_init_response = reverse_lookup(MODEL_SHORTHAND, init_fairest_response);
    let name_acted_on = reverse_lookup(MODEL_SHORTHAND, acted_on);

    let responses = {
        "Initial Farest Response" : name_init_response,
        "Acted On Model" : name_acted_on
    }

    let choice_radio_html = create_radio_options("rec_choice", responses);

    let string = `
        <div class="stimulus-wrapper">
            <div class="models-container">
                <div class="profiles-label">${name_init_response}</div>
                ${profile_column(persons, init_fairest_response)}
                <div class="profiles-label">${name_acted_on}</div>
                ${profile_column(persons, acted_on)}
            </div>
            <br>
            <br>
            <div class="questions-container">
                <div class="prevent-select" style="text-align: left;">
                    What selection do you think is the most fair?
                    <br><br>
                    ${choice_radio_html}
                    <br><br>
                    Please write a 1 - 2 sent4ence explanation for your choice:
                    <br><br>
                    <textarea id="rec_explanation" name="rec_explanation" rows="4" cols="50" placeholder="Type your explanation here..."></textarea>
                </div>
            </div>
            <br>
        </div>
        <button class="model-compare-button">Done</button>
        <br><br>
        </div>
    `

    return string
}


