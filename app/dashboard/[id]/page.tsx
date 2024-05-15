import PopupForm from "./_components/popup-form";
import { Metadata } from "next";
import Header from "./_components/header";

interface MetadataProps {
  params: { id: string };
}

export async function generateMetadata({ params }: MetadataProps) {
  const { id } = params;

  return { title: `Meeterpop | ${id}` };
}

const DashboardCategoryPage = () => {
  return (
    <main className="bg-orange-50">
      <div className="p-child py-12 space-y-6">
        <Header />
        <div className="flex gap-4">
          <PopupForm />
          <div className="bg-blue-500 flex-1 h-2"></div>
        </div>
      </div>
    </main>
  );
};

export default DashboardCategoryPage;
