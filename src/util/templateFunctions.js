// functions that are exposed to our pug templates. Any function in here is automatically available to be called in a template.
//

//Credit: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

module.exports = {
  numberWithCommas: numberWithCommas
};
