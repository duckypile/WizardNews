const express = require("express");
const app = express();
const morgan = require("morgan");
const postBank = require("./postBank");
const renderPostList = require("./views/postList");
const renderPostDetails = require("./views/postDetails");

app.use(morgan('dev'));
app.use(express.static('public'));

app.get("/", (req, res) => {
  const posts = postBank.list();
  res.send(renderPostList(posts));
});

app.get('/posts/:id', (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);

  if (!post.id) {
    const error = new Error('Post not found');
    error.status = 404;
    next(error);
  } else {
    res.send(renderPostDetails(post));
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>${err.status}: ${err.message}</p>
      </div>
    </body>
    </html>`;
  res.send(html);
});

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
