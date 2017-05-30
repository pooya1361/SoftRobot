import React from 'react';
const css = `

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: sans-serif;
  font-weight: 300;
}


body {
  margin: 0;
}

html, body, #app {
  height: 100%;
}

html {
  overflow-y: scroll;
}

.material-icons {
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

`;

const BaseCss = () => {
  return <style dangerouslySetInnerHTML={ { __html: css } } />; // eslint-disable-line react/no-danger
};

export default BaseCss;
