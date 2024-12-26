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
        inpbin: /^[01]+$/,
        inpoct: /^[0-7]+$/,
        inpdec: /^[0-9]+$/,
        inphex: /^[0-9A-Fa-f]+$/
    };
    return patterns[iType].test(iNum);
}

// Conversion functions
function dec_to_bin(iNum) {
    return parseInt(iNum, 10).toString(2);
}
function dec_to_oct(iNum) {
    return parseInt(iNum, 10).toString(8);
}
function dec_to_hex(iNum) {
    return parseInt(iNum, 10).toString(16).toUpperCase();
}
function bin_to_dec(iNum) {
    return parseInt(iNum, 2).toString(10);
}
function bin_to_oct(iNum) {
    return parseInt(iNum, 2).toString(8);
}
function bin_to_hex(iNum) {
    return parseInt(iNum, 2).toString(16).toUpperCase();
}
function oct_to_dec(iNum) {
    return parseInt(iNum, 8).toString(10);
}
function oct_to_bin(iNum) {
    return parseInt(iNum, 8).toString(2);
}
function oct_to_hex(iNum) {
    return parseInt(iNum, 8).toString(16).toUpperCase();
}
function hex_to_dec(iNum) {
    return parseInt(iNum, 16).toString(10);
}
function hex_to_bin(iNum) {
    return parseInt(iNum, 16).toString(2);
}
function hex_to_oct(iNum) {
    return parseInt(iNum, 16).toString(8);
}
