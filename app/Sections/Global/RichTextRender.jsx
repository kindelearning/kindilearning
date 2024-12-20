import { RichText } from "@graphcms/rich-text-react-renderer";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const RichTextRender = ({ content }) => {
  return (
    <div className="rich-text-container font-fredoka">
      {/* // heading: ({ children, level }) => {
      //   const HeadingTag = `h${level}`;
      //   return <HeadingTag style={{ color: "red" }}>{children}</HeadingTag>;
      // }, */}
      <BlocksRenderer
        content={content}
        blocks={{
          // Heading 1
          heading: ({ children, level }) => {
            const HeadingTag = `h${level}`;
            return (
              <HeadingTag
                style={{
                  color: "#F05C5C",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  margin: "1rem 0",
                }}
              >
                {children}
              </HeadingTag>
            );
          },

          // Heading 2
          h2: ({ children }) => (
            <h2
              style={{
                color: "blue",
                fontSize: "1.75rem",
                fontWeight: "bold",
                margin: "1rem 0",
              }}
            >
              {children}
            </h2>
          ),

          // Heading 3
          h3: ({ children }) => (
            <h3
              style={{
                color: "green",
                fontSize: "1.5rem",
                fontWeight: "600",
                margin: "1rem 0",
              }}
            >
              {children}
            </h3>
          ),

          // Paragraph
          p: ({ children }) => (
            <p
              style={{
                fontSize: "1rem",
                color: "#333",
                margin: "1rem 0",
                lineHeight: "1.6",
              }}
            >
              {children}
            </p>
          ),

          // Link
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "blue",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              {children}
            </a>
          ),

          // Unordered List
          ul: ({ children }) => (
            <ul
              style={{
                paddingLeft: "1.5rem",
                margin: "1rem 0",
                listStyleType: "disc",
              }}
            >
              {children}
            </ul>
          ),

          // Ordered List
          ol: ({ children }) => (
            <ol
              style={{
                paddingLeft: "1.5rem",
                margin: "1rem 0",
                listStyleType: "decimal",
              }}
            >
              {children}
            </ol>
          ),

          // List Item
          li: ({ children }) => (
            <li
              style={{
                marginBottom: "0.5rem",
                fontSize: "1rem",
                color: "#333",
              }}
            >
              {children}
            </li>
          ),

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote
              style={{
                margin: "1rem 0",
                paddingLeft: "1.5rem",
                borderLeft: "4px solid gray",
                fontStyle: "italic",
                color: "#555",
              }}
            >
              {children}
            </blockquote>
          ),

          // Code Block
          code: ({ children }) => (
            <code
              style={{
                backgroundColor: "#f0f0f0",
                padding: "0.2rem 0.5rem",
                fontSize: "0.9rem",
                borderRadius: "4px",
                fontFamily: "monospace",
              }}
            >
              {children}
            </code>
          ),
        }}
      />
    </div>
  );
};

export default RichTextRender;
