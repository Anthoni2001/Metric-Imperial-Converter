function ConvertHandler() {
  
  this.getNum = function(input) {
    let firstCharIndex = input.search(/[a-zA-Z]/);
    let numStr = firstCharIndex === -1 ? input : input.slice(0, firstCharIndex);

    if (numStr === '') {
      return 1;
    }

    let parts = numStr.split('/');
    if (parts.length > 2) {
      return 'invalid number';
    }

    let result;
    if (parts.length === 2) {
      result = parseFloat(parts[0]) / parseFloat(parts[1]);
    } else {
      result = parseFloat(numStr);
    }
    
    if (isNaN(result)) {
      return 'invalid number';
    }

    return result;
  };
  
  this.getUnit = function(input) {
    let firstCharIndex = input.search(/[a-zA-Z]/);
    if (firstCharIndex === -1) {
      return 'invalid unit';
    }
    
    let unit = input.slice(firstCharIndex).toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (validUnits.includes(unit)) {
      return unit === 'l' ? 'L' : unit;
    }
    
    return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitLower = initUnit.toLowerCase();
    switch (unitLower) {
      case 'gal': return 'L';
      case 'l': return 'gal';
      case 'mi': return 'km';
      case 'km': return 'mi';
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
      default: return 'invalid unit';
    }
  };

  this.spellOutUnit = function(unit) {
    const unitLower = unit.toLowerCase();
    switch (unitLower) {
      case 'gal': return 'gallons';
      case 'l': return 'liters';
      case 'mi': return 'miles';
      case 'km': return 'kilometers';
      case 'lbs': return 'pounds';
      case 'kg': return 'kilograms';
      default: return 'invalid unit';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const unitLower = initUnit.toLowerCase();
    let result;

    switch (unitLower) {
      case 'gal': result = initNum * galToL; break;
      case 'l': result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitStr = this.spellOutUnit(initUnit);
    const returnUnitStr = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;
  };
  
}

module.exports = ConvertHandler;