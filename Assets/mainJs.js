// Improved Number System Converter

// DOM Elements
const elements = {
    inpType: document.getElementById('inpType'),
    inpNum: document.getElementById('inpNum'),
    opType: document.getElementById('opType'),
    opNum: document.getElementById('opNum'),
    inputError: document.getElementById('inputError'),
    historyList: document.getElementById('historyList')
};
//Offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('✅ Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('❌ Service Worker registration failed:', error);
      });
  });
};


// Conversion patterns for validation
const validationPatterns = {
    inpbin: { 
        regex: /^-?[01]+(\.[01]+)?$/,
        error: "Please enter a valid binary number (only 0-1 and .)"
    },
    inpoct: { 
        regex: /^-?[0-7]+(\.[0-7]+)?$/,
        error: "Please enter a valid octal number (only 0-7 and .)"
    },
    inpdec: { 
        regex: /^-?\d+(\.\d+)?$/,
        error: "Please enter a valid decimal number"
    },
    inphex: { 
        regex: /^-?[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/,
        error: "Please enter a valid hexadecimal number (0-9, A-F)"
    }
};

// Initialize the converter
function init() {
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    }

    // Event listeners
    elements.inpNum.addEventListener('input', handleInputChange);
    elements.inpType.addEventListener('change', handleInputChange);
    elements.opType.addEventListener('change', handleInputChange);
    
    // Load history from localStorage
    loadHistory();
    
    // Hide preloader
    window.addEventListener('load', () => {
        document.getElementById('preloader').style.display = 'none';
    });
}

// Handle input changes (real-time conversion)
function handleInputChange() {
    if (elements.inpNum.value.trim() !== '') {
        convert();
    } else {
        elements.opNum.value = '';
        elements.inputError.textContent = '';
    }
}

// Main conversion function
function convert() {
    const iType = elements.inpType.value;
    const iNum = elements.inpNum.value.trim();
    const oType = elements.opType.value;
    
    // Validate input
    if (!validateInput(iNum, iType)) {
        return false;
    }
    
    let result;
    
    try {
        // Handle same input and output types
        if (iType.replace('inp', '') === oType.replace('op', '')) {
            result = iNum;
        } else {
            // Convert to decimal first as intermediary
            const decimalValue = toDecimal(iNum, iType);
            
            // Convert from decimal to target type
            result = fromDecimal(decimalValue, oType);
        }
        
        // Update UI
        elements.opNum.value = result;
        elements.inputError.textContent = '';
        
        // Add to history
        addToHistory(iNum, iType, result, oType);
        
    } catch (error) {
        elements.inputError.textContent = error.message;
        elements.opNum.value = '';
    }
    
    return false;
}

// Convert any type to decimal
function toDecimal(number, type) {
    const [integerPart, fractionalPart] = number.split('.');
    let decimalValue = 0;
    const base = getBase(type);
    
    // Convert integer part
    decimalValue = parseInt(integerPart, base);
    
    // Convert fractional part if exists
    if (fractionalPart) {
        let fractionalValue = 0;
        for (let i = 0; i < fractionalPart.length; i++) {
            const digit = parseInt(fractionalPart[i], base);
            fractionalValue += digit / Math.pow(base, i + 1);
        }
        decimalValue += decimalValue >= 0 ? fractionalValue : -fractionalValue;
    }
    
    return decimalValue;
}

// Convert decimal to any type
function fromDecimal(decimalValue, type) {
    const base = getBase(type);
    const isNegative = decimalValue < 0;
    let absoluteValue = Math.abs(decimalValue);
    
    // Convert integer part
    let integerPart = Math.floor(absoluteValue).toString(base).toUpperCase();
    if (isNegative) integerPart = '-' + integerPart;
    
    // Convert fractional part
    let fractionalPart = '';
    let fractionalValue = absoluteValue - Math.floor(absoluteValue);
    
    if (fractionalValue > 0) {
        fractionalPart = '.';
        const precision = 10; // Limit fractional precision
        
        for (let i = 0; i < precision && fractionalValue > 0; i++) {
            fractionalValue *= base;
            const digit = Math.floor(fractionalValue);
            fractionalPart += digit.toString(base).toUpperCase();
            fractionalValue -= digit;
        }
    }
    
    return integerPart + fractionalPart;
}

// Get base from type
function getBase(type) {
    const typeMap = {
        inpbin: 2, opbin: 2,
        inpoct: 8, opoct: 8,
        inpdec: 10, opdec: 10,
        inphex: 16, ophex: 16
    };
    return typeMap[type] || 10;
}

// Input validation
function validateInput(number, type) {
    if (number === '') {
        elements.inputError.textContent = 'Please enter a number';
        return false;
    }
    
    const pattern = validationPatterns[type];
    
    if (!pattern.regex.test(number)) {
        elements.inputError.textContent = pattern.error;
        return false;
    }
    
    return true;
}

// Copy result to clipboard
function copyResult() {
    if (!elements.opNum.value) return;
    
    elements.opNum.select();
    document.execCommand('copy');
    
    // Show copy confirmation
    const copyBtn = document.querySelector('.copy-button');
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
        copyBtn.classList.remove('copied');
    }, 2000);
}

// Clear all fields
function clearFields() {
    elements.inpNum.value = '';
    elements.opNum.value = '';
    elements.inputError.textContent = '';
}

// History functions
function addToHistory(input, inputType, output, outputType) {
    const historyItem = {
        date: new Date(),
        input,
        inputType: inputType.replace('inp', ''),
        output,
        outputType: outputType.replace('op', '')
    };
    
    // Safely get history from localStorage
    let history;
    try {
        history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    } catch (e) {
        // If there's any error parsing, start with empty array
        history = [];
    }
    
    history.unshift(historyItem);
    
    // Keep only last 10 items
    if (history.length > 02) {
        history = history.slice(0, 02);
    }
    
    localStorage.setItem('conversionHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    let history = [];
    try {
        const historyData = localStorage.getItem('conversionHistory');
        if (historyData) {
            history = JSON.parse(historyData);
        }
    } catch (e) {
        console.error("Error parsing history:", e);
    }
    
    elements.historyList.innerHTML = '';
    
    if (history.length === 0) {
        elements.historyList.innerHTML = '<p class="no-history">No conversion history yet</p>';
        return;
    }
    
    history.forEach((item, index) => {
        const historyElement = document.createElement('div');
        historyElement.className = 'history-item';
        historyElement.innerHTML = `
            <span class="history-time">${new Date(item.date).toLocaleTimeString()}</span>
            <span class="history-conversion">
                ${item.input} (${item.inputType}) → ${item.output} (${item.outputType})
            </span>
            <button class="history-use-btn" data-index="${index}">Use</button>
        `;
        elements.historyList.appendChild(historyElement);
    });
    
    // Add event listeners to all "Use" buttons
    document.querySelectorAll('.history-use-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            useHistoryItem(parseInt(e.target.dataset.index));
        });
    });
}

function useHistoryItem(index) {
    let history = [];
    try {
        history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    } catch (e) {
        console.error("Error parsing history:", e);
    }
    
    if (index >= 0 && index < history.length) {
        const item = history[index];
        elements.inpType.value = 'inp' + item.inputType.toLowerCase();
        elements.opType.value = 'op' + item.outputType.toLowerCase();
        elements.inpNum.value = item.input;
        convert();
    }
}

function loadHistory() {
    // Initialize with empty array if no history exists
    if (!localStorage.getItem('conversionHistory')) {
        localStorage.setItem('conversionHistory', JSON.stringify([]));
    }
    renderHistory();
}
// Initialize the app
document.addEventListener('DOMContentLoaded', init);
