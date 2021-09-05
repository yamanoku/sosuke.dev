const { Octokit } = require("@octokit/rest");
const { format } = require("date-fns");
const path = require("path");
const fs = require("fs/promises");

require("dotenv").config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const QUERY = {
  issue: "-user:sosukesuzuki author:sosukesuzuki is:public is:issue",
  pr: "-user:sosukesuzuki author:sosukesuzuki is:public is:pr",
};

async function search(query) {
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 25,
    page: 1,
  });
  const items = data.items.map(({ html_url, title, number }) => {
    const splitted = html_url.split("/");
    const repo = `${splitted[3]}/${splitted[4]}`;
    return {
      repo,
      number,
      url: html_url,
      title,
    };
  });
  return items;
}

async function searchIssuesAndPrs() {
  const cacheFilePath = path.join(__dirname, "github.cache.txt");
  if (process.env.NODE_ENV === "development") {
    let data;
    try {
      data = (await fs.readFile(cacheFilePath, "utf-8")).trim();
    } catch {}
    if (data) {
      return JSON.parse(data);
    }
  }
  const issues = await search(QUERY.issue);
  const pullRequests = await search(QUERY.pr);
  const result = { issues, pullRequests };
  if (process.env.NODE_ENV === "development") {
    await fs.writeFile(cacheFilePath, JSON.stringify(result));
  }
  return result;
}

function renderItems(items) {
  return `${items
    .map(({ title, url, number, repo }) => {
      return `<li>
    <a href="${url}" target="_blank" rel="noopener">${repo}#${number}: ${title}</a>
    </li>`;
    })
    .join("")}`;
}
module.exports = class {
  async data() {
    const { issues, pullRequests } = await searchIssuesAndPrs();
    return {
      title: "sosukesuzuki's GitHub activities",
      layout: "layout.11ty.js",
      description:
        "Latest 25 Issues and 25 Pull Requests created by @sosukesuzuki",
      issues,
      pullRequests,
    };
  }
  render({ description, issues, pullRequests }) {
    return `<div>
    <div>
    <p>${description}(last fetched: ${format(new Date(), "yyyy/MM/dd")})</p>
    </div>
    <div>
    <h2>Pull Requests</h2>
    ${renderItems(pullRequests)}
    <h2>Issues</h2>
    <ul> 
    ${renderItems(issues)}
    </ul>
    </div>
    </div>`;
  }
};
