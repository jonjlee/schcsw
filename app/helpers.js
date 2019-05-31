const weightAsNum = (weightStr) => {
  try {
    return parseFloat(weightStr) || 0;
  } catch(e) {
  }
  return 0;
}

const getDose = (drug, mgPerKg, maxMg, weightStr) => {
  // Return dose calculation for drug based on weight in the form of:
  //   ampicillin 100mg/kg = 2300mg
  // or, if no weight:
  //   ampicillin 100mg/kg (max 3000mg)
  const weight = weightAsNum(weightStr);
  if (weight > 0) {
    const perKgDose = Math.ceil(mgPerKg * weight);
    const dose = (maxMg > 0) ? Math.min(perKgDose, maxMg) : perKgDose;
    return drug + ' ' + mgPerKg + ' mg/kg = ' + dose + 'mg';
  } else {
    const maxDoseStr = maxMg > 0 ? (' (max ' + maxMg + ' mg)') : ''
    return drug + ' ' + mgPerKg + ' mg/kg' + maxDoseStr;
  }
}

const getBolusDose = (weightStr, mLPerKg=20, maxML=1000) => {
  // Return volume of bolus in the form of:
  //   300mL (20 mL/kg)
  // or, if no weight:
  //   20 mL/kg (max 1000mL)
  const weight = weightAsNum(weightStr);
  if (weight > 0) {
    const dose = Math.min(weight * mLPerKg, maxML)
    return dose + 'mL (' + mLPerKg + 'mL/kg)';
  } else {
    return mLPerKg + ' mL/kg (max ' + maxML + 'mL)';
  }
}

export default {
  getDose,
  getBolusDose,
}