const usernameInp = document.getElementById("usernameInp");
const searchBtn = document.getElementById("search");
const card = document.getElementById("card");

function getUserProfile(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("User not found.");

    return raw.json();
  });
}

function decorateProfile(details) {
  const {
    avatar_url,
    name,
    login,
    company,
    followers,
    following,
    public_repos,
    html_url,
    bio,
    blog,
    location,
    twitter_username,
    hireable,
  } = details;
  const displayName = name || login;
  const displayCompany = company || "—";
  const displayBio = bio || "No bio provided.";
  const displayLocation = location || "No location provided.";
  const displayBlog = blog
    ? blog.startsWith("http")
      ? blog
      : `https://${blog}`
    : null;
  const displayTwitter = twitter_username
    ? `https://twitter.com/${twitter_username}`
    : null;
  const hireableText = hireable ? "Yes" : "No";

  const data = `
    <section>
      <!-- Profile Card -->
      <article class="lg:col-span-1 fade-in">
        <div class="glass rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7 shadow-2xl">
          <div class="flex items-start gap-5">
            <img src="${avatar_url}" alt="${login} avatar" class="w-24 h-24 rounded-2xl object-cover" />
            <div class="flex-1">
              <div class="text-xl font-semibold text-slate-100">${displayName}</div>
                            <div class="mt-3 text-sm text-slate-300">${company}</div>

              <div class="mt-3 text-sm text-slate-300">${displayBio}</div>
              <div class="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                <span class="inline-flex items-center gap-1 rounded-xl bg-slate-800/70 px-3 py-1 ring-1 ring-white/10">Followers: ${followers}</span>
                <span class="inline-flex items-center gap-1 rounded-xl bg-slate-800/70 px-3 py-1 ring-1 ring-white/10">Following: ${following}</span>
                <span class="inline-flex items-center gap-1 rounded-xl bg-slate-800/70 px-3 py-1 ring-1 ring-white/10">Public Repos: ${public_repos}</span>
              </div>
            </div>
          </div>

  

          <div class="mt-6 flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <a href="${html_url}" target="_blank" class="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-slate-900 px-4 py-2 font-semibold hover:bg-slate-200 transition ring-1 ring-slate-200">
                View on GitHub
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
              <div class="text-sm text-slate-300">Hireable: <span class="font-semibold text-slate-100">${hireableText}</span></div>
            </div>

            <div class="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <div class="inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"/></svg>
                <span>${displayLocation}</span>
              </div>
              ${
                displayBlog
                  ? `<a href="${displayBlog}" target="_blank" class="inline-flex items-center gap-2 text-slate-300 hover:underline"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 14L21 3"/><path d="M21 10v-7h-7"/></svg>Website</a>`
                  : '<span class="text-slate-500">Website: —</span>'
              }
              ${
                displayTwitter
                  ? `<a href="${displayTwitter}" target="_blank" class="inline-flex items-center gap-2 text-slate-300 hover:underline"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.8v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>@${twitter_username}</a>`
                  : '<span class="text-slate-500">Twitter: —</span>'
              }
            </div>
          </div>
        </div>
      </article>

      <!-- Repo List -->
    </section>
  `;

  card.innerHTML = data;
}

searchBtn.addEventListener("click", function () {
  const username = usernameInp.value.trim();
  getUserProfile(username).then((data) => decorateProfile(data));
});
