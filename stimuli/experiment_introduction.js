// ---------- INTRODUCTION PAGE ---------- //

const introduction_page_text = `
    Thank you for agreeing to participate in this study. The study will have two sections: <br> <br> 
        
    In the first section, you will walk through an example situation about trying to be fair to men 
    and women when admitting patients to an ER at a hospital. You will learn that there are multiple 
    ways to define being "fair" and that those definitions can conflict with each other. After the
    example, there will be some questions assessing your understanding of the defintions of fairness 
    (these will not affect your payment in any way).<br><br>

    In the second section, you will see the differnt fairness definitions in action on a real world data and 
    have a chance to evaluate how they perform.<br><br>

    When you are ready, click "Next" to begin part one. <br><br>
    `

const introduction_page = `
    <div class="compare-instructions-display">
    </div>
    <br> 
    <br>
    <hr>
    <p style="text-align: left; width: 900px;">
        ${introduction_page_text}
    </p>
    `