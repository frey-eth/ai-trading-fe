import CryptoPriceTicker from "@/features/crypto-price-ticker";
import Navbar from "@/features/navbar";
import AccountValueChart from "@/features/performance-chart";
import Sidebar from "@/features/sidebar";


export default function Home() {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white text-black">
      <Navbar />
      <main className="min-h-0 flex-1">
        <div className="flex h-full flex-col bg-background">
          <CryptoPriceTicker />
          <div className="flex min-h-0 flex-1 flex-col md:flex-row overflow-y-auto md:overflow-hidden">
            <AccountValueChart />
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
