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
                    <b>Age:</b> ${age} 
                    <br>
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
