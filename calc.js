document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let values = formValues();
        form.reset();


        let [weight, height, weightLoss, criticalStatus] = values;

        let bmi = calculateBMI(weight, height);
        let totalScore = scoreCalculator(bmi, weightLoss, criticalStatus);

        console.log(`BMI: ${bmi}`);
        console.log(`weightloss: ${weightLoss}`);
        console.log(`Gathered score: ${totalScore}`);

        // Calculate Calories
        if (totalScore <= 1) {
            console.log('Score is 0 or 1');
        } else if (totalScore >= 2) {
            console.log('Score is 2 or more');
        }

    })
});

// Grab values from the form
function formValues() {
    let weight = form.weight.value;
    let height = form.height.value / 100;
    let criticalStatus = form.critical.checked;

    let weightLoss = parseInt(form.weightLoss.value);

    return [weight, height, weightLoss, criticalStatus];
}

// Function to calculate BMI of the patient
function calculateBMI(weight, height) {
    let bmi = weight / Math.pow(height, 2);
    bmi = bmi.toFixed(2)
    return bmi;
}

// Function to calculate total amount of points gathered by the patient
function scoreCalculator(bmi, weightLoss, criticalStatus) {

    let score = 0;

    // Points gathered from BMI
    if (bmi > 20) {
        score += 0;
    } else if (bmi < 18.5) {
        score += 2;
    } else if (bmi < 20 && bmi > 18.5) {
        score += 1;
    }

    switch (weightLoss) {
        case 0:
            score += 0;
            break;
        case 1:
            score += 0;
            break;
        case 2:
            score += 1;
            break;
        case 3:
            score += 2;
            break;
        default:
            console.log('Something went wrong with weightLoss');
            console.log(weightLoss);
    }

    // score gathered from critical condition
    if (criticalStatus) {
        score += 2;
    }

    return score;
};

function caseOne(weight) {
    let TEE = 25 * weight;
    let proteins = TEE / 4;
    let fats = TEE / 4;
    let carbs = TEE / 2;
    return [TEE, proteins, fats, carbs];
}

function caseTwo(weight) {

}