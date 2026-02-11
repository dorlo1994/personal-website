const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");

const CONTENT_PATH = "content/";
const OUTPUT_PATH = "content/generated";

fs.mkdirSync(OUTPUT_PATH, { recursive: true });

const files = glob.sync(`${CONTENT_PATH}/**/*.md`);

const posts = files.map((file) => {
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug: file.toLowerCase()
      .replace(CONTENT_PATH, "")
      .replace("blog/", "")
      .replace(/\s+/g, "-")
      .replace(".md", ""),
    ...data,
    content,
  };
});

fs.writeFileSync(
  path.join(OUTPUT_PATH, "content.json"),
  JSON.stringify(posts, null, 2)
);

