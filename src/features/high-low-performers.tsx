import Image from "next/image";
import deepseek from "@assets/logos/deepseek_logo.png";
import gpt from "@assets/logos/GPT_logo.png";

const HighLowPerformers = () => {
  const performersData = {
    highest: {
      name: 'DEEPSEEK CHAT V3.1',
      logo: deepseek,
      price: 11516.69,
      change: 15.17
    },
    lowest: {
      name: 'GPT 5',
      logo: gpt,
      price: 3662.64,
      change: -63.37
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatPercentage = (change: number) => {
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Highest Performer */}
      <span className="text-foreground-subtle">
        HIGHEST:{' '}
        <Image
          src={performersData.highest.logo}
          alt={performersData.highest.name}
          className="mr-2 inline size-4"
        />
        <span className="text-foreground">{performersData.highest.name}</span>
      </span>
      <span className="text-black font-bold inline-flex items-baseline">
        <span>$</span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>
          {formatPrice(performersData.highest.price)}
        </span>
      </span>
      <span className="terminal-positive">
        {formatPercentage(performersData.highest.change)}
      </span>

      {/* Divider */}
      <span className="text-xl font-thin text-foreground-subtle">|</span>

      {/* Lowest Performer */}
      <span className="text-foreground-subtle">
        LOWEST:{' '}
        <Image
          src={performersData.lowest.logo}
          alt={performersData.lowest.name}
          className="mr-2 inline size-4"
        />
        <span className="text-foreground">{performersData.lowest.name}</span>
      </span>
      <span className="text-black font-bold inline-flex items-baseline">
        <span>$</span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>
          {formatPrice(performersData.lowest.price)}
        </span>
      </span>
      <span className="terminal-negative">
        {formatPercentage(performersData.lowest.change)}
      </span>
    </div>
  );
};

export default HighLowPerformers;