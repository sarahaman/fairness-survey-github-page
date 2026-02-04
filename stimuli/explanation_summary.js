// EXPLANATION SUMMARY PAGE

const explanation_summary_text = `Test`;

const EXPLANATION_SUMMARY_HTML = `
        <div class="display-container">
            ${generate_squares([GENDER_GROUP.WOMEN, GENDER_GROUP.MEN],SELECTION_PATTERNS.DEMOGRAPHIC_PARITY)}
            ${generate_squares([GENDER_GROUP.WOMEN, GENDER_GROUP.MEN], SELECTION_PATTERNS.EQUALIZED_ODDS)}    
        </div>
        <p class="instructions-paragraph" style="text-align: left;">
            ${explanation_summary_text}
        </p>
    `;