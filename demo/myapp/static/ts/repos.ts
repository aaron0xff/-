// API Card
// API Name: GitHub REST API (Search Repositories)
// Base URL: https://api.github.com
// Endpoint used: /search/repositories?q=typescript&per_page=12
// HTTP method: GET
// Status code seen: 200
// Fields used: id, full_name, description, stargazers_count, language, html_url

interface Repo {
  id: number;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
}

interface RepoSearchResponse {
  total_count: number;
  items: Repo[];
}

const statusEl = document.getElementById("status") as HTMLParagraphElement;
const resultsEl = document.getElementById("results") as HTMLDivElement;
const searchForm = document.getElementById("searchForm") as HTMLFormElement;
const queryInput = document.getElementById("queryInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const exportBtn = document.getElementById("exportBtn") as HTMLButtonElement;

let currentRepos: Repo[] = [];

async function getJSON<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

function setStatus(text: string): void {
  statusEl.textContent = text;
}

function createCard(repo: Repo): HTMLElement {
  const card = document.createElement("div");
  card.className = "card";

  const title = document.createElement("h3");
  title.textContent = repo.full_name;

  const desc = document.createElement("p");
  desc.textContent = repo.description ?? "No description provided.";

  const meta = document.createElement("p");
  const lang = repo.language ?? "Unknown";
  meta.textContent = `${lang} • ★ ${repo.stargazers_count.toLocaleString()}`;

  const link = document.createElement("a");
  link.href = repo.html_url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "View on GitHub →";
  link.style.color = "#f6c85f";
  link.style.textDecoration = "none";
  link.style.fontWeight = "bold";
  link.style.marginTop = "auto";

  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(meta);
  card.appendChild(link);

  return card;
}

function render(items: Repo[]): void {
  resultsEl.innerHTML = "";
  currentRepos = items;
  exportBtn.disabled = items.length === 0;

  if (items.length === 0) {
    setStatus("No results found.");
    return;
  }

  items.forEach(item => resultsEl.appendChild(createCard(item)));
  setStatus(`Loaded ${items.length} result(s).`);
}

function buildURL(query: string): string {
  const BASE_URL = "https://api.github.com/search/repositories";
  return `${BASE_URL}?q=${encodeURIComponent(query)}&per_page=12`;
}

async function search(): Promise<void> {
  const query = queryInput.value.trim();
  if (!query) {
    setStatus("Please enter a search term.");
    return;
  }

  searchBtn.disabled = true;
  exportBtn.disabled = true;
  setStatus("Loading...");
  resultsEl.innerHTML = "";

  try {
    const data = await getJSON<RepoSearchResponse>(buildURL(query));
    render(data.items ?? []);
    localStorage.setItem("lastRepoQuery", query);
  } catch (err: unknown) {
    const msg =
      err instanceof Error
        ? err.name === "AbortError"
          ? "Request timed out"
          : err.message
        : "Unknown error";
    setStatus(`Load failed: ${msg}`);
  } finally {
    searchBtn.disabled = false;
  }
}

searchForm.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  search();
});

function exportCSV(items: Repo[]): void {
  if (items.length === 0) return;

  const header = ["ID", "Repository", "Language", "Stars", "Description", "URL"];
  const rows = items.map(r => [
    String(r.id),
    r.full_name ?? "",
    r.language ?? "",
    String(r.stargazers_count ?? 0),
    r.description ?? "",
    r.html_url ?? ""
  ]);

  const csvContent = [header, ...rows]
    .map(row => row.map(val => `"${String(val ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "github_repos.csv";
  link.click();
  URL.revokeObjectURL(url);
}

exportBtn.addEventListener("click", () => {
  exportCSV(currentRepos);
});

window.addEventListener("DOMContentLoaded", () => {
  const lastQuery = localStorage.getItem("lastRepoQuery");
  if (lastQuery) {
    queryInput.value = lastQuery;
    search();
  }
});