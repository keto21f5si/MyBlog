marked.use({
  gfm: true,
  breaks: true,
  headerIds: false
});

const main = document.querySelector("main");

const arUl = document.querySelector("#article_list");
const params = new URLSearchParams(window.location.search);
const article = params.get("ar");

const articleList = [
  { title: "Post 1", url: "p1" },
  { title: "Post 2", url: "p2" },
  { title: "Post 3", url: "p3" }
];

if (article) {
  const FILE = `./articles/${article}.md?${Date.now()}`;

  fetch(FILE)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      return res.text();
    })
    .then(MD => {
      main.classList.add("markdown-body");
      main.innerHTML = marked.parse(MD);
    })
    .catch(err => {
      main.innerHTML = `<h2>${err.message}</h2><br />
        <p>道に迷ったようだ...。<br />考えられる理由は</p><br />
        <ul>
          <li>ページがどこかに引っ越した</li>
          <li>存在しない</li>
          <li>魔法を間違えた<br />唱えた魔法: ./?ar=${article}</li>
        </ul><br />
        <p>上にある [HOME] をクリックしよう！</p>`;
    });
} else {
  if (arUl) {
    articleList.forEach(data => {
      const a = document.createElement("a");
      const li = document.createElement("li");
      a.href = "?ar=" + data.url;
      a.textContent = data.title;
      li.appendChild(a);
      arUl.appendChild(li);
    });
  }
}
