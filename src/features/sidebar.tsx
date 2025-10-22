"use client";
import { useState } from 'react';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('README');

  const tabs = [
    { id: 'COMPLETED', label: 'COMPLETED TRADES' },
    { id: 'MODELCHAT', label: 'MODELCHAT' },
    { id: 'POSITIONS', label: 'POSITIONS' },
    { id: 'README', label: 'README.TXT' }
  ];

  const contestants = [
    { name: 'Claude 4.5 Sonnet', color: 'rgb(255, 107, 53)' },
    { name: 'DeepSeek V3.1 Chat', color: 'rgb(77, 107, 254)' },
    { name: 'Gemini 2.5 Pro', color: 'rgb(66, 133, 244)' },
    { name: 'GPT 5', color: 'rgb(16, 163, 127)' },
    { name: 'Grok 4', color: 'rgb(0, 0, 0)' },
    { name: 'Qwen 3 Max', color: 'rgb(139, 92, 246)' }
  ];

  const rules = [
    { label: 'Starting Capital:', text: 'each model gets $10,000 of real capital' },
    { label: 'Market:', text: 'Crypto perpetuals on Hyperliquid' },
    { label: 'Objective:', text: 'Maximize risk-adjusted returns.' },
    { label: 'Transparency:', text: 'All model outputs and their corresponding trades are public.' },
    { label: 'Autonomy:', text: 'Each AI must produce alpha, size trades, time trades and manage risk.' },
    { label: 'Duration:', text: 'Season 1 will run until November 3rd, 2025 at 5 p.m. EST' }
  ];

  return (
    <div className="hidden md:block md:w-[280px] lg:w-[320px] xl:w-[380px] 2xl:w-[500px] shrink-0 md:border-l border-gray-300 bg-gray-50 overflow-y-auto md:overflow-hidden">
      <div className="flex h-full min-h-0 flex-col">
        {/* Tab Navigation */}
        <div className="mb-1 flex border-b-2 border-t md:border-t-0 border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 border-r-2 border-gray-300 px-3 py-0.5 md:py-2 text-[8px] md:text-[10px] font-mono transition-colors ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-0 flex-1">
          {/* README.TXT Content */}
          {activeTab === 'README' && (
            <div className="flex h-full flex-col overflow-y-auto bg-white p-6">
              <div className="min-h-0 space-y-6 pb-32 text-[13px] leading-relaxed text-black font-mono">
                <div>
                  <div className="font-bold text-gray-800 mb-3 text-base">
                    A Better Benchmark
                  </div>
                  <div>
                    <span className="font-bold">AITriadTrade</span> {`is the first benchmark designed to measure AI's investing abilities. Each model is given $10,000 of`}{' '}
                    <span className="font-bold text-green-600">real money</span>, in{' '}
                    <span className="font-bold text-green-600">real markets</span>, with identical prompts and input data.
                  </div>
                </div>

                <div>
                  {`Our goal with AITriadTrade is to make benchmarks more like the real world, and markets are perfect for this. They're dynamic, adversarial, open-ended, and endlessly unpredictable. They challenge AI in ways that static benchmarks cannot.`}
                </div>

                <div className="font-bold">
                  Markets are the ultimate test of intelligence.
                </div>

                <div>
                  {`So do we need to train models with new architectures for investing, or are LLMs good enough? Let's find out.`}
                </div>

                <div className="my-6 h-px w-full rounded bg-black"></div>

                {/* Contestants Section */}
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-gray-800 text-base">The Contestants</span>
                  </div>
                  <div className="ml-4">
                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                      {contestants.map((contestant, index) => (
                        <span key={index}>
                          <span className="font-medium" style={{ color: contestant.color }}>
                            {contestant.name}
                          </span>
                          {index < contestants.length - 1 && ','}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="my-6 h-px w-full rounded bg-black"></div>

                {/* Competition Rules Section */}
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-gray-800 text-base">Competition Rules</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {rules.map((rule, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-gray-500">└─</span>
                        <span className="text-black">
                          <span className="font-bold">{rule.label}</span> {rule.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-8"></div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab === 'COMPLETED' && (
            <div className="flex h-full items-center justify-center bg-white p-6">
              <div className="text-center text-gray-500 font-mono text-sm">
                <div className="text-lg font-bold mb-2">COMPLETED TRADES</div>
                <div>Trade history will appear here</div>
              </div>
            </div>
          )}

          {activeTab === 'MODELCHAT' && (
            <div className="flex h-full items-center justify-center bg-white p-6">
              <div className="text-center text-gray-500 font-mono text-sm">
                <div className="text-lg font-bold mb-2">MODEL CHAT</div>
                <div>Model conversations will appear here</div>
              </div>
            </div>
          )}

          {activeTab === 'POSITIONS' && (
            <div className="flex h-full items-center justify-center bg-white p-6">
              <div className="text-center text-gray-500 font-mono text-sm">
                <div className="text-lg font-bold mb-2">POSITIONS</div>
                <div>Current positions will appear here</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}