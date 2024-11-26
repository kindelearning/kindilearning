import { RichText } from "@graphcms/rich-text-react-renderer";

const RichTextRender = ({ content }) => {
  return (
    <div className="rich-text-container font-fredoka">
      <RichText
        content={content}
        renderers={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold my-6 text-red">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold my-5 text-red">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-medium my-4 text-red">{children}</h3>
          ),

          // Paragraphs
          brand: ({ children }) => <p className="my-2 text-red">{children}</p>,
          p: ({ children }) => <p className="my-2 text-gray-700">{children}</p>,

          // Lists
          ul: ({ children }) => (
            <ul className="list-disc pl-6 my-4 text-gray-700">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 my-4 text-gray-700">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-2">{children}</li>,

          // Bold & Italic Text
          bold: ({ children }) => (
            <strong className="font-bold ">{children}</strong>
          ),
          italic: ({ children }) => <em className="italic">{children}</em>,

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red underline hover:text-hoverRed"
            >
              {children}
            </a>
          ),

          // Images
          img: ({ src, altText }) => (
            <img
              src={src}
              alt={altText || "Image"}
              className="my-4 rounded-lg shadow-md max-w-full h-auto"
            />
          ),
        }}
      />
    </div>
  );
};

export default RichTextRender;
