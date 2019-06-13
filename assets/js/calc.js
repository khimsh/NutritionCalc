document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let values = formValues();
        form.reset();


        let [weight, height, weightLoss, criticalStatus] = values;

        let bmi = calculateBMI(weight, height);
        let totalScore = scoreCalculator(bmi, weightLoss, criticalStatus);

        // Delete before deploying
        // console.log(`BMI: ${bmi}`);
        // console.log(`Weightloss: ${weightLoss}`);
        // console.log(`Critical Status: ${criticalStatus}`);
        // console.log(`Score: ${totalScore}`);

        // Calculate Calories
        if (totalScore <= 1) {
            let [TEE, proteins, fats, carbs] = caseOne(weight);
             // Append results to the home screen
            let results = `
            <div class="row">
                <h5>დღიური კალორია</h5>

                <p class="center kkal">${TEE}<span>კკალ</span></p>
            </div>
            <div class="row">
                <table class="striped">
                    <tbody>
                        <tr>
                            <th>პროტეინები</th>
                            <td>${proteins}გ</td>
                        </tr>
                        <tr>
                            <th>ნახშირწყლები</th>
                            <td>${carbs}გ</td>
                        </tr>
                        <tr>
                            <th>ცხიმები</th>
                            <td>${fats}გ</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="divider"></div>

            <div class="row">
                <h5>რეკომენდაცია</h5>

                <p class="recomendation">შეაფასეთ ყოველ კვირას რუტინულად.</p>
            </div>

            <div class="divider"></div>

            <div class="row">
                <h5>პაციენტის მონაცემები</h5>
                <table class="striped">
                    <tbody>
                        <tr>
                            <th>პაციენტის ქულა</th>
                            <td id="patient-score">${totalScore}</td>
                        </tr>
                        <tr>
                            <th>წონა</th>
                            <td>${weight}კგ</td>
                        </tr>
                        <tr>
                            <th>სიმაღლე</th>
                            <td>${height}მ</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row">
                <div class="col s5 left-align">
                    <button href="index.html" class="btn waves-effect waves-light" id="goBack">უკან
                        <i class="material-icons left">arrow_left</i>
                    </button>
                </div>
            </div>
            `;
            updateUI(results);
        } else if (totalScore >= 2) {
            // console.log('Score is 2 or more');
            let [REE, proteins, fats, carbs] = caseTwo(weight, bmi)
            // console.log(REE, proteins, fats, carbs);

            let results = `
            <div class="row">
                <h5>დღიური კალორია</h5>

                <p class="center kkal">${REE}<span>კკალ</span></p>
            </div>
            <div class="row">
                <table class="striped">
                    <tbody>
                        <tr>
                            <th>პროტეინები</th>
                            <td>${proteins}გ</td>
                        </tr>
                        <tr>
                            <th>ნახშირწყლები</th>
                            <td>${carbs}გ</td>
                        </tr>
                        <tr>
                            <th>ცხიმები</th>
                            <td>${fats}გ</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="divider"></div>

            <div class="row">
                <h5>რეკომენდაცია</h5>

                <p class="recomendation">შეაფასეთ ყოველ კვირას რუტინულად.</p>
            </div>

            <div class="divider"></div>

            <div class="row">
                <h5>პაციენტის მონაცემები</h5>
                <table class="striped">
                    <tbody>
                        <tr>
                            <th>პაციენტის ქულა</th>
                            <td id="patient-score">${totalScore}</td>
                        </tr>
                        <tr>
                            <th>წონა</th>
                            <td>${weight}კგ</td>
                        </tr>
                        <tr>
                            <th>სიმაღლე</th>
                            <td>${height}მ</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row">
                <div class="col s5 left-align">
                    <button href="index.html" class="btn waves-effect waves-light" id="goBack">უკან
                        <i class="material-icons left">arrow_left</i>
                    </button>
                </div>
            </div>
            `;
            updateUI(results);
        }
    })
});

// Update UI
function updateUI(results) {
    document.getElementById('results').style.display = 'block';
    document.getElementById('results').innerHTML = results;
    document.getElementById('calculator').style.display = 'none';
    document.getElementById('goBack').addEventListener('click', () => {
        document.getElementById('calculator').style.display = 'block';
        document.getElementById('results').style.display = 'none';
    });
}

// Grab values from the form
function formValues() {
    let weight = parseInt(form.weight.value);
    let height = parseInt(form.height.value) / 100;
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

// Function to calculate total score gathered by the patient
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
            break;
    }

    // score gathered from critical condition
    if (criticalStatus) {
        score += 2;
    }

    return score;
};

// Calculate daily required amount of calories if score is 0 or 1
function caseOne(weight) {
    let TEE = 25 * weight; // Total Energy Expenditure

    let proteins = TEE / 4;
    let fats = TEE / 4;
    let carbs = TEE / 2;

    return [TEE, proteins, fats, carbs];
}

// Calculate daily required amount of calories if score is 2 or more
function caseTwo(weight, bmi) {
    let REE; // Resting Energy Expenditure

    if (bmi < 14) {
        REE = 5 * weight;
    } else if (bmi < 16) {
        REE = 10 * weight;
    } else {
        REE = 30 * weight;
    }

    let proteins = REE / 4;
    let fats = REE / 4;
    let carbs = REE / 2;

    return [REE, proteins, fats, carbs];
}

