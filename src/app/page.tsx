import CryptoPriceTicker from "@/features/crypto-price-ticker";
import Navbar from "@/features/navbar";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white text-black">
      <Navbar />
      <main className="min-h-0 flex-1">
        <div className="flex h-full flex-col bg-background">
           <CryptoPriceTicker />
        </div>
      </main>
    </div>
  );
}
