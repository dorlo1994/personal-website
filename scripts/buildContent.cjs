const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");

const CONTENT_PATH = "content";
const OUTPUT_PATH = path.join(CONTENT_PATH, "generated");

fs.mkdirSync(OUTPUT_PATH, { recursive: true });

function slugify(filePath) {
  return path
    .basename(filePath, ".md")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function parseMarkdownFiles(pattern, type) {
  const files = glob.sync(pattern, { nocase: true });

  return files.map((file) => {
    const raw = fs.readFileSync(file, "utf-8");
    const { data, content } = matter(raw);

    return {
      type,
      slug: data.slug || slugify(file),
      ...data,
      content,
    };
  });
}

//
// 1️⃣ Blog Posts
//
const blogPosts = parseMarkdownFiles(
  `${CONTENT_PATH}/Blog/**/*.md`,
  "blog"
);

// Remove drafts
const publishedBlogPosts = blogPosts.filter(
  (post) => post.draft !== true
);

// Sort newest first
publishedBlogPosts.sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

//
// 2️⃣ Projects
//
const projects = parseMarkdownFiles(
  `${CONTENT_PATH}/Projects/**/*.md`,
  "project"
);

// Sorting logic
const statusOrder = {
  ongoing: 0,
  completed: 1,
  archived: 2,
};

projects.sort((a, b) => {
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;

  const statusCompare =
    (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99);
  if (statusCompare !== 0) return statusCompare;

  return new Date(b.startDate || 0) - new Date(a.startDate || 0);
});

//
// 3️⃣ Unified Search Index
//
const searchIndex = [
  ...publishedBlogPosts.map((post) => ({
    type: "blog",
    slug: post.slug,
    title: post.title,
    tags: post.tags || [],
    content: post.content,
  })),
  ...projects.map((project) => ({
    type: "project",
    slug: project.slug,
    title: project.title,
    tags: project.tags || [],
    status: project.status,
    content: project.content,
  })),
];

//
// 4️⃣ Write Outputs
//
fs.writeFileSync(
  path.join(OUTPUT_PATH, "blog.json"),
  JSON.stringify(publishedBlogPosts, null, 2)
);

fs.writeFileSync(
  path.join(OUTPUT_PATH, "projects.json"),
  JSON.stringify(projects, null, 2)
);

fs.writeFileSync(
  path.join(OUTPUT_PATH, "searchIndex.json"),
  JSON.stringify(searchIndex, null, 2)
);

console.log("✅ Content build complete.");

