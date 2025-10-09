// How many persons we want to generate
const NUM_PERSONS = 6;

// Possible ESI scores and a translation of their relative 
// urgency into plain text
const ESI_URGENCY_DICTIONARY = {
    "1": "Most urgent",
    "2": "Mostly urgent",
    "3": "Moderately urgent",
    "4": "A little urgent",
    "5": "Not urgent"
}

// ESI scores of 3 and greater are considered urgent
const ESI_URGENCY_THRESHOLD = 3;

// A consistent fairness scale used when rating how fair a
// particular model is
const FAIRNESS_SCALE = {
    "1" : "Extremely unfair",
    "2" : "",
    "3" : "",
    "4" : "Neither fair nor unfair",
    "5" : "",
    "6" : "",
    "7" : "Extremely fair"
}

// Definitions of each fairness metric
const DEFINITIONS = {
    'Demographic Parity' : `The fraction of patients that <i>are seen</i> today that are male should 
                            equal the fraction of patients that are male. Similarly, the fraction 
                            of patients that <i>are seen</i> today that are female should be equal to 
                            the fraction of patients that are female.`,

    'Equalized Odds' : `The fraction of patients that <b>should be seen today</b> and <i>are seen today</i> that 
                        are men is equal to the fraction of patients that <b>should be seen today</b> and 
                        <i>are seen today</i> that are women.` 
}

// Shorthand used for each fairness metric model type when storing data
const MODEL_SHORTHAND = {
    "No Correction": "control",
    "Demographic Parity": "dp",
    "Equalized Odds" : "eo"
}
