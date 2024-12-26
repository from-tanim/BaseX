// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Number system conversion functions
function convert() {
    const iType = document.getElementById("inpType").value;
    const iNum = document.getElementById("inpNum").value.trim();
    const oType = document.getElementById("opType").value;
    let oNum;

    // Validate input
    if (!validateInput(iNum, iType)) {
        document.getElementById("opNum").value = "Invalid Input";
        return false;
    }

    // Handle same input and output types
    if (iType === oType) {
        oNum = iNum;  // Return same value if types match
    } else {
        const conversions = {
            inpdec: { opbin: dec_to_bin, opoct: dec_to_oct, ophex: dec_to_hex },
            inpbin: { opdec: bin_to_dec, opoct: bin_to_oct, ophex: bin_to_hex },
            inpoct: { opdec: oct_to_dec, opbin: oct_to_bin, ophex: oct_to_hex },
            inphex: { opdec: hex_to_dec, opbin: hex_to_bin, opoct: hex_to_oct }
        };
        oNum = conversions[iType][oType](iNum);
    }

    document.getElementById("opNum").value = oNum;
    return false;
}

// Input validation function
function validateInput(iNum, iType) {
    const patterns = {
        inpbin: /^[01.]+$/,          // Binary numbers with radix point
        inpoct: /^[0-7.]+$/,         // Octal numbers with radix point
        inpdec: /^[0-9.]+$/,         // Decimal numbers with radix point
        inphex: /^[0-9A-Fa-f.]+$/    // Hexadecimal numbers with radix point
    };
    return patterns[iType].test(iNum);
}

// Conversion functions for integer and fractional parts

function dec_to_bin(iNum) {
    let [intPart, fracPart] = iNum.split('.');
    let intBin = parseInt(intPart, 10).toString(2);
    let fracBin = fracPart ? decToBinaryFrac(fracPart) : '';
    return intBin + (fracBin ? '.' + fracBin : '');
}

function dec_to_oct(iNum) {
    let [intPart, fracPart] = iNum.split('.');
    let intOct = parseInt(intPart, 10).toString(8);
    let fracOct = fracPart ? decToOctalFrac(fracPart) : '';
    return intOct + (fracOct ? '.' + fracOct : '');
}

function dec_to_hex(iNum) {
    let [intPart, fracPart] = iNum.split('.');
    let intHex = parseInt(intPart, 10).toString(16).toUpperCase();
    let fracHex = fracPart ? decToHexFrac(fracPart) : '';
    return intHex + (fracHex ? '.' + fracHex : '');
}

function bin_to_dec(iNum) {
    let [intPart, fracPart] = iNum.split('.');
    let intDec = parseInt(intPart, 2).toString(10);
    let fracDec = fracPart ? binToDecimalFrac(fracPart) : '';
    return intDec + (fracDec ? '.' + fracDec : '');
}

function bin_to_oct(iNum) {
    let [intPart, fracPart] = iNum.split('.');
    let intOct = parseInt(intPart, 2).toString(8);
    let fracOct = fracPart ? binToOctalFrac(fracPart) : '';
    return intOct + (fracOct ? '.' + fracOct : '');
}

function bin_to_hex(iNum) {
    let [intPart, fracPart] = iNum.split('.');
    let intHex = parseInt(intPart, 2).toString(16).toUpperCase();
    let fracHex = fracPart ? binToHexFrac(fracPart) : '';
    return intHex + (fracHex ? '.' + fracHex : '');
}

function oct_to_dec(iNum) {
    let [intPart, fracPart] = iNum.split('.');
    let intDec = parseInt(intPart, 8).toString(10);
    let fracDec = fracPart ? octToDecimalFrac(fracPart) : '';
    return intDec + (fracDec ? '.' + fracDec : '');
}

function oct_to_bin(iNum) {
    let [intPart, fracPart] = iNum.split('.');
    let intBin = parseInt(intPart, 8).toString(2);
    let fracBin = fracPart ? octToBinaryFrac(fracPart) : '';
    return intBin + (fracBin ? '.' + fracBin : '');
}

function oct_to_hex(iNum) {
    let [intPart, fracPart] = iNum.split('.');
    let intHex = parseInt(intPart, 8).toString(16).toUpperCase();
    let fracHex = fracPart ? octToHexFrac(fracPart) : '';
    return intHex + (fracHex ? '.' + fracHex : '');
}

function hex_to_dec(iNum) {
    let [intPart, fracPart] = iNum.split('.');
    let intDec = parseInt(intPart, 16).toString(10);
    let fracDec = fracPart ? hexToDecimalFrac(fracPart) : '';
    return intDec + (fracDec ? '.' + fracDec : '');
}

function hex_to_bin(iNum) {
    let [intPart, fracPart] = iNum.split('.');
    let intBin = parseInt(intPart, 16).toString(2);
    let fracBin = fracPart ? hexToBinaryFrac(fracPart) : '';
    return intBin + (fracBin ? '.' + fracBin : '');
}

function hex_to_oct(iNum) {
    let [intPart, fracPart] = iNum.split('.');
    let intOct = parseInt(intPart, 16).toString(8);
    let fracOct = fracPart ? hexToOctalFrac(fracPart) : '';
    return intOct + (fracOct ? '.' + fracOct : '');
}

// Conversion for fractional parts

// Convert decimal fraction to binary
function decToBinaryFrac(frac) {
    let bin = '';
    let fracVal = parseFloat('0.' + frac);
    while (fracVal !== 0) {
        fracVal *= 2;
        let digit = Math.floor(fracVal);
        bin += digit.toString();
        fracVal -= digit;
    }
    return bin;
}

// Convert decimal fraction to octal
function decToOctalFrac(frac) {
    let oct = '';
    let fracVal = parseFloat('0.' + frac);
    while (fracVal !== 0) {
        fracVal *= 8;
        let digit = Math.floor(fracVal);
        oct += digit.toString();
        fracVal -= digit;
    }
    return oct;
}

// Convert decimal fraction to hexadecimal
function decToHexFrac(frac) {
    let hex = '';
    let fracVal = parseFloat('0.' + frac);
    while (fracVal !== 0) {
        fracVal *= 16;
        let digit = Math.floor(fracVal);
        hex += digit.toString(16).toUpperCase();
        fracVal -= digit;
    }
    return hex;
}

// Convert binary fraction to decimal
function binToDecimalFrac(frac) {
    let dec = 0;
    for (let i = 0; i < frac.length; i++) {
        dec += parseInt(frac[i]) * Math.pow(2, -(i + 1));
    }
    return dec.toString(10).split('.')[1] || '';
}

// Convert binary fraction to octal
function binToOctalFrac(frac) {
    return decToOctalFrac(binToDecimalFrac(frac));
}

// Convert binary fraction to hexadecimal
function binToHexFrac(frac) {
    return decToHexFrac(binToDecimalFrac(frac));
}

// Convert octal fraction to decimal
function octToDecimalFrac(frac) {
    let dec = 0;
    for (let i = 0; i < frac.length; i++) {
        dec += parseInt(frac[i]) * Math.pow(8, -(i + 1));
    }
    return dec.toString(10).split('.')[1] || '';
}

// Convert octal fraction to binary
function octToBinaryFrac(frac) {
    return decToBinaryFrac(octToDecimalFrac(frac));
}

// Convert octal fraction to hexadecimal
function octToHexFrac(frac) {
    return decToHexFrac(octToDecimalFrac(frac));
}

// Convert hexadecimal fraction to decimal
function hexToDecimalFrac(frac) {
    let dec = 0;
    for (let i = 0; i < frac.length; i++) {
        dec += parseInt(frac[i], 16) * Math.pow(16, -(i + 1));
    }
    return dec.toString(10).split('.')[1] || '';
}

// Convert hexadecimal fraction to binary
function hexToBinaryFrac(frac) {
    return decToBinaryFrac(hexToDecimalFrac(frac));
}

// Convert hexadecimal fraction to octal
function hexToOctalFrac(frac) {
    return decToOctalFrac(hexToDecimalFrac(frac));
}
