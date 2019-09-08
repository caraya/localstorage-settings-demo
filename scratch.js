      const weight = document.getElementById('robotoWeight');
      const weightSlider = document.querySelector('.weightSlider');
      weightSlider.innerHTML = weight.value;

      const width = document.getElementById('robotoWidth');
      const widthSlider = document.querySelector('.widthSlider');
      widthSlider.innerHTML = width.value;

      const lineHeight = document.getElementById('lineHeight');
      const lineHeightSlider = document.querySelector('.lineHeightSlider');
      lineHeightSlider.innerHTML = lineHeight.value;

      const sheet = document.styleSheets[0];
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
       * @description inserts CSS rules into the specified stylesheet
       * Credit to David Walsh
       * @param {string} sheet
       * @param {string} selector
       * @param {string} rules
       * @param {string} index
       */
      function addCSSRule(
        sheet = document.styleSheets[0],
        selector,
        rules,
        index,
      ) {
        if ('insertRule' in sheet) {
          sheet.insertRule(selector + '{' + rules + '}', index);
        } else if ('addRule' in sheet) {
          sheet.addRule(selector, rules, index);
        }
      }

      weight.oninput = function() {
        weightSlider.innerHTML = weight.value;
        // setting the style
        addCSSRule('', ':root', ' "wght" ' + weight.value);
        // pushing it to local storage
        if (hasLocalStorage) {
          localStorage.setItem('font-weight', `"wght" ${weight.value}`);
        }
      };

      width.oninput = function() {
        widthSlider.innerHTML = width.value;
        addCSSRule('', ':root', '"wdth" ' + width.value);
        if (hasLocalStorage) {
          localStorage.setItem('font-width', `"wdth" ${width.value}`);
        }
      };

      lineHeight.oninput = function() {
        lineHeightSlider.innerHTML = lineHeight.value;
        addCSSRule('', 'line-height', lineHeight.value);
        localStorage.setItem('line-height', lineHeight.value);
      };

      // If we have local storage values then use them here to set
      // the root values
      // Test if we support a working localStorage
      if (hasLocalStorage) {
        if (localStorage.getItem('font-weight')) {
          console.log(localStorage.getItem('font-weight'));
          addCSSRule(
            '',
            ':root',
            '--font-weight: ' + localStorage.getItem('font-weight'),
          );
          // setRootVar('font-weight', localStorage.getItem('font-weight'));
        }

        if (localStorage.getItem('font-width')) {
          addCSSRule(
            '',
            ':root',
            'font-width: ' + localStorage.getItem('font-width'),
          );
          // setRootVar('font-width', localStorage.getItem('font-width'));
        } else {
          console.log("can't get the value for font-width");
          console.log(localStorage.getItem('font-width'));
        }

        if (localStorage.getItem('line-height')) {
          addCSSRule(
            '',
            ':root',
            '--line-height ' + localStorage.getItem('line-height'),
          );
          // setRootVar('line-height', localStorage.getItem('line-height'));
        }
      }
