// Initial fairest response

function get_model_name(shorthand, MODEL_SHORTHAND) {
    const shorthand_swap_dict = swap(MODEL_SHORTHAND);
    return shorthand_swap_dict[shorthand] || "an unknown model";
}

function get_frequency_text(fairest_counts) { 
    let num_trials = 0; 
    let frequency_text = '<ul>';
    
    Object.entries(fairest_counts).forEach(([choice, count]) => { 
        num_trials += count; 
        var model_name = get_model_name(choice, MODEL_SHORTHAND);
        frequency_text += `<li>${model_name}: ${count} selections</li>`; 
    });

    frequency_text += '</ul>'; 
    return { frequency_text, num_trials }; 
}

function get_consistency_text(fairest_counts, init_fairest_response, num_trials) { 
    const consistent = fairest_counts[init_fairest_response] === num_trials;
    const consistency_text = consistent ? 'Your selections were fully consistent with your stated fairness definition.' : `
            Your selections were not fully consistent with your stated fairness definition. This is unsuprising; it can be
            difficult to apply abstract definitions of fairness to specific cases. Furthermore, real-world decisions
            often involve trade-offs between values that complicate purely mathematical definitions of fairness.<br><br> 

            In the final part of the study, you will have the opportunity to either reconcile your choices with your
            stated fairness preference or choose to keep your choices as they are. We will ask you to reflect on the reasons
            for your decisions.
            ` 
    return consistency_text;
}


function buildSummaryTrial(init_fairest_response, fairest_counts, MODEL_SHORTHAND) { 
    const selected_model_name = get_model_name(init_fairest_response, MODEL_SHORTHAND);
    const { frequency_text, num_trials } = get_frequency_text(fairest_counts);
    const text = init_fairest_response ? get_consistency_text(fairest_counts, init_fairest_response, num_trials) : "We couldn't determine your initial choice. Please go back and complete the earlier section.";
    
    const summary_html = `
        <div class="prevent-select" style="text-align: left; width: 900px;"> 
            <h2>Your Selection Summary</h2> 
            You originally selected the ${selected_model_name} model as the most fair, based on its definition.
            <br><br>.
            The following summarizes how many times you selected each model as fairest across the different cases:
            <br>
            ${frequency_text}
            <br>
            ${text}<br>
        </div>
        `;
    
    return summary_html;
};

// --- End --- //