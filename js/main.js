const weight = document.getElementById('robotoWeight');
const weightSlider = document.querySelector('.weightSlider');
weightSlider.innerHTML = weight.value;

const width = document.getElementById('robotoWidth');
const widthSlider = document.querySelector('.widthSlider');
widthSlider.innerHTML = width.value;

const lineHeight = document.getElementById('lineHeight');
const lineHeightSlider = document.querySelector('.lineHeightSlider');
lineHeightSlider.innerHTML = lineHeight.value;

function setRootVar(name, value) {
  let rootStyles = document.styleSheets[0].cssRules[1].style;
  rootStyles.setProperty('--' + name, value);
}

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

weight.oninput = function () {
  weightSlider.innerHTML = weight.value;
  // setting the style
  setRootVar('font-weight', ' "wght" ' + weight.value);
  localStorage.setItem('font-weight', ' "wght" ' + weight.value);
  localStorage.setItem('weight-value', weight.value);
};

width.oninput = function () {
  widthSlider.innerHTML = width.value;
  setRootVar('font-width', ' "wdth" ' + width.value);
  localStorage.setItem('font-width', ' "wdth" ' + width.value);
  localStorage.setItem('width-value', width.value);
};

lineHeight.oninput = function () {
  lineHeightSlider.innerHTML = lineHeight.value;
  setRootVar('line-height', lineHeight.value);
  localStorage.setItem('line-height', lineHeight.value);
};

window.addEventListener('DOMContentLoaded', event => {
  setRootVar('font-weight', localStorage.getItem('font-weight'));
  robotoWeight.setAttribute(
    'value',
    localStorage.getItem('weight-value'),
  );
  weightSlider.innerHTML = localStorage.getItem('weight-value');

  setRootVar('font-width', localStorage.getItem('font-width'));
  robotoWidth.setAttribute('value', localStorage.getItem('width-value'));
  widthSlider.innerHTML = localStorage.getItem('width-value');

  setRootVar('line-height', localStorage.getItem('line-height'));
  lineHeight.setAttribute('value', localStorage.getItem('line-height'));
  lineHeightSlider.innerHTML = localStorage.getItem('line-height');
});
