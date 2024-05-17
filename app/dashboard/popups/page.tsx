import Header from "./_components/header";
import PopupForm from "./_components/popup-form";
import TimingForm from "./_components/timing-form";

const DashboardCategoryPage = () => {
  return (
    <main className="bg-orange-50">
      <div className="p-child py-12 space-y-6">
        <Header />
        <div className="flex gap-4 flex-col lg:flex-row">
          <PopupForm />
          <TimingForm />
        </div>
      </div>
    </main>
  );
};

export default DashboardCategoryPage;
