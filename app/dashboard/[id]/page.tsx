import Header from "./_components/header";
import PopupForm from "./_components/popup-form";
import TImingForm from "./_components/timing-form";

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
        <div className="flex gap-4 flex-col lg:flex-row">
          <PopupForm />
          <TImingForm />
        </div>
      </div>
    </main>
  );
};

export default DashboardCategoryPage;
