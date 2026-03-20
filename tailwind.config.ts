import typography from "@tailwindcss/typography";

export default {
  theme: {
    extend: {
      colors: {
        paper: "#f6f1e8",
        surface: "#fffdf8",
        "surface-muted": "#efe7db",
        ink: "#161412",
        "ink-soft": "#3f3a34",
        "ink-subtle": "#726b63",
        outline: "#d9cfbf",
        "outline-strong": "#b8ad9d",
        sunrise: "#d18459",
        "sunrise-soft": "#f2ddd0",
        sea: "#8da5b3",
        "sea-soft": "#d7e2e8",
        moss: "#89986f",
        "moss-soft": "#e1e8d5",
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '"Noto Sans CJK SC"',
          '"Source Han Sans SC"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          "sans-serif",
        ],
        serif: [
          '"Noto Serif SC"',
          '"Source Han Serif SC"',
          '"Songti SC"',
          '"STSong"',
          "serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"Sarasa Mono SC"',
          '"Cascadia Code"',
          "ui-monospace",
          "monospace",
        ],
        reading: [
          '"Noto Sans SC"',
          '"Noto Sans CJK SC"',
          '"Source Han Sans SC"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          "sans-serif",
        ],
      },
      maxWidth: {
        shell: "80rem",
        layout: "72rem",
        reading: "46rem",
      },
      boxShadow: {
        soft: "0 10px 28px rgba(31, 24, 15, 0.05)",
        panel: "0 18px 44px rgba(31, 24, 15, 0.08)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      typography: ({
        theme,
      }: {
        theme: (path: string) => string | string[];
      }) => ({
        journal: {
          css: {
            "--tw-prose-body": theme("colors.ink-soft") as string,
            "--tw-prose-headings": theme("colors.ink") as string,
            "--tw-prose-lead": theme("colors.ink-soft") as string,
            "--tw-prose-links": theme("colors.ink") as string,
            "--tw-prose-bold": theme("colors.ink") as string,
            "--tw-prose-counters": theme("colors.ink-subtle") as string,
            "--tw-prose-bullets": theme("colors.outline-strong") as string,
            "--tw-prose-hr": theme("colors.outline") as string,
            "--tw-prose-quotes": theme("colors.ink-soft") as string,
            "--tw-prose-quote-borders": theme("colors.sunrise") as string,
            "--tw-prose-captions": theme("colors.ink-subtle") as string,
            "--tw-prose-code": theme("colors.ink") as string,
            "--tw-prose-pre-code": "#2b2722",
            "--tw-prose-pre-bg": "#f4eee4",
            "--tw-prose-th-borders": theme("colors.outline") as string,
            "--tw-prose-td-borders": theme("colors.outline") as string,
            color: theme("colors.ink-soft") as string,
            fontFamily: (theme("fontFamily.reading") as string[]).join(", "),
            fontSize: "1.0625rem",
            lineHeight: "1.92",
            letterSpacing: "0",
            "> *": {
              marginTop: "0",
              marginBottom: "0",
            },
            "> * + *": {
              marginTop: "1.45em",
            },
            p: {
              lineHeight: "1.94",
              fontWeight: "400",
            },
            '[class~="lead"]': {
              color: theme("colors.ink-soft") as string,
              fontSize: "1.125rem",
              lineHeight: "1.9",
            },
            "h1, h2, h3": {
              fontFamily: (theme("fontFamily.serif") as string[]).join(", "),
              letterSpacing: "-0.03em",
              color: theme("colors.ink") as string,
              fontWeight: "500",
            },
            h2: {
              marginTop: "4rem",
              marginBottom: "1rem",
              fontSize: "1.875rem",
              lineHeight: "1.2",
              fontWeight: "500",
            },
            h3: {
              marginTop: "3rem",
              marginBottom: "0.85rem",
              fontSize: "1.5rem",
              lineHeight: "1.28",
              fontWeight: "500",
            },
            h4: {
              marginTop: "2.4rem",
              marginBottom: "0.75rem",
              color: theme("colors.ink") as string,
              fontWeight: "500",
            },
            a: {
              color: theme("colors.ink") as string,
              textDecorationColor: theme("colors.outline-strong") as string,
              textUnderlineOffset: "0.24em",
              textDecorationThickness: "0.08em",
              transition:
                "color 220ms cubic-bezier(0.22, 1, 0.36, 1), text-decoration-color 220ms cubic-bezier(0.22, 1, 0.36, 1)",
            },
            "a:hover": {
              color: theme("colors.sunrise") as string,
              textDecorationColor: theme("colors.sunrise") as string,
            },
            strong: {
              fontWeight: "500",
            },
            blockquote: {
              borderLeftWidth: "2px",
              borderLeftColor: theme("colors.sunrise") as string,
              backgroundColor: "#f6f0e7",
              borderRadius: "1rem",
              padding: "1.15rem 1.25rem",
              color: theme("colors.ink-soft") as string,
              fontFamily: (theme("fontFamily.serif") as string[]).join(", "),
              fontWeight: "400",
              quotes: "none",
            },
            "blockquote p:first-of-type::before, blockquote p:last-of-type::after":
              {
                content: "none",
              },
            code: {
              fontFamily: (theme("fontFamily.mono") as string[]).join(", "),
              fontWeight: "500",
            },
            ":not(pre) > code": {
              backgroundColor: "#f2ebe0",
              border: "1px solid #e3d8c8",
              borderRadius: "0.5rem",
              padding: "0.18rem 0.45rem",
              fontSize: "0.9em",
            },
            "pre code": {
              backgroundColor: "transparent",
              borderWidth: "0",
              padding: "0",
              color: "#2b2722",
            },
            pre: {
              borderRadius: "1rem",
              border: "1px solid #e3d8c8",
              padding: "1.25rem 1.4rem",
              boxShadow: "none",
            },
            hr: {
              marginTop: "3.25rem",
              marginBottom: "3.25rem",
            },
            figure: {
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            figcaption: {
              marginTop: "0.8rem",
              textAlign: "center",
              fontSize: "0.9rem",
            },
            img: {
              borderRadius: "1.5rem",
            },
            thead: {
              backgroundColor: "#f3ece1",
            },
            "thead th": {
              color: theme("colors.ink") as string,
              fontWeight: "600",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
