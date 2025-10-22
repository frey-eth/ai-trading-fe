"use client";
import { useState, useLayoutEffect, useRef } from 'react';
import { Group } from '@visx/group';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { LinePath } from '@visx/shape';
import gpt from '@assets/logos/GPT_logo.png';
import gptWhite from '@assets/logos_white/GPT_logo.png';
import claude from '@assets/logos/Claude_logo.png';
import claudeWhite from '@assets/logos_white/Claude_logo.png';
import gemini from '@assets/logos/Gemini_logo.webp';
import geminiWhite from '@assets/logos_white/Gemini_logo.webp';
import grok from '@assets/logos/Grok_logo.webp';
import grokWhite from '@assets/logos_white/Grok_logo.webp';
import deepseek from '@assets/logos/deepseek_logo.png';
import deepseekWhite from '@assets/logos_white/deepseek_logo.png';
import qwen from '@assets/logos/qwen_logo.png';
import qwenWhite from '@assets/logos_white/qwen_logo.png';
import btc from '@assets/logos_white/btc.png';
import Image from 'next/image';

const AccountValueChart = () => {
  const [timeRange, setTimeRange] = useState('ALL');
  const [currency, setCurrency] = useState('$');
  const [dimensions, setDimensions] = useState({ width: 1455.2, height: 793 });
  const containerRef = useRef(null);

  // Use useLayoutEffect to compute width dynamically based on container size
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    let timeoutId = null;

    const updateDimensions = () => {
      const container = containerRef.current;
      if (container) {
        const { width: containerWidth } = container.getBoundingClientRect();
        // Maintain aspect ratio or set specific height logic
        const newWidth = containerWidth;
        const newHeight = Math.min(793, containerWidth * 0.545); // Maintain approximate aspect ratio
        
        // Only update if the difference is significant (more than 5px) to prevent infinite loops
        setDimensions(prev => {
          const widthDiff = Math.abs(prev.width - newWidth);
          const heightDiff = Math.abs(prev.height - newHeight);
          
          if (widthDiff > 5 || heightDiff > 5) {
            return {
              width: newWidth,
              height: newHeight
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
    window.addEventListener('resize', debouncedUpdate);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', debouncedUpdate);
    };
  }, []);

  // Model configurations from the HTML
  const models = [
    { 
      key: 'gpt5', 
      name: 'GPT 5', 
      color: '#10a37f', 
      icon: gpt,
      whiteIcon: gptWhite,
      value: 3348.06 
    },
    { 
      key: 'claude', 
      name: 'CLAUDE SONNET 4.5', 
      color: '#ff6b35', 
      icon: claude,
      whiteIcon: claudeWhite,
      value: 8240.21 
    },
    { 
      key: 'gemini', 
      name: 'GEMINI 2.5 PRO', 
      color: '#4285F4', 
      icon: gemini,
      whiteIcon: geminiWhite,
      value: 4603.95 
    },
    { 
      key: 'grok', 
      name: 'GROK 4', 
      color: '#000000', 
      icon: grok,
        whiteIcon: grokWhite,
      value: 9275.00 
    },
    { 
      key: 'deepseek', 
      name: 'DEEPSEEK CHAT V3.1', 
      color: '#4d6bfe', 
      icon: deepseek,
        whiteIcon: deepseekWhite,
      value: 10367.67 
    },
    { 
      key: 'qwen', 
      name: 'QWEN3 MAX', 
      color: '#8b5cf6', 
      icon: qwen,
        whiteIcon: qwenWhite,
      value: 10526.18 
    },
    { 
      key: 'btc', 
      name: 'BTC BUY&HOLD', 
      color: 'rgba(128, 128, 128, 0.6)', 
      stroke: '#5a5a5a',
      icon: btc,
      whiteIcon: btc,
      value: 10103.56,
      dashed: true
    }
  ];

  // Generate sample time series data
  const generateData = () => {
    const startDate = new Date(2024, 9, 18, 5, 0);
    const fixedValues = [
      { gpt5: 10000, claude: 10000, gemini: 10000, grok: 10000, deepseek: 10000, qwen: 10000, btc: 10000 },
      { gpt5: 9812.45, claude: 10023.67, gemini: 9876.32, grok: 10034.21, deepseek: 10045.89, qwen: 10056.12, btc: 10012.34 },
      { gpt5: 9645.23, claude: 10089.45, gemini: 9654.78, grok: 10078.93, deepseek: 10112.45, qwen: 10134.67, btc: 10034.56 },
      { gpt5: 9523.67, claude: 10156.89, gemini: 9478.90, grok: 10134.56, deepseek: 10189.23, qwen: 10223.45, btc: 10056.78 },
      { gpt5: 9345.12, claude: 10234.56, gemini: 9234.56, grok: 10201.23, deepseek: 10267.89, qwen: 10323.89, btc: 10089.01 },
      { gpt5: 9178.90, claude: 10323.45, gemini: 9045.67, grok: 10278.90, deepseek: 10356.78, qwen: 10434.23, btc: 10112.34 },
      { gpt5: 8967.45, claude: 10423.67, gemini: 8823.45, grok: 10367.45, deepseek: 10456.23, qwen: 10556.78, btc: 10145.67 },
      { gpt5: 8778.90, claude: 10534.89, gemini: 8645.89, grok: 10467.89, deepseek: 10567.89, qwen: 10689.45, btc: 10178.90 },
      { gpt5: 8589.23, claude: 10656.23, gemini: 8434.23, grok: 10578.34, deepseek: 10689.56, qwen: 10834.67, btc: 10201.23 },
      { gpt5: 8367.89, claude: 10789.67, gemini: 8223.67, grok: 10701.23, deepseek: 10823.45, qwen: 10989.23, btc: 10234.56 },
      { gpt5: 8134.56, claude: 10934.45, gemini: 7989.45, grok: 10834.56, deepseek: 10967.89, qwen: 11156.89, btc: 10267.89 },
      { gpt5: 7923.45, claude: 11089.23, gemini: 7756.89, grok: 10978.90, deepseek: 11123.67, qwen: 11334.56, btc: 10301.23 },
      { gpt5: 7678.90, claude: 11256.78, gemini: 7512.34, grok: 11134.23, deepseek: 11289.45, qwen: 11523.45, btc: 10334.56 },
      { gpt5: 7445.67, claude: 11434.56, gemini: 7278.90, grok: 11301.56, deepseek: 11467.23, qwen: 11723.90, btc: 10367.89 },
      { gpt5: 7189.45, claude: 11623.89, gemini: 7023.45, grok: 11478.90, deepseek: 11656.89, qwen: 11934.67, btc: 10401.23 },
      { gpt5: 6934.23, claude: 11823.67, gemini: 6767.89, grok: 11667.45, deepseek: 11856.78, qwen: 12156.89, btc: 10434.56 },
      { gpt5: 6667.89, claude: 12034.56, gemini: 6501.23, grok: 11867.23, deepseek: 12067.45, qwen: 12389.45, btc: 10467.89 },
      { gpt5: 6389.45, claude: 12256.89, gemini: 6223.67, grok: 12078.90, deepseek: 12289.23, qwen: 12633.67, btc: 10501.23 },
      { gpt5: 6123.67, claude: 12489.45, gemini: 5945.89, grok: 12301.56, deepseek: 12523.89, qwen: 12889.23, btc: 10534.56 },
      { gpt5: 5834.23, claude: 12734.56, gemini: 5656.78, grok: 12534.23, deepseek: 12767.45, qwen: 13156.89, btc: 10567.89 },
      { gpt5: 5556.78, claude: 12989.67, gemini: 5378.90, grok: 12778.90, deepseek: 13023.67, qwen: 13434.56, btc: 10601.23 },
      { gpt5: 5267.45, claude: 13256.89, gemini: 5089.45, grok: 13034.56, deepseek: 13289.45, qwen: 13723.45, btc: 10634.56 },
      { gpt5: 4978.90, claude: 13534.56, gemini: 4800.23, grok: 13301.23, deepseek: 13567.23, qwen: 14023.90, btc: 10667.89 },
      { gpt5: 4678.45, claude: 13823.45, gemini: 4500.67, grok: 13578.90, deepseek: 13856.89, qwen: 14334.67, btc: 10701.23 },
      { gpt5: 4389.23, claude: 14123.67, gemini: 4212.34, grok: 13867.45, deepseek: 14156.78, qwen: 14656.89, btc: 10734.56 },
      { gpt5: 4089.67, claude: 14434.56, gemini: 3912.45, grok: 14167.23, deepseek: 14467.45, qwen: 14989.45, btc: 10767.89 },
      { gpt5: 3789.45, claude: 14756.89, gemini: 3623.67, grok: 14478.90, deepseek: 14789.23, qwen: 15333.67, btc: 10801.23 },
      { gpt5: 3478.90, claude: 15089.45, gemini: 3323.45, grok: 14801.56, deepseek: 15123.89, qwen: 15689.23, btc: 10834.56 },
      { gpt5: 3178.67, claude: 15434.56, gemini: 3034.23, grok: 15134.23, deepseek: 15467.45, qwen: 16056.89, btc: 10867.89 },
      { gpt5: 2867.45, claude: 15789.67, gemini: 2734.56, grok: 15478.90, deepseek: 15823.67, qwen: 16434.56, btc: 10901.23 },
      { gpt5: 2567.23, claude: 16156.89, gemini: 2445.89, grok: 15834.56, deepseek: 16189.45, qwen: 16823.45, btc: 10934.56 },
      { gpt5: 2256.78, claude: 16534.56, gemini: 2145.67, grok: 16201.23, deepseek: 16567.23, qwen: 17223.90, btc: 10967.89 },
      { gpt5: 2945.23, claude: 16923.45, gemini: 2656.45, grok: 16578.90, deepseek: 16956.89, qwen: 17634.67, btc: 11001.23 },
      { gpt5: 3323.67, claude: 17323.67, gemini: 3045.78, grok: 16967.45, deepseek: 17356.78, qwen: 18056.89, btc: 11034.56 },
      { gpt5: 3656.89, claude: 17734.56, gemini: 3389.23, grok: 17367.23, deepseek: 17767.45, qwen: 18489.45, btc: 11067.89 },
      { gpt5: 3945.67, claude: 18156.89, gemini: 3689.45, grok: 17778.90, deepseek: 18189.23, qwen: 18933.67, btc: 11101.23 },
      { gpt5: 4178.90, claude: 18589.45, gemini: 3934.67, grok: 18201.56, deepseek: 18623.89, qwen: 19389.23, btc: 11134.56 },
      { gpt5: 4389.45, claude: 19034.56, gemini: 4156.89, grok: 18634.23, deepseek: 19067.45, qwen: 19856.89, btc: 11167.89 },
      { gpt5: 4545.23, claude: 19489.67, gemini: 4323.45, grok: 19078.90, deepseek: 19523.67, qwen: 20334.56, btc: 11201.23 },
      { gpt5: 4678.90, claude: 19956.89, gemini: 4467.89, grok: 19534.56, deepseek: 19989.45, qwen: 20823.45, btc: 11234.56 },
      { gpt5: 4767.45, claude: 20434.56, gemini: 4578.23, grok: 20001.23, deepseek: 20467.23, qwen: 21323.90, btc: 11267.89 },
      { gpt5: 4823.67, claude: 20923.45, gemini: 4656.78, grok: 20478.90, deepseek: 20956.89, qwen: 21834.67, btc: 11301.23 },
      { gpt5: 4845.89, claude: 21423.67, gemini: 4701.34, grok: 20967.45, deepseek: 21456.78, qwen: 22356.89, btc: 11334.56 },
      { gpt5: 4834.23, claude: 21934.56, gemini: 4712.45, grok: 21467.23, deepseek: 21967.45, qwen: 22889.45, btc: 11367.89 },
      { gpt5: 4789.45, claude: 22456.89, gemini: 4690.67, grok: 21978.90, deepseek: 22489.23, qwen: 23433.67, btc: 11401.23 },
      { gpt5: 4712.34, claude: 22989.45, gemini: 4634.89, grok: 22501.56, deepseek: 23023.89, qwen: 23989.23, btc: 11434.56 },
      { gpt5: 4601.23, claude: 23534.56, gemini: 4545.23, grok: 23034.23, deepseek: 23567.45, qwen: 24556.89, btc: 11467.89 },
      { gpt5: 4456.78, claude: 24089.67, gemini: 4423.67, grok: 23578.90, deepseek: 24123.67, qwen: 25134.56, btc: 11501.23 },
      { gpt5: 4278.90, claude: 24656.89, gemini: 4267.89, grok: 24134.56, deepseek: 24689.45, qwen: 25723.45, btc: 11534.56 },
      { gpt5: 4067.45, claude: 25234.56, gemini: 4078.90, grok: 24701.23, deepseek: 25267.23, qwen: 26323.90, btc: 11567.89 },
      { gpt5: 3823.67, claude: 25823.45, gemini: 3856.78, grok: 25278.90, deepseek: 25856.89, qwen: 26934.67, btc: 11601.23 },
      { gpt5: 3545.89, claude: 26423.67, gemini: 3601.23, grok: 25867.45, deepseek: 26456.78, qwen: 27556.89, btc: 11634.56 },
      { gpt5: 3234.56, claude: 27034.56, gemini: 3312.45, grok: 26467.23, deepseek: 27067.45, qwen: 28189.45, btc: 11667.89 },
      { gpt5: 2890.23, claude: 27656.89, gemini: 2990.67, grok: 27078.90, deepseek: 27689.23, qwen: 28833.67, btc: 11701.23 },
      { gpt5: 2512.34, claude: 28289.45, gemini: 2634.89, grok: 27701.56, deepseek: 28323.89, qwen: 29489.23, btc: 11734.56 },
      { gpt5: 2101.23, claude: 28934.56, gemini: 2245.67, grok: 28334.23, deepseek: 28967.45, qwen: 30156.89, btc: 11767.89 },
      { gpt5: 2656.78, claude: 29589.67, gemini: 2823.45, grok: 28978.90, deepseek: 29623.67, qwen: 30834.56, btc: 11801.23 },
      { gpt5: 3178.90, claude: 30256.89, gemini: 3367.89, grok: 29634.56, deepseek: 30289.45, qwen: 31523.45, btc: 11834.56 },
      { gpt5: 3667.45, claude: 30934.56, gemini: 3878.90, grok: 30301.23, deepseek: 30967.23, qwen: 32223.90, btc: 11867.89 },
      { gpt5: 4123.67, claude: 31623.45, gemini: 4356.78, grok: 30978.90, deepseek: 31656.89, qwen: 32934.67, btc: 11901.23 },
      { gpt5: 4545.89, claude: 32323.67, gemini: 4801.23, grok: 31667.45, deepseek: 32356.78, qwen: 33656.89, btc: 11934.56 },
      { gpt5: 4934.23, claude: 33034.56, gemini: 5212.34, grok: 32367.23, deepseek: 33067.45, qwen: 34389.45, btc: 11967.89 },
      { gpt5: 5289.45, claude: 33756.89, gemini: 5589.45, grok: 33078.90, deepseek: 33789.23, qwen: 35133.67, btc: 12001.23 },
      { gpt5: 5612.34, claude: 34489.45, gemini: 5934.56, grok: 33801.56, deepseek: 34523.89, qwen: 35889.23, btc: 12034.56 },
      { gpt5: 5901.23, claude: 35234.56, gemini: 6245.67, grok: 34534.23, deepseek: 35267.45, qwen: 36656.89, btc: 12067.89 },
      { gpt5: 6156.78, claude: 35989.67, gemini: 6523.45, grok: 35278.90, deepseek: 36023.67, qwen: 37434.56, btc: 12101.23 },
      { gpt5: 6378.90, claude: 36756.89, gemini: 6767.89, grok: 36034.56, deepseek: 36789.45, qwen: 38223.45, btc: 12134.56 },
      { gpt5: 6567.45, claude: 37534.56, gemini: 6978.90, grok: 36801.23, deepseek: 37567.23, qwen: 39023.90, btc: 12167.89 },
      { gpt5: 6723.67, claude: 38323.45, gemini: 7156.78, grok: 37578.90, deepseek: 38356.89, qwen: 39834.67, btc: 12201.23 },
      { gpt5: 6845.89, claude: 39123.67, gemini: 7301.23, grok: 38367.45, deepseek: 39156.78, qwen: 40656.89, btc: 12234.56 },
      { gpt5: 6934.23, claude: 39934.56, gemini: 7412.34, grok: 39167.23, deepseek: 39967.45, qwen: 41489.45, btc: 12267.89 },
      { gpt5: 6989.45, claude: 40756.89, gemini: 7489.45, grok: 39978.90, deepseek: 40789.23, qwen: 42333.67, btc: 12301.23 },
      { gpt5: 7012.34, claude: 41589.45, gemini: 7534.56, grok: 40801.56, deepseek: 41623.89, qwen: 43189.23, btc: 12334.56 },
      { gpt5: 7001.23, claude: 42434.56, gemini: 7545.67, grok: 41634.23, deepseek: 42467.45, qwen: 44056.89, btc: 12367.89 },
      { gpt5: 6956.78, claude: 43289.67, gemini: 7523.45, grok: 42478.90, deepseek: 43323.67, qwen: 44934.56, btc: 12401.23 },
      { gpt5: 6878.90, claude: 44156.89, gemini: 7467.89, grok: 43334.56, deepseek: 44189.45, qwen: 45823.45, btc: 12434.56 },
      { gpt5: 6767.45, claude: 45034.56, gemini: 7378.90, grok: 44201.23, deepseek: 45067.23, qwen: 46723.90, btc: 12467.89 },
      { gpt5: 6623.67, claude: 45923.45, gemini: 7256.78, grok: 45078.90, deepseek: 45956.89, qwen: 47634.67, btc: 12501.23 },
      { gpt5: 6445.89, claude: 46823.67, gemini: 7101.23, grok: 45967.45, deepseek: 46856.78, qwen: 48556.89, btc: 12534.56 },
      { gpt5: 6234.23, claude: 47734.56, gemini: 6912.34, grok: 46867.23, deepseek: 47767.45, qwen: 49489.45, btc: 12567.89 },
      { gpt5: 5989.45, claude: 48656.89, gemini: 6689.45, grok: 47778.90, deepseek: 48689.23, qwen: 50433.67, btc: 12601.23 },
      { gpt5: 5712.34, claude: 49589.45, gemini: 6434.56, grok: 48701.56, deepseek: 49623.89, qwen: 51389.23, btc: 12634.56 },
      { gpt5: 5401.23, claude: 50534.56, gemini: 6145.67, grok: 49634.23, deepseek: 50567.45, qwen: 52356.89, btc: 12667.89 },
      { gpt5: 5056.78, claude: 51489.67, gemini: 5823.45, grok: 50578.90, deepseek: 51523.67, qwen: 53334.56, btc: 12701.23 },
      { gpt5: 4678.90, claude: 52456.89, gemini: 5467.89, grok: 51534.56, deepseek: 52489.45, qwen: 54323.45, btc: 12734.56 },
      { gpt5: 4267.45, claude: 53434.56, gemini: 5078.90, grok: 52501.23, deepseek: 53467.23, qwen: 55323.90, btc: 12767.89 },
      { gpt5: 3823.67, claude: 54423.45, gemini: 4656.78, grok: 53478.90, deepseek: 54456.89, qwen: 56334.67, btc: 12801.23 },
      { gpt5: 3345.89, claude: 55423.67, gemini: 4201.23, grok: 54467.45, deepseek: 55456.78, qwen: 57356.89, btc: 12834.56 },
      { gpt5: 3834.23, claude: 56434.56, gemini: 4712.34, grok: 55467.23, deepseek: 56467.45, qwen: 58389.45, btc: 12867.89 },
      { gpt5: 4289.45, claude: 57456.89, gemini: 5189.45, grok: 56478.90, deepseek: 57489.23, qwen: 59433.67, btc: 12901.23 },
      { gpt5: 4712.34, claude: 58489.45, gemini: 5634.56, grok: 57501.56, deepseek: 58523.89, qwen: 60489.23, btc: 12934.56 },
      { gpt5: 5101.23, claude: 59534.56, gemini: 6045.67, grok: 58534.23, deepseek: 59567.45, qwen: 61556.89, btc: 12967.89 },
      { gpt5: 5456.78, claude: 60589.67, gemini: 6423.45, grok: 59578.90, deepseek: 60623.67, qwen: 62634.56, btc: 13001.23 },
      { gpt5: 5778.90, claude: 61656.89, gemini: 6767.89, grok: 60634.56, deepseek: 61689.45, qwen: 63723.45, btc: 13034.56 },
      { gpt5: 6067.45, claude: 62734.56, gemini: 7078.90, grok: 61701.23, deepseek: 62767.23, qwen: 64823.90, btc: 13067.89 },
      { gpt5: 6323.67, claude: 63823.45, gemini: 7356.78, grok: 62778.90, deepseek: 63856.89, qwen: 65934.67, btc: 13101.23 },
      { gpt5: 6545.89, claude: 64923.67, gemini: 7601.23, grok: 63867.45, deepseek: 64956.78, qwen: 67056.89, btc: 13134.56 },
      { gpt5: 6734.23, claude: 66034.56, gemini: 7812.34, grok: 64967.23, deepseek: 66067.45, qwen: 68189.45, btc: 13167.89 },
      { gpt5: 6889.45, claude: 67156.89, gemini: 7989.45, grok: 66078.90, deepseek: 67189.23, qwen: 69333.67, btc: 13201.23 },
      { gpt5: 7012.34, claude: 68289.45, gemini: 8134.56, grok: 67201.56, deepseek: 68323.89, qwen: 70489.23, btc: 13234.56 },
      { gpt5: 7101.23, claude: 69434.56, gemini: 8245.67, grok: 68334.23, deepseek: 69467.45, qwen: 71656.89, btc: 13267.89 },
      { gpt5: 7156.78, claude: 70589.67, gemini: 8323.45, grok: 69478.90, deepseek: 70623.67, qwen: 72834.56, btc: 13301.23 },
      { gpt5: 7178.90, claude: 71756.89, gemini: 8367.89, grok: 70634.56, deepseek: 71789.45, qwen: 74023.45, btc: 13334.56 },
      { gpt5: 7167.45, claude: 72934.56, gemini: 8378.90, grok: 71801.23, deepseek: 72967.23, qwen: 75223.90, btc: 13367.89 },
      { gpt5: 7123.67, claude: 74123.45, gemini: 8356.78, grok: 72978.90, deepseek: 74156.89, qwen: 76434.67, btc: 13401.23 },
      { gpt5: 7045.89, claude: 75323.67, gemini: 8301.23, grok: 74167.45, deepseek: 75356.78, qwen: 77656.89, btc: 13434.56 },
      { gpt5: 6934.23, claude: 76534.56, gemini: 8212.34, grok: 75367.23, deepseek: 76567.45, qwen: 78889.45, btc: 13467.89 },
      { gpt5: 6789.45, claude: 77756.89, gemini: 8089.45, grok: 76578.90, deepseek: 77789.23, qwen: 80133.67, btc: 13501.23 },
      { gpt5: 6612.34, claude: 78989.45, gemini: 7934.56, grok: 77801.56, deepseek: 79023.89, qwen: 81389.23, btc: 13534.56 },
      { gpt5: 6401.23, claude: 80234.56, gemini: 7745.67, grok: 79034.23, deepseek: 80267.45, qwen: 82656.89, btc: 13567.89 },
      { gpt5: 6156.78, claude: 81489.67, gemini: 7523.45, grok: 80278.90, deepseek: 81523.67, qwen: 83934.56, btc: 13601.23 },
      { gpt5: 5878.90, claude: 82756.89, gemini: 7267.89, grok: 81534.56, deepseek: 82789.45, qwen: 85223.45, btc: 13634.56 },
      { gpt5: 5567.45, claude: 84034.56, gemini: 6978.90, grok: 82801.23, deepseek: 84067.23, qwen: 86523.90, btc: 13667.89 },
      { gpt5: 5223.67, claude: 85323.45, gemini: 6656.78, grok: 84078.90, deepseek: 85356.89, qwen: 87834.67, btc: 13701.23 },
      { gpt5: 4845.89, claude: 86623.67, gemini: 6301.23, grok: 85367.45, deepseek: 86656.78, qwen: 89156.89, btc: 13734.56 },
      { gpt5: 4434.23, claude: 87934.56, gemini: 5912.34, grok: 86667.23, deepseek: 87967.45, qwen: 90489.45, btc: 13767.89 },
      { gpt5: 3989.45, claude: 89256.89, gemini: 5489.45, grok: 87978.90, deepseek: 89289.23, qwen: 91833.67, btc: 13801.23 },
      { gpt5: 3512.34, claude: 90589.45, gemini: 5034.56, grok: 89301.56, deepseek: 90623.89, qwen: 93189.23, btc: 13834.56 },
      { gpt5: 3001.23, claude: 91934.56, gemini: 4545.67, grok: 90634.23, deepseek: 91967.45, qwen: 94556.89, btc: 13867.89 },
      { gpt5: 3456.78, claude: 93289.67, gemini: 5023.45, grok: 91978.90, deepseek: 93323.67, qwen: 95934.56, btc: 13901.23 },
      { gpt5: 3878.90, claude: 94656.89, gemini: 5467.89, grok: 93334.56, deepseek: 94689.45, qwen: 97323.45, btc: 13934.56 },
      { gpt5: 4267.45, claude: 96034.56, gemini: 5878.90, grok: 94701.23, deepseek: 96067.23, qwen: 98723.90, btc: 13967.89 },
      { gpt5: 4623.67, claude: 97423.45, gemini: 6256.78, grok: 96078.90, deepseek: 97456.89, qwen: 100134.67, btc: 14001.23 },
      { gpt5: 3348.06, claude: 98240.21, gemini: 4603.95, grok: 97275.00, deepseek: 103676.70, qwen: 105261.80, btc: 10103.56 }
    ];
    return fixedValues.map((values, i) => ({
      date: new Date(startDate.getTime() + i * 3600000),
      ...values
    }));
  };

  const data = generateData();

  const { width, height } = dimensions;
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
    return `$${value.toLocaleString('en-US')}`;
  };

  return (
    <div className='flex flex-col h-[480px] md:min-h-0 md:h-auto md:flex-1 border-b md:border-b-0 md:border-r border-border flex-shrink-0'>
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
              <div ref={containerRef} className="relative flex-1 bg-gray-50 px-4">
                <svg width={width} height={height} style={{ display: 'block', maxWidth: '100%' }}>
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
                    
                    {/* Define circle-with-icon patterns for each model */}
                    {models.map((model) => {
                      const radius = model.dashed ? 12.6 : 15.75;
                      return (
                        <g key={`icon-def-${model.key}`} id={`circle-with-icon-${model.key}`}>
                          <circle
                            cx="0"
                            cy="0"
                            r={radius}
                            fill={model.color}
                            stroke={model.stroke || 'none'}
                            strokeWidth={model.dashed ? 1.5 : 0}
                            strokeDasharray={model.dashed ? '3,2' : ''}
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

                  <Group left={margin.left} top={margin.top}>
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
                      const lineData = data.map(d => ({
                        date: d.date,
                        value: d[model.key]
                      }));

                      return (
                        <LinePath
                          key={model.key}
                          data={lineData}
                          x={d => xScale(d.date)}
                          y={d => yScale(d.value)}
                          stroke={model.color}
                          strokeWidth={model.dashed ? 1.5 : 2.5}
                          strokeDasharray={model.dashed ? '5,5' : ''}
                          opacity={1}
                        />
                      );
                    })}

                    {/* End points with icons and labels */}
                    {models.map((model) => {
                      const lastPoint = data[data.length - 1];
                      const cx = xScale(lastPoint.date);
                      const cy = yScale(lastPoint[model.key]);
                      
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
                                animation: 'pulse-out 1s ease-out 0s 1 normal forwards'
                              }}
                            />
                          </g>
                          
                          {/* Icon circle using use tag */}
                        <g transform={`translate(${cx}, ${cy})`} style={{ transformOrigin: 'center' }}>
                            {/* infinite pulse ring */}
                            <circle
                                cx={0}
                                cy={0}
                                r={23.75}
                                fill={model.color}
                                opacity={0.25}
                                style={{ animation: 'pulse-out 1.5s ease-out infinite' }}
                            />
                            <g 
                                transform={`scale(1)`}
                                style={{
                                    filter: 'none',
                                    opacity: 1,
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease-in-out 0.1s',
                                }}
                            >
                                <use href={`#circle-with-icon-${model.key}`} x="0" y="0" />
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