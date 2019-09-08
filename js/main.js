/**
 * @name hasLocalStorage
 * @description Checks if we have a working implementation of local storage. \
 * Credit to Mathias Bynens
 *
 */
function hasLocalStorage() {
  try {
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
    return true;
  } catch (e) {
    console.log('Local Storage Not Supported');
    return false;
  }
}

/**
 * @name addCSSRule
 * @description inserts CSS rules into the specified stylesheet. Credit to David Walsh
 * @param {string} sheet
 * @param {string} selector
 * @param {string} rules
 * @param {string} index
 */
function addCSSRule(sheet, selector, rules, index) {
  if ('insertRule' in style) {
    sheet.insertRule(selector + '{' + rules + '}', index);
  } else if ('addRule' in style) {
    sheet.addRule(selector, rules, index);
  }
}

// Define variables for each of the elements we want to track
const weight = document.getElementById('robotoWeight');
const weightSlider = document.querySelector('.weightSlider');
weightSlider.innerHTML = weight.value;

const width = document.getElementById('robotoWidth');
const widthSlider = document.querySelector('.widthSlider');
widthSlider.innerHTML = width.value;

const lineHeight = document.getElementById('lineHeight');
const lineHeightSlider = document.querySelector('.lineHeightSlider');
lineHeightSlider.innerHTML = lineHeight.value;

// Create the <style> tag to host our dynamic styles
const style = document.createElement('style');
// Add a media (and/or media query) here if you'd like!
style.setAttribute('media', 'screen');
// style.setAttribute("media", "only screen and (max-width : 1024px)")
// Make it defer by default
style.setAttribute('defer', '');
// WebKit hack :(
style.appendChild(document.createTextNode(''));
// Add the <style> element to the page
document.head.appendChild(style);

weight.oninput = function () {
  weightSlider.innerHTML = weight.value;
  // setting the style
  addCSSRule(
    document.styleSheets[1].cssRules,
    ':root',
    '--font-weight: "wght" ' + weight.value,
  );
  // pushing it to local storage
  if (hasLocalStorage) {
    localStorage.setItem('font-weight', `"wght" ${weight.value}`);
  }
};

width.oninput = function () {
  widthSlider.innerHTML = width.value;
  addCSSRule(
    document.styleSheets[1].cssRules,
    ':root',
    '--font-width: "wdth" ' + width.value,
  );
  if (hasLocalStorage) {
    localStorage.setItem('font-width', `"wdth" ${width.value}`);
  }
};

lineHeight.oninput = function () {
  lineHeightSlider.innerHTML = lineHeight.value;
  addCSSRule(
    document.styleSheets[1].cssRules,
    ':root',
    '--line-height: ' + lineHeight.value,
  );
  localStorage.setItem('line-height', lineHeight.value);
};

// If we have local storage values then use them here to set the root values
// Test if we support a working localStorage
if (hasLocalStorage) {
  if (localStorage.getItem('font-weight')) {
    addCSSRule(
      document.styleSheets[1].cssRules,
      ':root',
      `--font-weight: ${localStorage.getItem('font-weight')}`,
    );
  }
}
// if (hasLocalStorage) {
if (localStorage.getItem('line-height')) {
  addCSSRule(
    document.styleSheets[1].cssRules,
    ':root', `line-height: ${localStorage.getItem('line-height')};`
  );
  console.log(document.styleSheets[1].cssRules);
}
