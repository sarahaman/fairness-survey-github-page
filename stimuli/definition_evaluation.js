
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