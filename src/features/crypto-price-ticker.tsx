import Image from "next/image";
import btc from "@assets/coins/btc.svg";
import eth from "@assets/coins/eth.svg";
import sol from "@assets/coins/sol.svg";
import bnb from "@assets/coins/bnb.svg";
import doge from "@assets/coins/doge.svg";
import xrp from "@assets/coins/xrp.svg";
import HighLowPerformers from "./high-low-performers";

const CryptoPriceTicker = () => {
  const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 95000.00, icon: btc },
    { symbol: 'ETH', name: 'Ethereum', price: 3500.00, icon: eth },
    { symbol: 'SOL', name: 'Solana', price: 180.00, icon: sol },
    { symbol: 'BNB', name: 'BNB', price: 600.00, icon: bnb },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.3500, icon: doge },
    { symbol: 'XRP', name: 'XRP', price: 0.50, icon: xrp },
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    });
  };

  return (
    <div className="hidden border-b-2 border-border bg-surface-elevated px-4 py-1 md:block">
      <div className="terminal-text flex items-center justify-between text-xs">
        <div className="flex items-center">
          <div className="flex items-center">
            {cryptoData.map((crypto, index) => (
              <div key={crypto.symbol} className="flex items-center">
                <div className="flex flex-col items-center px-6 py-0.5 text-xs">
                  <div className="flex items-center space-x-1 mb-0.5">
                    <Image
                      src={crypto.icon}
                      alt={crypto.symbol}
                      className="size-3"
                    />
                    <span className="text-gray-700 font-medium">
                      {crypto.symbol}
                    </span>
                  </div>
                  <div className="font-mono text-gray-800 text-sm font-semibold flex items-baseline">
                    <span>$</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {formatPrice(crypto.price)}
                    </span>
                  </div>
                </div>
                {index < cryptoData.length - 1 && (
                  <div className="w-px h-8 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <HighLowPerformers />
      </div>
    </div>
  );
};

export default CryptoPriceTicker;