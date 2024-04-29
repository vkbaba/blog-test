import { codeToHtml } from "shiki";
import type { BundledTheme } from "shiki"; // Import the types from shiki

type Props = {
    children: string;
    className?: string;
    theme?: BundledTheme;
};

export default async function Code({ children, className, theme = "slack-dark" }: Props) {

    let lang = className?.replace('lang-', '') || 'shell';
    if (lang === 'golang') {
        lang = 'go';
    } else if (lang === 'raw') {
        lang = 'plaintext';
    }

    const html = await codeToHtml(children, {
        lang,
        theme,
    });

    return (
          <div className="overflow-hidden rounded-md	">
            <div
              className=" [&>pre]:overflow-x-auto  [&>pre]:py-3 [&>pre]:pl-4 [&>pre]:pr-5 [&>pre]:leading-snug"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
        </div>
      );
}