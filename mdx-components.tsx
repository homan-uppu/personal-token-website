import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { getIdFromHeader } from "@/util";
import { Inter, Source_Serif_4 } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const sourceSerif = Source_Serif_4({ subsets: ["latin"] });

export const mdxComponents: MDXComponents = {
  // Allows customizing built-in components, e.g. to add styling.
  img: (props: any) => (
    <Image
      sizes="100vw"
      width={0}
      height={0}
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
  a: ({ href, children }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.7812 9.14062V10.5469C10.7812 10.609 10.7566 10.6686 10.7126 10.7126C10.6686 10.7566 10.609 10.7812 10.5469 10.7812H4.45312C4.39096 10.7812 4.33135 10.7566 4.2874 10.7126C4.24344 10.6686 4.21875 10.609 4.21875 10.5469V4.45312C4.21875 4.39096 4.24344 4.33135 4.2874 4.2874C4.33135 4.24344 4.39096 4.21875 4.45312 4.21875H6.5625V2.8125H4.45312C4.018 2.8125 3.6007 2.98535 3.29303 3.29303C2.98535 3.6007 2.8125 4.018 2.8125 4.45312V10.5469C2.8125 11.4525 3.5475 12.1875 4.45312 12.1875H10.5469C10.982 12.1875 11.3993 12.0146 11.707 11.707C12.0146 11.3993 12.1875 10.982 12.1875 10.5469V8.4375H10.7812V9.14062ZM7.96875 2.8125H11.4844C11.6709 2.8125 11.8497 2.88658 11.9816 3.01844C12.1134 3.1503 12.1875 3.32914 12.1875 3.51562V7.03125H10.7812V5.2125L7.99687 7.99687L7.5 8.49375L6.50625 7.5L7.00312 7.00312L9.78656 4.21875H7.96875V2.8125Z"
            fill="black"
            fillOpacity="0.2"
          />
        </svg>
      </a>
    );
  },
  blockquote: (props) => {
    return <blockquote className={sourceSerif.className} {...props} />;
  },
  h1: (props) => {
    const label = props.children as string;
    return (
      <h1 id={getIdFromHeader(label)} className={inter.className} {...props} />
    );
  },
  h2: (props) => {
    const label = props.children as string;
    return (
      <h2 id={getIdFromHeader(label)} className={inter.className} {...props} />
    );
  },
  h3: (props) => {
    const label = props.children as string;
    return (
      <h3 id={getIdFromHeader(label)} className={inter.className} {...props} />
    );
  },
  h4: (props) => {
    const label = props.children as string;
    return (
      <h4 id={getIdFromHeader(label)} className={inter.className} {...props} />
    );
  },
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { mdxComponents, ...components };
}
