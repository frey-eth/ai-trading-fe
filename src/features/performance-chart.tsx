"use client";
import { useState } from 'react';
import { Group } from '@visx/group';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import gpt from '@assets/logos/GPT_logo.png';
import claude from '@assets/logos/Claude_logo.png';
import gemini from '@assets/logos/Gemini_logo.webp';
import grok from '@assets/logos/Grok_logo.webp';
import deepseek from '@assets/logos/deepseek_logo.png';
import qwen from '@assets/logos/qwen_logo.png';
import btc from '@assets/logos/NOF1 SQUARE BLACK.png';
import Image from 'next/image';

const AccountValueChart = () => {
  const [timeRange, setTimeRange] = useState('ALL');
  const [currency, setCurrency] = useState('$');

  // Model configurations from the HTML
  const models = [
    { 
      key: 'gpt5', 
      name: 'GPT 5', 
      color: '#10a37f', 
      icon: gpt,
      value: 3348.06 
    },
    { 
      key: 'claude', 
      name: 'CLAUDE SONNET 4.5', 
      color: '#ff6b35', 
      icon: claude,
      value: 8240.21 
    },
    { 
      key: 'gemini', 
      name: 'GEMINI 2.5 PRO', 
      color: '#4285F4', 
      icon: gemini,
      value: 4603.95 
    },
    { 
      key: 'grok', 
      name: 'GROK 4', 
      color: '#000000', 
      icon: grok,
      value: 9275.00 
    },
    { 
      key: 'deepseek', 
      name: 'DEEPSEEK CHAT V3.1', 
      color: '#4d6bfe', 
      icon: deepseek,
      value: 10367.67 
    },
    { 
      key: 'qwen', 
      name: 'QWEN3 MAX', 
      color: '#8b5cf6', 
      icon: qwen,
      value: 10526.18 
    },
    { 
      key: 'btc', 
      name: 'BTC BUY&HOLD', 
      color: 'rgba(128, 128, 128, 0.6)', 
      stroke: '#5a5a5a',
      icon: btc,
      value: 10103.56,
      dashed: true
    }
  ];

  // Generate sample time series data
  const generateData = () => {
    const startDate = new Date(2024, 9, 18, 5, 0); // Oct 18 05:00
    const dataPoints = [];
    
    for (let i = 0; i < 120; i++) {
      const date = new Date(startDate.getTime() + i * 3600000); // hourly
      const point = { date };
      
      models.forEach(model => {
        const baseValue = 10000;
        const volatility = model.key === 'gpt5' || model.key === 'gemini' ? 0.4 : 0.15;
        const trend = model.key === 'gpt5' || model.key === 'gemini' ? -0.06 : 0.02;
        const noise = (Math.random() - 0.5) * volatility * baseValue;
        const trendValue = trend * i * 15;
        
        point[model.key] = Math.max(2000, baseValue + trendValue + noise + (Math.sin(i / 12) * 1200));
      });
      
      dataPoints.push(point);
    }
    
    return dataPoints;
  };

  const data = generateData();

  const width = 1455.2;
  const height = 793;
  const margin = { top: 70, right: 200, bottom: 35, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scales
  const xScale = scaleTime({
    domain: [Math.min(...data.map(d => d.date)), Math.max(...data.map(d => d.date))],
    range: [0, innerWidth],
  });

  const allValues = data.flatMap(d => models.map(m => d[m.key]));
  const yScale = scaleLinear({
    domain: [Math.min(...allValues) * 0.85, Math.max(...allValues) * 1.05],
    range: [innerHeight, 0],
  });

  const formatDate = (date) => {
    const month = date.toLocaleString('en', { month: 'short' });
    const day = date.getDate();
    const time = date.toLocaleString('en', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${month} ${day} ${time}`;
  };

  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className='flex flex-col h-[480px] md:min-h-0 md:h-auto md:flex-1 border-b md:border-b-0 md:border-r border-border flex-shrink-0'>
    <div className="relative flex-1 overflow-hidden">
      <div className="relative flex h-full w-full flex-col">
        <div className="flex min-h-0 w-full flex-1 flex-col">
          <div className="relative flex min-h-0 flex-1 justify-center overflow-hidden transition-opacity duration-200 opacity-100">
            <div className="flex h-full w-full flex-col">
              
              {/* Chart Container */}
              <div className="relative flex-1 bg-gray-50 px-4">
                <svg width={width} height={height} style={{ display: 'block' }}>
                  <defs>
                    <pattern id="scanlines" x="0" y="0" width="100%" height="2" patternUnits="userSpaceOnUse">
                      <rect width="100%" height="1" fill="rgba(0, 255, 0, 0.02)" />
                      <rect width="100%" height="1" y="1" fill="transparent" />
                    </pattern>
                    <pattern id="terminalBorder" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                      <rect width="8" height="8" fill="transparent" />
                      <rect width="1" height="8" fill="rgba(0, 255, 0, 0.1)" />
                      <rect width="8" height="1" fill="rgba(0, 255, 0, 0.1)" />
                    </pattern>
                    <clipPath id="circle-clip">
                      <circle cx="0" cy="0" r="22.5" />
                    </clipPath>
                  </defs>

                  <Group left={margin.left} top={margin.top}>
                    {/* Dashed Grid */}
                    <GridRows
                      scale={yScale}
                      width={innerWidth}
                      stroke="rgba(0, 0, 0, 0.1)"
                      strokeWidth={0.5}
                      strokeDasharray="1,3"
                    />
                    <GridColumns
                      scale={xScale}
                      height={innerHeight}
                      stroke="rgba(0, 0, 0, 0.1)"
                      strokeWidth={0.5}
                      strokeDasharray="1,3"
                    />

                    {/* Solid Grid */}
                    <GridRows
                      scale={yScale}
                      width={innerWidth}
                      stroke="rgba(0, 0, 0, 0.15)"
                      strokeWidth={1}
                      numTicks={3}
                    />
                    <GridColumns
                      scale={xScale}
                      height={innerHeight}
                      stroke="rgba(0, 0, 0, 0.15)"
                      strokeWidth={1}
                      numTicks={3}
                    />

                    {/* Line paths for each model */}
                    {models.map((model) => (
                      <Group key={model.key}>
                        <LinePath
                          data={data}
                          x={(d) => xScale(d.date)}
                          y={(d) => yScale(d[model.key])}
                          stroke={model.stroke || model.color}
                          strokeWidth={2}
                          curve={curveMonotoneX}
                          strokeDasharray={model.dashed ? '5,5' : undefined}
                        />
                      </Group>
                    ))}

                    {/* End point badges */}
                    {models.map((model) => {
                      const lastDataPoint = data[data.length - 1];
                      const cx = xScale(lastDataPoint.date);
                      const cy = yScale(lastDataPoint[model.key]);
                      const radius = model.dashed ? 12.6 : 15.75;
                      
                      return (
                        <g key={`badge-${model.key}`}>
                          {/* Pulse circle */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={23.75}
                            fill={model.color}
                            opacity={0.4}
                          />
                          
                          {/* Icon circle */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={radius}
                            fill={model.color}
                            stroke={model.stroke || 'none'}
                            strokeWidth={model.dashed ? 1.5 : 0}
                            strokeDasharray={model.dashed ? '2,2' : undefined}
                          />
                          <image
                            href={model.icon.src}
                            x={cx - 12.75}
                            y={cy - 12.75}
                            width={25.5}
                            height={25.5}
                            z={10}
                            clipPath="url(#circle-clip)"
                          />
                          
                          {/* Value label */}
                          <rect
                            x={cx + 32.5}
                            y={cy - 9}
                            width={65}
                            height={18}
                            fill={`${model.color}${model.color.startsWith('rgba') ? '' : 'f0'}`}
                            rx={2}
                          />
                          <text
                            x={cx + 65}
                            y={cy + 4}
                            textAnchor="middle"
                            fill="white"
                            fontSize={10}
                            fontWeight="600"
                          >
                            {formatCurrency(model.value)}
                          </text>
                        </g>
                      );
                    })}

                    {/* Axes */}
                    <AxisBottom
                      top={innerHeight}
                      scale={xScale}
                      stroke="rgba(0, 0, 0, 0.4)"
                      tickStroke="rgba(0, 0, 0, 0.6)"
                      strokeWidth={1.5}
                      numTicks={8}
                      tickFormat={formatDate}
                      tickLabelProps={() => ({
                        fill: 'rgba(0, 0, 0, 0.8)',
                        fontSize: 12,
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontWeight: 600,
                        textAnchor: 'middle',
                      })}
                    />
                    <AxisLeft
                      scale={yScale}
                      stroke="rgba(0, 0, 0, 0.4)"
                      tickStroke="rgba(0, 0, 0, 0.6)"
                      strokeWidth={1.5}
                      tickFormat={formatCurrency}
                      numTicks={8}
                      tickLabelProps={() => ({
                        fill: 'rgba(0, 0, 0, 0.8)',
                        fontSize: 12,
                        fontFamily: "'Courier New', Courier, monospace",
                        fontWeight: 600,
                        textAnchor: 'end',
                        dx: -8,
                      })}
                    />
                  </Group>

                </svg>

                {/* Title - Center Top */}
                <div className="absolute left-1/2 top-1 md:top-2 z-10 -translate-x-1/2 transform">
                  <h2 className="terminal-text text-xs md:text-sm font-bold text-black">
                    TOTAL ACCOUNT VALUE
                  </h2>
                </div>

                {/* Currency Toggle - Top Left */}
                <div className="absolute left-1 top-1 md:left-2 md:top-2 z-10 hidden md:block">
                  <div className="flex border border-black bg-white text-[6px] md:text-sm w-fit">
                    <button 
                      onClick={() => setCurrency('$')}
                      className={`px-1 py-0.5 whitespace-nowrap border-r border-black ${
                        currency === '$' ? 'bg-gray-200' : ''
                      }`}
                    >
                      $
                    </button>
                    <button 
                      onClick={() => setCurrency('%')}
                      className={`px-1 py-0.5 whitespace-nowrap ${
                        currency === '%' ? 'bg-gray-200' : ''
                      }`}
                    >
                      %
                    </button>
                  </div>
                </div>

                {/* Time Range Toggle - Top Right */}
                <div className="absolute right-1 top-1 md:right-2 md:top-2 z-10 hidden md:block">
                  <div className="flex border border-black bg-white text-[6px] md:text-sm w-fit">
                    <button 
                      onClick={() => setTimeRange('ALL')}
                      className={`px-2 py-0.5 whitespace-nowrap border-r border-black ${
                        timeRange === 'ALL' ? 'bg-gray-200' : ''
                      }`}
                    >
                      ALL
                    </button>
                    <button 
                      onClick={() => setTimeRange('72H')}
                      className={`px-2 py-0.5 whitespace-nowrap ${
                        timeRange === '72H' ? 'bg-gray-200' : ''
                      }`}
                    >
                      72H
                    </button>
                  </div>
                </div>
              </div>

              {/* Legend Cards at Bottom */}
              <div className="flex-shrink-0 bg-white hidden md:block">
                <div className="relative bg-surface p-1 md:p-3 hidden md:block md:border-t-2 md:border-border">
                  <div className="flex w-full flex-col items-start gap-3 sm:flex-row">
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap gap-1 md:gap-2 w-full justify-center">
                        {models.map((model) => (
                          <div
                            key={model.key}
                            className="terminal-text relative cursor-pointer border border-border px-1.5 py-0.5 md:p-2 transition-all duration-200 bg-surface hover:bg-surface-hover"
                            style={{ 
                              borderColor: 'var(--border)', 
                              flex: '0 0 calc(14.2857% - 0.428571rem)' 
                            }}
                          >
                            <div className="flex flex-col items-center gap-0.5 md:gap-1 w-full">
                              <div className="flex items-center justify-center gap-1 md:gap-2 w-full">
                                <div className="relative flex-shrink-0">
                                  <Image 
                                    alt={model.name} 
                                    src={model.icon} 
                                    className="w-3 h-3 rounded object-cover" 
                                  />
                                </div>
                                <h3 className="text-xs font-medium text-foreground leading-tight text-center hidden md:block">
                                  {model.name}
                                </h3>
                              </div>
                              <div className="flex flex-col items-center gap-0 w-full">
                                <span className="text-[10px] md:text-sm font-bold text-foreground">
                                  {formatCurrency(model.value)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AccountValueChart;