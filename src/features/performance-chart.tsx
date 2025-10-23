"use client";
import { useState, useLayoutEffect, useRef } from "react";
import { Group } from "@visx/group";
import { GridRows, GridColumns } from "@visx/grid";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AxisBottom, AxisLeft, TickFormatter } from "@visx/axis";
import { line, LinePath } from "@visx/shape";
import gpt from "@assets/logos/GPT_logo.png";
import gptWhite from "@assets/logos_white/GPT_logo.png";
import claude from "@assets/logos/Claude_logo.png";
import claudeWhite from "@assets/logos_white/Claude_logo.png";
import gemini from "@assets/logos/Gemini_logo.webp";
import geminiWhite from "@assets/logos_white/Gemini_logo.webp";
import grok from "@assets/logos/Grok_logo.webp";
import grokWhite from "@assets/logos_white/Grok_logo.webp";
import deepseek from "@assets/logos/deepseek_logo.png";
import deepseekWhite from "@assets/logos_white/deepseek_logo.png";
import qwen from "@assets/logos/qwen_logo.png";
import qwenWhite from "@assets/logos_white/qwen_logo.png";
import btc from "@assets/logos_white/btc.png";
import Image from "next/image";
import { NumberValue } from "d3-scale";

const AccountValueChart = () => {
  const [timeRange, setTimeRange] = useState("ALL");
  const [currency, setCurrency] = useState("$");
  const [dimensions, setDimensions] = useState({ width: 1455.2, height: 793 });

  const containerRef = useRef<HTMLInputElement>(null);
  const linesGroupRef = useRef<SVGGElement | null>(null);

  // Use useLayoutEffect to compute width dynamically based on container size
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const updateDimensions = () => {
      const container = containerRef?.current;
      if (container) {
        const { width: containerWidth } = container?.getBoundingClientRect();
        // Maintain aspect ratio or set specific height logic
        const newWidth = containerWidth;
        const newHeight = Math.min(793, containerWidth * 0.545); // Maintain approximate aspect ratio

        // Only update if the difference is significant (more than 5px) to prevent infinite loops
        setDimensions((prev) => {
          const widthDiff = Math.abs(prev.width - newWidth);
          const heightDiff = Math.abs(prev.height - newHeight);

          if (widthDiff > 5 || heightDiff > 5) {
            return {
              width: newWidth,
              height: newHeight,
            };
          }
          return prev;
        });
      }
    };

    // Debounced update function to prevent rapid re-renders
    const debouncedUpdate = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(updateDimensions, 100);
    };

    // Initial measurement
    updateDimensions();

    // Set up resize observer for responsive updates
    const resizeObserver = new ResizeObserver(debouncedUpdate);
    resizeObserver.observe(containerRef.current);

    // Fallback: also listen to window resize
    window.addEventListener("resize", debouncedUpdate);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      resizeObserver.disconnect();
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, []);

  const models = [
    {
      key: "gpt5",
      name: "GPT 5",
      color: "#10a37f",
      icon: gpt,
      whiteIcon: gptWhite,
      value: 3348.06,
    },
    {
      key: "claude",
      name: "CLAUDE SONNET 4.5",
      color: "#ff6b35",
      icon: claude,
      whiteIcon: claudeWhite,
      value: 8240.21,
    },
    {
      key: "gemini",
      name: "GEMINI 2.5 PRO",
      color: "#4285F4",
      icon: gemini,
      whiteIcon: geminiWhite,
      value: 4603.95,
    },
    {
      key: "grok",
      name: "GROK 4",
      color: "#000000",
      icon: grok,
      whiteIcon: grokWhite,
      value: 9275.0,
    },
    {
      key: "deepseek",
      name: "DEEPSEEK CHAT V3.1",
      color: "#4d6bfe",
      icon: deepseek,
      whiteIcon: deepseekWhite,
      value: 10367.67,
    },
    {
      key: "qwen",
      name: "QWEN3 MAX",
      color: "#8b5cf6",
      icon: qwen,
      whiteIcon: qwenWhite,
      value: 10526.18,
    },
    {
      key: "btc",
      name: "BTC BUY&HOLD",
      color: "rgba(128, 128, 128, 0.6)",
      stroke: "#5a5a5a",
      icon: btc,
      whiteIcon: btc,
      value: 10103.56,
      dashed: true,
    },
  ];

  // Generate sample time series data
  const generateData = () => {
    const startDate = new Date(2025, 9, 18, 5, 0);
    const fixedValues = Array.from({ length: 40 }, (_, i) => {
      return {
        gpt5: 3000 + 500 * Math.random() + i * 10,
        claude: 7000 + 1000 * Math.random() + i * 15,
        gemini: 4000 + 800 * Math.random() + i * 12,
        grok: 8000 + 1200 * Math.random() + i * 20,
        deepseek: 9000 + 1500 * Math.random() + i * 25,
        qwen: 9500 + 1600 * Math.random() + i * 30,
        btc: 8500 + 2000 * Math.random() + i * 18,
      };
    });
    return fixedValues.map((values, i) => ({
      date: new Date(startDate.getTime() + i * 3600000),
      ...values,
    }));
  };

  const data = generateData();

  const { width, height } = dimensions;
  const margin = { top: 70, right: 200, bottom: 35, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scales
  const xScale = scaleTime({
    domain: [
      Math.min(...data.map((d) => d.date.getTime())),
      Math.max(...data.map((d) => d.date.getTime())),
    ],
    range: [0, innerWidth],
  });

  const allValues = data.flatMap((d) =>
    models.map((m) => d[m.key as keyof typeof d] as number)
  );
  const yScale = scaleLinear({
    domain: [Math.min(...allValues) * 0.85, Math.max(...allValues) * 1.05],
    range: [innerHeight, 0],
  });

  const formatDate: TickFormatter<Date | NumberValue> = (value) =>
    new Date(value.valueOf()).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  //eslint-disable-next-line
  const formatCurrency: any = (value: number) => {
    return `$${value.toLocaleString("en-US")}`;
  };

  return (
    <div className="flex flex-col h-[480px] md:min-h-0 md:h-auto md:flex-1 border-b md:border-b-0 md:border-r border-border shrink-0">
      <style jsx>{`
        @keyframes pulse-out {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .pulse-circle {
          animation: pulse-out 1s ease-out 0s 1 normal forwards;
        }
      `}</style>
      <div className="relative flex-1 overflow-hidden">
        <div className="relative flex h-full w-full flex-col">
          <div className="flex min-h-0 w-full flex-1 flex-col">
            <div className="relative flex min-h-0 flex-1 justify-center overflow-hidden transition-opacity duration-200 opacity-100">
              <div className="flex h-full w-full flex-col">
                {/* Chart Container */}
                <div
                  ref={containerRef}
                  className="relative flex-1 bg-gray-50 px-4"
                >
                  <svg
                    width={width}
                    height={height}
                    style={{ display: "block", maxWidth: "100%" }}
                  >
                    <defs>
                      <pattern
                        id="scanlines"
                        x="0"
                        y="0"
                        width="100%"
                        height="2"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          width="100%"
                          height="1"
                          fill="rgba(0, 255, 0, 0.02)"
                        />
                        <rect
                          width="100%"
                          height="1"
                          y="1"
                          fill="transparent"
                        />
                      </pattern>
                      <pattern
                        id="terminalBorder"
                        x="0"
                        y="0"
                        width="8"
                        height="8"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect width="8" height="8" fill="transparent" />
                        <rect
                          width="1"
                          height="8"
                          fill="rgba(0, 255, 0, 0.1)"
                        />
                        <rect
                          width="8"
                          height="1"
                          fill="rgba(0, 255, 0, 0.1)"
                        />
                      </pattern>
                      <clipPath id="circle-clip">
                        <circle cx="0" cy="0" r="22.5" />
                      </clipPath>

                      {/* Define circle-with-icon patterns for each model */}
                      {models.map((model) => {
                        const radius = model.dashed ? 12.6 : 15.75;
                        return (
                          <g
                            key={`icon-def-${model.key}`}
                            id={`circle-with-icon-${model.key}`}
                            data-tooltip-id={`circle-with-icon-${model.key}`}
                            data-tooltip-content="Hello world!"
                          >
                            <circle
                              cx="0"
                              cy="0"
                              r={radius}
                              fill={model.color}
                              stroke={model.stroke || "none"}
                              strokeWidth={model.dashed ? 1.5 : 0}
                              strokeDasharray={model.dashed ? "3,2" : ""}
                            />
                            <image
                              href={model.whiteIcon.src}
                              x={-radius}
                              y={-radius}
                              width={radius * 2}
                              height={radius * 2}
                              clipPath="url(#circle-clip)"
                            />
                          </g>
                        );
                      })}
                    </defs>

                    <Group
                      ref={linesGroupRef}
                      left={margin.left}
                      top={margin.top}
                    >
                      {/* Background pattern */}
                      <rect
                        x={0}
                        y={0}
                        width={innerWidth}
                        height={innerHeight}
                        fill="url(#scanlines)"
                        opacity={0.5}
                      />

                      {/* Grid */}
                      <GridRows
                        scale={yScale}
                        width={innerWidth}
                        stroke="rgba(0, 0, 0, 0.1)"
                        strokeWidth={1}
                        numTicks={8}
                      />
                      <GridColumns
                        scale={xScale}
                        height={innerHeight}
                        stroke="rgba(0, 0, 0, 0.1)"
                        strokeWidth={1}
                        numTicks={8}
                      />

                      {/* Line paths for each model */}
                      {models.map((model) => {
                        const lineData = data.map((d) => ({
                          date: d.date,
                          value: d[model.key as keyof typeof d] as number,
                        }));

                        return (
                          <LinePath
                            key={model.key}
                            data={lineData}
                            x={(d) => xScale(d.date)}
                            y={(d) => yScale(d.value)}
                            stroke={model.color}
                            strokeWidth={model.dashed ? 1.5 : 2.5}
                            strokeDasharray={model.dashed ? "5,5" : ""}
                            opacity={1}
                            className={`line-${model.key}`}
                            onMouseEnter={() => {
                              const lines =
                                linesGroupRef.current?.querySelectorAll("path");
                              lines?.forEach((line) => {
                                if (
                                  !line.classList.contains(`line-${model.key}`)
                                ) {
                                  line.style.opacity = "0.1";
                                } else {
                                  line.style.opacity = "1";
                                  line.style.strokeWidth = model.dashed
                                    ? "1.5px"
                                    : "3.5px";
                                  line.style.filter = "none";
                                }
                              });
                            }}
                            onMouseLeave={() => {
                              const lines =
                                linesGroupRef.current?.querySelectorAll("path");
                              lines?.forEach((line) => {
                                line.style.opacity = "1";
                                line.style.strokeWidth = model.dashed
                                  ? "1.5px"
                                  : "2.5px";
                                line.style.filter = "none";
                              });
                            }}
                          />
                        );
                      })}

                      {/* End points with icons and labels */}
                      {models.map((model) => {
                        const lastPoint = data[data.length - 1];
                        const cx = xScale(lastPoint.date);
                        const cy = yScale(
                          lastPoint[
                            model.key as keyof typeof lastPoint
                          ] as number
                        );

                        return (
                          <g key={`endpoint-${model.key}`}>
                            {/* Pulse circle */}
                            <g transform={`translate(${cx}, ${cy})`}>
                              <circle
                                cx={0}
                                cy={0}
                                r={23.75}
                                fill={model.color}
                                opacity={0.4}
                                className="pulse-circle"
                                style={{
                                  animation:
                                    "pulse-out 1s ease-out 0s 1 normal forwards",
                                }}
                              />
                            </g>

                            {/* Icon circle using use tag */}
                            <g
                              transform={`translate(${cx}, ${cy})`}
                              style={{ transformOrigin: "center" }}
                            >
                              {/* infinite pulse ring */}
                              <circle
                                cx={0}
                                cy={0}
                                r={23.75}
                                fill={model.color}
                                opacity={0.25}
                                style={{
                                  animation: "pulse-out 1.5s ease-out infinite",
                                }}
                              />
                              <g
                                transform={`scale(1)`}
                                style={{
                                  filter: "none",
                                  opacity: 1,
                                  cursor: "pointer",
                                  transition: "transform 0.2s ease-in-out 0.1s",
                                }}
                              >
                                <use
                                  href={`#circle-with-icon-${model.key}`}
                                  x="0"
                                  y="0"
                                />
                              </g>
                            </g>

                            {/* Value label */}
                            <g transform={`translate(${cx}, ${cy})`}>
                              <rect
                                x={32.5}
                                y={-9}
                                width={65}
                                height={18}
                                fill={model.color}
                              />
                              <text
                                x={65}
                                y={4}
                                textAnchor="middle"
                                fill="white"
                                fontSize={10}
                                fontWeight="600"
                              >
                                {formatCurrency(model.value)}
                              </text>
                            </g>
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
                          fill: "rgba(0, 0, 0, 0.8)",
                          fontSize: 12,
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontWeight: 600,
                          textAnchor: "middle",
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
                          fill: "rgba(0, 0, 0, 0.8)",
                          fontSize: 12,
                          fontFamily: "'Courier New', Courier, monospace",
                          fontWeight: 600,
                          textAnchor: "end",
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
                        onClick={() => setCurrency("$")}
                        className={`px-1 py-0.5 whitespace-nowrap border-r border-black ${
                          currency === "$" ? "bg-gray-200" : ""
                        }`}
                      >
                        $
                      </button>
                      <button
                        onClick={() => setCurrency("%")}
                        className={`px-1 py-0.5 whitespace-nowrap ${
                          currency === "%" ? "bg-gray-200" : ""
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
                        onClick={() => setTimeRange("ALL")}
                        className={`px-2 py-0.5 whitespace-nowrap border-r border-black ${
                          timeRange === "ALL" ? "bg-gray-200" : ""
                        }`}
                      >
                        ALL
                      </button>
                      <button
                        onClick={() => setTimeRange("72H")}
                        className={`px-2 py-0.5 whitespace-nowrap ${
                          timeRange === "72H" ? "bg-gray-200" : ""
                        }`}
                      >
                        72H
                      </button>
                    </div>
                  </div>
                </div>

                {/* Legend Cards at Bottom */}
                <div className="shrink-0 bg-white hidden md:block">
                  <div className="relative bg-surface p-1 md:p-3 hidden md:block md:border-t-2 md:border-border">
                    <div className="flex w-full flex-col items-start gap-3 sm:flex-row">
                      <div className="flex-1 w-full">
                        <div className="flex flex-wrap gap-1 md:gap-2 w-full justify-center">
                          {models.map((model) => (
                            <div
                              key={model.key}
                              className="terminal-text relative cursor-pointer border border-border px-1.5 py-0.5 md:p-2 transition-all duration-200 bg-surface hover:bg-surface-hover"
                              style={{
                                borderColor: "var(--border)",
                                flex: "0 0 calc(14.2857% - 0.428571rem)",
                              }}
                            >
                              <div className="flex flex-col items-center gap-0.5 md:gap-1 w-full">
                                <div className="flex items-center justify-center gap-1 md:gap-2 w-full">
                                  <div className="relative shrink-0">
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
