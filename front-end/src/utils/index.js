const getDistances = (project, traders) => {
  Number.prototype.toRad = function() {
    const val = this;
    return (val * Math.PI) / 180;
  };

  return traders.map(trader => {
    let R = 6371e3; // metres
    let φ1 = project.lat.toRad();
    let φ2 = trader.lat.toRad();
    let Δφ = (trader.lat - project.lat).toRad();
    let Δλ = (trader.lng - project.lng).toRad();

    let a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    trader.distance = (Math.round(R * c) / 1000).toFixed(1);
    return trader;
  });
};

const getAge = birthday => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const ratingBgColorChooser = score => {
  if (score === 0) return '#c5c5c5';
  else if (score > 0 && score < 2) return 'red';
  else if (score >= 2 && score < 3) return '#FFBF00';
  else if (score >= 3 && score <= 5) return '#1EB300';
};

export { getDistances, getAge, ratingBgColorChooser };
