
//*************************************************************************** */

            // BDHO Converter
            // Number system converter
            // design by Amit barman on 14/06/2022

            //follow me on github - https://github.com/AmitBarman99/

//*************************************************************************** */
//conversion 

function convert(){
    var iType=document.getElementById("inpType").value;
    var iNum=document.getElementById("inpNum").value;
    var oType=document.getElementById("opType").value;
    var oNum;

    //all the conditions

    //decimal to binary,octal and hexa-decimal
    if(iType=="inpdec" && oType=="opbin"){
        oNum=dec_to_bin(iNum);
    }
    if(iType=="inpdec" && oType=="opoct"){
        oNum=dec_to_oct(iNum);
    }
    if(iType=="inpdec" && oType=="ophex"){
        oNum=dec_to_hex(iNum);
    }
    if(iType=="inpdec" && oType=="opdec"){
        oNum="Invalid";
    }

    //binary to decimal,octal and hexa-decimal
    if(iType=="inpbin" && oType=="opdec"){
        oNum=bin_to_dec(iNum);
    }
    if(iType=="inpbin" && oType=="opoct"){
        oNum=bin_to_oct(iNum);
    }
    if(iType=="inpbin" && oType=="ophex"){
        oNum=bin_to_hex(iNum);
    }
    if(iType=="inpbin" && oType=="opbin"){
        oNum="Invalid";
    }

    //octal to decimal, binary and hexa-decimal

    if(iType=="inpoct" && oType=="opdec"){
        oNum=oct_to_dec(iNum);
    }
    if(iType=="inpoct" && oType=="opbin"){
        oNum=oct_to_bin(iNum);
    }
    if(iType=="inpoct" && oType=="ophex"){
        oNum=oct_to_hex(iNum);
    }
    if(iType=="inpoct" && oType=="opoct"){
        oNum="Invalid";
    }

    //hexa-decimal to decimal,binary and octal

    if(iType=="inphex" && oType=="opdec"){
        oNum=hex_to_dec(iNum);
    }
    if(iType=="inphex" && oType=="opbin"){
        oNum=hex_to_bin(iNum);
    }
    if(iType=="inphex" && oType=="opoct"){
        oNum=hex_to_oct(iNum);
    }
    if(iType=="inphex" && oType=="ophex"){
        oNum="Invalid";
    }

    document.getElementById("opNum").value = oNum;
    // preventDefault();
    return false;
}

// function for decimal to binary conversion
function dec_to_bin(iNum){
    // return parseInt(iNum).toString(2);
    return parseFloat(iNum).toString(2);
}
// function for decimal to octal conversion
function dec_to_oct(iNum){
    return parseFloat(iNum).toString(8);
}
// function for decimal to hexa-decimal conversion
function dec_to_hex(iNum){
    return parseFloat(iNum).toString(16);
}

// function for binary to decimal conversion
function bin_to_dec(iNum){
    return parseInt(iNum,2).toString(10);
}
// function for binary to octal conversion
function bin_to_oct(iNum){
    return parseInt(iNum,2).toString(8);
}
// function for binary to hexa-decimal conversion
function bin_to_hex(iNum){
    return parseInt(iNum,2).toString(16);
}


// function for octal to decimal conversion
function oct_to_dec(iNum){
    return parseInt(iNum,8).toString(10);
}
// function for octal to binary conversion
function oct_to_bin(iNum){
    return parseInt(iNum,8).toString(2);
}
// function for octal to hexa-decimal conversion
function oct_to_hex(iNum){
    return parseInt(iNum,8).toString(16);
}

// function for hexa-decimal to decimal conversion
function hex_to_dec(iNum){
    return parseInt(iNum,16).toString(10);
}
// function for hexa-decimal to binary conversion
function hex_to_bin(iNum){
    return parseInt(iNum,16).toString(2);
}
// function for hexa-decimal to octal conversion
function hex_to_oct(iNum){
    return parseInt(iNum,16).toString(8);
}

