export interface PostItem {
  title: string;
  description?: string;
  date: string;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  featured?: boolean;
  path?: string;
  _path?: string;
  body?: unknown;
}

export type PostSort = "date-desc" | "date-asc" | "title-asc" | "title-desc";

export function resolvePostPath(post: Pick<PostItem, "path" | "_path">) {
  return post.path || post._path || "/posts";
}

export function formatPostDate(value?: string) {
  if (!value) {
    return "未标注日期";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function toSafeTime(value?: string) {
  const time = Date.parse(`${value ?? ""}T00:00:00`);
  return Number.isNaN(time) ? 0 : time;
}

export function sortPosts(posts: PostItem[], sortBy: PostSort = "date-desc") {
  return [...posts]
    .map((post, index) => ({ post, index }))
    .sort((left, right) => {
      const leftDate = toSafeTime(left.post.date);
      const rightDate = toSafeTime(right.post.date);

      if (sortBy === "date-desc") {
        return rightDate - leftDate || left.index - right.index;
      }

      if (sortBy === "date-asc") {
        return leftDate - rightDate || left.index - right.index;
      }

      const leftTitle = (left.post.title || "").toLocaleLowerCase("zh-CN");
      const rightTitle = (right.post.title || "").toLocaleLowerCase("zh-CN");
      const compared = leftTitle.localeCompare(rightTitle, "zh-CN");

      if (sortBy === "title-asc") {
        return compared || left.index - right.index;
      }

      return -compared || left.index - right.index;
    })
    .map(({ post }) => post);
}

function collectText(node: unknown): string {
  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((item) => collectText(item)).join(" ");
  }

  if (!node || typeof node !== "object") {
    return "";
  }

  const current = node as {
    value?: unknown;
    children?: unknown[];
    props?: Record<string, unknown>;
    type?: unknown;
  };

  return [
    collectText(current.value),
    collectText(current.children),
    collectText(current.props),
    typeof current.type === "string" ? current.type : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function estimateReadingTime(body: unknown) {
  const text = collectText(body);
  const characterCount = text.replace(/\s+/g, "").length;

  if (characterCount === 0) {
    return "1 分钟";
  }

  return `${Math.max(1, Math.ceil(characterCount / 300))} 分钟`;
}
