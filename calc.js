document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#form');

    form.addEventListener('submit', () => {

        let values = formValues();
        let [weight, height, weightLoss] = values;

        let bmi = calculateBMI(weight, height);
        let gatheredPoints = pointCalculator(bmi, weightLoss);

        console.log(`BMI: ${bmi}`);
        console.log(`weightloss: ${weightLoss}`);
        console.log(`Gathered Points: ${gatheredPoints}`);

        form.reset();
    })
});

// Calculate Calories
// switch(points) {
//     case 0:

// }

// Grab values from the form
function formValues() {
    let weight = form.weight.value;
    let height = form.height.value / 100;

    let weightLoss = parseInt(form.weightLoss.value);

    return [weight, height, weightLoss];
}

// Function to calculate BMI of the patient
function calculateBMI(weight, height) {
    let bmi = weight / Math.pow(height, 2);
    bmi = bmi.toFixed(2)
    return bmi;
}

// Function to calculate total amount of points gathered by the patient
function pointCalculator(bmi, weightLoss) {

    let points = 0;

    // Points gathered from BMI
    if (bmi > 20) {
        points += 0;
    } else if (bmi < 18.5) {
        points += 2;
    } else if (bmi < 20 && bmi > 18.5) {
        points += 1;
    }

    switch (weightLoss) {
        case 0:
            points += 0;
            break;
        case 1:
            points += 0;
            break;
        case 2:
            points += 1;
            break;
        case 3:
            points += 2;
            break;
        default:
            console.log('Something went wrong with weightLoss');
            console.log(weightLoss);
    }

    // Points gathered from critical condition
    if (form.critical.checked) {
        points += 2;
    }

    // TODO: points gathered from additional diseases/conditions

    return points;
};