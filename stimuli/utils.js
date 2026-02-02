// NEED TO COMMENT ALL OF THIS  

function swap(obj) { 
    return Object.fromEntries(Object.entries(obj).map(a => a.reverse()))
}

function reverse_lookup(object, value) {
    return Object.keys(object).find(key => object[key] === value);
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