function renderPostDetails(post) {
    return `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
          <div class='news-item'>
            <p>
              <span class="news-position">${post.id}. ▲</span>
              ${post.title}
              <small>(by ${post.name})</small>
            </p>
            <p class="news-info">
              ${post.content}
            </p>
          </div>
      </div>
    </body>
  </html>`;
  }
  
  module.exports = renderPostDetails;
  