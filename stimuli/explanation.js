
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
                     <br><br> Some people have urgent conditions and need to be seen immediately, while others can wait 
                     until later. We'll highlight the people who need to be seen immediately in a darker gray.`,
        selection_order: SELECTION_PATTERNS.DEFAULT
    },

    page_2: {
        page_text : `We would like to see the people who need to be seen immediately, and wait to see the people who 
                     can wait. However, we are likely to make some mistakes in our decision process, so we might end up 
                     seeing a set of people like this.`, 
        selection_order: SELECTION_PATTERNS.CONTROL
    },

    page_3: {
        page_text : `Now suppose that our population of patients is made up of half women (purple) and half men 
                     (green).<br><br>Again, among both women and men, some patients need to be seen today (darker 
                     colors) while others do not (lighter colors). Let's examine our original selection with gender 
                     shown.`,
        selection_order: SELECTION_PATTERNS.DEFAULT
    }, 

    page_4: {
        page_text : `Now that we are considering gender, we are arguably being unfair to men. Despite 
                     making up half of the population, men are only 8 / 20 = 40% of the selected patients.
                     <br><br> This is a problem if we want to be fair to both men and women. How might we 
                     fix this?`,
        selection_order: SELECTION_PATTERNS.CONTROL
    },

    page_5: {
        page_text : `One solution, called <b>Gender Parity</b>, is to make sure that we select a pool of patients 
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
             only 9 / 20 = 45% of the selected patients. In fact, it is impossible to satisfy both of the solutions we have considered here
             at the same time.<br><br> Next, we will ask you some questions about these fairness definitions. Note that your answers to these
             will not affect your payment in any way.`,
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

const explanation_summary_text = `Here are the two being compared again side-by-side.`;

const explanaion_summary_html = `
<div class="display-container">
  <div class="column-container">
  
    <!-- Demographic Parity Column -->
    <div class="column">
      <h3 class="column-title">Demographic Parity</h3>
      ${generate_squares([GENDER_GROUP.WOMEN, GENDER_GROUP.MEN], 
                          SELECTION_PATTERNS.DEMOGRAPHIC_PARITY)}
    </div>

    <!-- Equalized Odds Column -->
    <div class="column">
      <h3 class="column-title">Equalized Odds</h3>
      ${generate_squares([GENDER_GROUP.WOMEN, GENDER_GROUP.MEN], 
                          SELECTION_PATTERNS.EQUALIZED_ODDS)}
    </div>
  </div>
</div>

  <p class="instructions-paragraph" style="text-align: left;">
    ${explanation_summary_text}
  </p>
`;

const explanation_pages = Object.entries(EXPLANATION_PAGE_CONFIG)
    .map(([page, config]) => create_explanation_pages(page, config));

explanation_pages.push(explanaion_summary_html);

