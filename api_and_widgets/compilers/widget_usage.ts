import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const widgetScript = `
    <script>
      SEC_HTTPS = true;
      SEC_BASE = "compilers.widgets.sphere-engine.com";
      (function(d, s, id) {
        const SEC = window.SEC || (window.SEC = []);
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = (SEC_HTTPS ? "https" : "http") + "://" + SEC_BASE + "/static/sdk/sdk.min.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, "script", "sphere-engine-compilers-jssdk"));
    </script>
  `;

  const widgetDiv = '<div class="sec-widget" data-widget="ce0d5630ea8cd8021a45cc558c92b29f"></div>';

  res.send(`${widgetScript}${widgetDiv}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});