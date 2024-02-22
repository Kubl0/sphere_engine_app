import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const widgetScript = `
    <script>
        (function(d, s, id){
          SE_BASE = "widgets.sphere-engine.com";
          SE_HTTPS = true;
          SE = window.SE || (window.SE = []);
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = (SE_HTTPS ? "https" : "http") + "://" + SE_BASE + "/static/sdk/sdk.min.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, "script", "sphere-engine-jssdk"));
    </script>
  `;
 
    const widgetDiv = '<div class="se-widget" data-widget="Wv2PWl6dkS"></div>';

    res.send(`${widgetScript}${widgetDiv}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});