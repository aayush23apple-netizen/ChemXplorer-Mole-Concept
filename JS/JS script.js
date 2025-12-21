// Chemxplore: Mole Concept - Shared JavaScript Functions

// Utility Functions
function validateNumber(input) {
    const value = parseFloat(input);
    return !isNaN(value) && value > 0;
}

function formatScientific(number) {
    if (number >= 1000000 || number < 0.001) {
        return number.toExponential(3);
    }
    return number.toFixed(3);
}

function showResult(elementId, result, unit = '') {
    const resultDiv = document.getElementById(elementId);
    resultDiv.innerHTML = `<strong>Result:</strong> ${formatScientific(result)} ${unit}`;
    resultDiv.className = 'result';
}

function showError(elementId, message) {
    const resultDiv = document.getElementById(elementId);
    resultDiv.innerHTML = `<strong>Error:</strong> ${message}`;
    resultDiv.className = 'error';
}

// Calculator Functions
const AVOGADRO = 6.02214076e23;
const MOLAR_VOLUME_STP = 22.4; // L/mol at STP

function calculateMassToMole() {
    const mass = parseFloat(document.getElementById('mass').value);
    const molarMass = parseFloat(document.getElementById('molarMass').value);

    if (!validateNumber(mass) || !validateNumber(molarMass)) {
        showError('result', 'Please enter valid positive numbers for mass and molar mass.');
        return;
    }

    const moles = mass / molarMass;
    showResult('result', moles, 'moles');
}

function calculateMolesToParticles() {
    const moles = parseFloat(document.getElementById('moles').value);

    if (!validateNumber(moles)) {
        showError('result', 'Please enter a valid positive number for moles.');
        return;
    }

    const particles = moles * AVOGADRO;
    showResult('result', particles, 'particles');
}

function calculateMolesToMass() {
    const moles = parseFloat(document.getElementById('moles').value);
    const molarMass = parseFloat(document.getElementById('molarMass').value);

    if (!validateNumber(moles) || !validateNumber(molarMass)) {
        showError('result', 'Please enter valid positive numbers for moles and molar mass.');
        return;
    }

    const mass = moles * molarMass;
    showResult('result', mass, 'grams');
}

function calculateParticlesToMoles() {
    const particles = parseFloat(document.getElementById('particles').value);

    if (!validateNumber(particles)) {
        showError('result', 'Please enter a valid positive number for particles.');
        return;
    }

    const moles = particles / AVOGADRO;
    showResult('result', moles, 'moles');
}

function calculateMolesToVolume() {
    const moles = parseFloat(document.getElementById('moles').value);

    if (!validateNumber(moles)) {
        showError('result', 'Please enter a valid positive number for moles.');
        return;
    }

    const volume = moles * MOLAR_VOLUME_STP;
    showResult('result', volume, 'liters (at STP)');
}

function calculateVolumeToMoles() {
    const volume = parseFloat(document.getElementById('volume').value);

    if (!validateNumber(volume)) {
        showError('result', 'Please enter a valid positive number for volume.');
        return;
    }

    const moles = volume / MOLAR_VOLUME_STP;
    showResult('result', moles, 'moles (at STP)');
}

function calculateMolesToMolarity() {
    const moles = parseFloat(document.getElementById('moles').value);
    const volume = parseFloat(document.getElementById('volume').value);

    if (!validateNumber(moles) || !validateNumber(volume)) {
        showError('result', 'Please enter valid positive numbers for moles and volume.');
        return;
    }

    const molarity = moles / volume;
    showResult('result', molarity, 'M');
}

function calculateMolarityToMoles() {
    const molarity = parseFloat(document.getElementById('molarity').value);
    const volume = parseFloat(document.getElementById('volume').value);

    if (!validateNumber(molarity) || !validateNumber(volume)) {
        showError('result', 'Please enter valid positive numbers for molarity and volume.');
        return;
    }

    const moles = molarity * volume;
    showResult('result', moles, 'moles');
}

// Ideal Gas Law Calculator
function calculateIdealGas() {
    const pressure = parseFloat(document.getElementById('pressure').value);
    const volume = parseFloat(document.getElementById('volume').value);
    const moles = parseFloat(document.getElementById('moles').value);
    const temperature = parseFloat(document.getElementById('temperature').value);

    let missing = [];
    if (isNaN(pressure)) missing.push('pressure');
    if (isNaN(volume)) missing.push('volume');
    if (isNaN(moles)) missing.push('moles');
    if (isNaN(temperature)) missing.push('temperature');

    if (missing.length !== 1) {
        showError('result', 'Please leave exactly one field empty to solve for that variable.');
        return;
    }

    const R = 0.0821; // L·atm·mol⁻¹·K⁻¹

    let result;
    if (isNaN(pressure)) {
        result = (moles * R * temperature) / volume;
        showResult('result', result, 'atm');
    } else if (isNaN(volume)) {
        result = (moles * R * temperature) / pressure;
        showResult('result', result, 'L');
    } else if (isNaN(moles)) {
        result = (pressure * volume) / (R * temperature);
        showResult('result', result, 'moles');
    } else if (isNaN(temperature)) {
        result = (pressure * volume) / (moles * R);
        showResult('result', result, 'K');
    }
}

// Dilution Calculator
function calculateDilution() {
    const m1 = parseFloat(document.getElementById('m1').value);
    const v1 = parseFloat(document.getElementById('v1').value);
    const m2 = parseFloat(document.getElementById('m2').value);
    const v2 = parseFloat(document.getElementById('v2').value);

    let missing = [];
    if (isNaN(m1)) missing.push('M1');
    if (isNaN(v1)) missing.push('V1');
    if (isNaN(m2)) missing.push('M2');
    if (isNaN(v2)) missing.push('V2');

    if (missing.length !== 1) {
        showError('result', 'Please leave exactly one field empty to solve for that variable.');
        return;
    }

    if (isNaN(m1)) {
        const result = (m2 * v2) / v1;
        showResult('result', result, 'M');
    } else if (isNaN(v1)) {
        const result = (m2 * v2) / m1;
        showResult('result', result, 'L');
    } else if (isNaN(m2)) {
        const result = (m1 * v1) / v2;
        showResult('result', result, 'M');
    } else if (isNaN(v2)) {
        const result = (m1 * v1) / m2;
        showResult('result', result, 'L');
    }
}

// Empirical Formula Calculator
function calculateEmpiricalFormula() {
    const elements = document.getElementById('elements').value.split(',');
    const masses = document.getElementById('masses').value.split(',').map(x => parseFloat(x.trim()));

    if (elements.length !== masses.length || elements.length === 0) {
        showError('result', 'Please enter equal number of elements and masses.');
        return;
    }

    // Find smallest mass ratio
    const minMass = Math.min(...masses);
    const ratios = masses.map(mass => mass / minMass);

    // Simplify ratios
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = ratios.reduce((acc, ratio) => gcd(acc, Math.round(ratio * 100) / 100), ratios[0]);

    const empirical = ratios.map(ratio => Math.round(ratio / commonDivisor));

    let formula = '';
    elements.forEach((element, index) => {
        formula += element.trim() + (empirical[index] > 1 ? empirical[index] : '');
    });

    document.getElementById('result').innerHTML = `<strong>Empirical Formula:</strong> ${formula}`;
    document.getElementById('result').className = 'result';
}

// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');

    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Limiting Reagent Calculator
function calculateLimitingReagent() {
    const equation = document.getElementById('equation').value;
    const reactant1 = document.getElementById('reactant1').value;
    const amount1 = parseFloat(document.getElementById('amount1').value);
    const reactant2 = document.getElementById('reactant2').value;
    const amount2 = parseFloat(document.getElementById('amount2').value);

    if (!equation || !reactant1 || !amount1 || !reactant2 || !amount2) {
        showError('result', 'Please fill in all fields.');
        return;
    }

    try {
        // Parse coefficients from reactant strings (e.g., "2H2" -> coefficient = 2)
        const coeff1 = parseInt(reactant1) || 1;
        const coeff2 = parseInt(reactant2) || 1;

        // Calculate required amounts
        const requiredAmount2 = (amount1 * coeff2) / coeff1;
        const requiredAmount1 = (amount2 * coeff1) / coeff2;

        let limitingReagent;
        let explanation;

        if (requiredAmount2 <= amount2) {
            limitingReagent = reactant1;
            explanation = `${reactant1} is the limiting reagent. It requires ${requiredAmount2.toFixed(3)} moles of ${reactant2}, but we only have ${amount2} moles available.`;
        } else {
            limitingReagent = reactant2;
            explanation = `${reactant2} is the limiting reagent. It requires ${requiredAmount1.toFixed(3)} moles of ${reactant1}, but we only have ${amount1} moles available.`;
        }

        document.getElementById('result').innerHTML = `
            <strong>Limiting Reagent:</strong> ${limitingReagent}<br>
            <strong>Explanation:</strong> ${explanation}
        `;
        document.getElementById('result').className = 'result';

    } catch (error) {
        showError('result', 'Error parsing equation. Please check your input format.');
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Add smooth scrolling to anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});JS
