const express = require('express')
const path = require('path');
const app = express();
const UAParser = require('ua-parser-js');
const port = 3000;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  const parser = new UAParser(req.headers['user-agent']);

  res.locals.isDesktop = parser.getDevice().type === undefined;
  res.locals.isPhone = parser.getDevice().type === 'mobile';
  res.locals.isTablet = parser.getDevice().type === 'tablet';
  console.log(res.locals.isDesktop, res.locals.isPhone, res.locals.isTablet);

  next();
});

app.get('/', (req, res) => {
  res.render('pages/home');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});