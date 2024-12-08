const main = document.querySelector('main');
const pages = [
  {
    title: "First Post",
    desc: "First Article",
    link: "p1"
  },
  {
    title: "Second Post",
    desc: "Second Article",
    link: "p2"
  }
];
const url = new URL(location.href);

if (url.search === "") {
  main.innerHTML = `
      <img src="./keto.svg" alt="icon" class="icon" />
      <h1>welcome to my blog.</h1>
      <p>メモなどを投稿しています。</p>
      <h2>Articles</h2>
      <div id="articles"></div>
      <h2>Links</h2>
      <ul id="links">
        <li><a href="https://keto21.f5.si/">プロフィールサイト</a></li>
        <li><a href="https://ch.keto21.f5.si/">チャットルーム (メッセージは保存されません)</a></li>
      </ul>
  `;

  const articles = document.querySelector("#articles");

  pages.forEach(page => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${page.title}</h3>
      <hr />
      <p>${page.desc}</p>
      <br />
      <a href="./?ar=${page.link}">READ</a>
    `;
    articles.appendChild(div);
  });
} else {
  const params = new URLSearchParams(url.search);
  const page = params.get("ar");
  fetch(`./posts/${page}.md`)
    .then(res => {
      if(!res.ok) {
        throw new Error("Error");
      }
      return res.text();
    })
    .then(data => {
      const content = document.createElement("div");
      content.className = "mBd";
      content.innerHTML = marked.parse(data);
      main.innerHTML = "";
      main.appendChild(content);
    })
    .catch(err => {
      main.innerHTML = `<h1>404 Not Found</h1><br /><p>${err}</p>`;
    })
}