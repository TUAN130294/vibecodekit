import { Metadata } from 'next';

// Server Component by default in Next.js App Router

interface {{PageName}}Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: {{PageName}}Props): Promise<Metadata> {
  return {
    title: '{{PageTitle}}',
    description: '{{PageDescription}}',
  };
}

export default async function {{PageName}}({ params, searchParams }: {{PageName}}Props) {
  // Fetch data directly in Server Component
  // const data = await fetchData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{{PageTitle}}</h1>

      <div>
        {/* Your page content here */}
      </div>
    </div>
  );
}
