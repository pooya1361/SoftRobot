import React from 'react';
import BaseCss from './baseCss';

export default class Html extends React.Component {
  render() {
    const title = this.props.title;

    return (
      <html>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="https://www.softrobot.se/favicon/favicon.png" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content={title} />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#49cfae"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=no"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,300,500"
            rel="stylesheet"
            type="text/css"
          />
          <title>{title}</title>
          <BaseCss />
        </head>
        <body>
          <div id="app" />
          <script src="/public/build/app-manifest.js" />
          <script src="/public/build/vendor.js" />
          <script src="/public/build/client.js" />
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  title: React.PropTypes.string.isRequired,
};
