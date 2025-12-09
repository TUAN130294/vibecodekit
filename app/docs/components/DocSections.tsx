import { Markdown } from './Markdown';

interface DocSectionsProps {
    content: string;
}

export function DocSections({ content }: DocSectionsProps) {
    // Split content by H2 headers, keeping the delimiter
    // Using a regex that matches lines starting with ## 
    const sections = content.split(/(?=^##\s)/m);

    return (
        <div className="space-y-8">
            {sections.map((section, index) => {
                // Skip empty sections if any
                if (!section.trim()) return null;

                return (
                    <section
                        key={index}
                        className="rounded-2xl border border-slate-200/60 bg-white/95 backdrop-blur-sm p-8 shadow-lg shadow-slate-200/50 transition-all hover:shadow-xl hover:shadow-slate-200/60"
                    >
                        <Markdown content={section} />
                    </section>
                );
            })}
        </div>
    );
}
