import os
import re

pages_data = [
    {
        'dir': 'app/babak1/page1',
        'css': 'babak1.css',
        'nextRoute': '/babak1/page2_narration',
        'npc_name': 'Jaka Slewah',
        'npc_img': '/babak1/pages_1_assets/aktor_npc.png',
        'answers': ['Cedhak', 'Asor', 'Bocah'],
        'css_prefix': 'babak1'
    },
    {
        'dir': 'app/babak2/page1',
        'css': 'babak2.css',
        'nextRoute': '/babak2/page2',
        'npc_name': 'Wandan Wanguri',
        'npc_img': '/babak2/pages_1_assets/aktor_npc.png',
        'answers': ['Cedhak', 'Dhuwur', 'Tuwa'],
        'css_prefix': 'babak2'
    },
    {
        'dir': 'app/babak4/page1',
        'css': 'babak4.css',
        'nextRoute': '/babak4/page2',
        'npc_name': 'Ki Ageng Sapayana',
        'npc_img': '/babak4/pages_1_assets/aktor_npc.png',
        'answers': ['Adoh', 'Dhuwur', 'Tuwa'],
        'css_prefix': 'babak4'
    },
    {
        'dir': 'app/babak5/page1',
        'css': 'babak5.css',
        'nextRoute': '/babak5/page2',
        'npc_name': 'Surontanu',
        'npc_img': '/babak5/pages_1_assets/aktor_npc.png',
        'answers': ['Sedheng', 'Sedheng', 'Remaja'],
        'css_prefix': 'babak5'
    },
    {
        'dir': 'app/babak7/page1',
        'css': 'page1.css',
        'nextRoute': '/babak7/page2',
        'npc_name': 'Prajurit',
        'npc_img': '/babak7/pages_1_assets/aktor_npc.png',
        'answers': ['Adoh', 'Sedheng', 'Remaja'],
        'css_prefix': 'babak7-page1'
    },
    {
        'dir': 'app/babak7/page6',
        'css': 'page6.css',
        'nextRoute': '/babak7/page7',
        'npc_name': 'Patih Pangulang Jagad',
        'npc_img': '/babak7/pages_6_assets/aktor_npc.png',
        'answers': ['Adoh', 'Dhuwur', 'Tuwa'],
        'css_prefix': 'babak7-page6'
    },
    {
        'dir': 'app/babak9/page1',
        'css': 'page1.css',
        'nextRoute': '/babak9/page2',
        'npc_name': 'Patih Pangulang Jagad',
        'npc_img': '/babak9/pages_1_assets/aktor_npc.png',
        'answers': ['Sedheng', 'Dhuwur', 'Tuwa'],
        'css_prefix': 'babak9-page1'
    }
]

page_template = """'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, ArrowRight } from 'lucide-react';
import { getCurrentUser } from '@/app/actions/auth';
import { saveUlasan } from '@/utils/ulasanStorage';
import Home from '@/components/Home';
import Music from '@/components/Music';
import Timer from '@/components/Timer';
import confetti from 'canvas-confetti';

import './{css_file}';

export default function {component_name}() {{
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [showPopup, setShowPopup] = useState<'pop_25' | 'pop_50' | 'pop_75' | 'pop_100' | 'pop_cobalagi' | 'pop_salah' | 'pop_streak' | 'timeout' | null>(null);
  const [attempts, setAttempts] = useState(1);
  const [hasStreakPending, setHasStreakPending] = useState(false);
  
  // NEW STATE FOR 3 STEPS
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const proceedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  useEffect(() => {{
    const checkAuth = async () => {{
      try {{
        const user = await getCurrentUser();
        if (!user) {{
          router.push('/');
        }} else {{
          setCurrentUser(user);
          setIsValidating(false);
        }}
      }} catch (err) {{
        console.error('Auth check error:', err);
        router.push('/');
      }}
    }};
    checkAuth();
  }}, [router]);

  useEffect(() => {{
    return () => {{
      if (proceedTimeoutRef.current) {{
        clearTimeout(proceedTimeoutRef.current);
      }}
    }};
  }}, []);

  useEffect(() => {{
    let applauseAudio: HTMLAudioElement | null = null;
    let applauseTimeout: NodeJS.Timeout | null = null;

    if (showPopup && ['pop_25', 'pop_50', 'pop_75', 'pop_100'].includes(showPopup)) {{
      const audio = new Audio('/main/MP3_soundeffect/correct_soundeffect.wav');
      audio.play().catch((err) => console.log('Correct sound playback failed:', err));
      
      if (showPopup === 'pop_100') {{
        confetti({{
          particleCount: 150,
          spread: 80,
          origin: {{ y: 0.6 }},
          colors: ['#FF1493', '#00BFFF', '#32CD32', '#FFD700', '#FF4500', '#9400D3'],
          zIndex: 9999999
        }});
      }}
    }} else if (showPopup === 'pop_streak') {{
      applauseAudio = new Audio('/main/MP3_soundeffect/aplause.mp3');
      applauseAudio.play().catch((err) => console.log('Applause sound playback failed:', err));

      applauseTimeout = setTimeout(() => {{
        if (applauseAudio) {{
          applauseAudio.pause();
          applauseAudio.currentTime = 0;
        }}
      }}, 4000);

      const end = Date.now() + 3000;
      const colors = ['#FFD700', '#FFA500', '#FFF8E1', '#F0B863', '#ECC560'];
      (function frame() {{
        confetti({{
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: {{ x: 0, y: 0.8 }},
          colors: colors,
          shapes: ['star', 'circle', 'square'],
          scalar: 1.2,
          zIndex: 9999999
        }});
        confetti({{
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: {{ x: 1, y: 0.8 }},
          colors: colors,
          shapes: ['star', 'circle', 'square'],
          scalar: 1.2,
          zIndex: 9999999
        }});
        if (Math.random() < 0.1) {{
          confetti({{
            particleCount: 8,
            angle: 270,
            spread: 80,
            origin: {{ x: Math.random(), y: 0 }},
            colors: colors,
            shapes: ['star'],
            scalar: 1.5,
            gravity: 0.6,
            drift: Math.random() * 2 - 1,
            zIndex: 9999999
          }});
        }}
        if (Date.now() < end) {{
          requestAnimationFrame(frame);
        }}
      }}());
    }} else if (showPopup && ['pop_cobalagi', 'pop_salah', 'timeout'].includes(showPopup)) {{
      const audio = new Audio('/main/MP3_soundeffect/wrong_soundeffect.mp3');
      audio.play().catch((err) => console.log('Wrong sound playback failed:', err));
    }}

    return () => {{
      if (applauseTimeout) clearTimeout(applauseTimeout);
      if (applauseAudio) {{
        applauseAudio.pause();
        applauseAudio.currentTime = 0;
      }}
    }};
  }}, [showPopup]);

  useEffect(() => {{
    if (typeof window !== 'undefined') {{
      localStorage.setItem('game_score', '0');
      localStorage.setItem('game_streak', '0');
      
      const timerKeys = [
        '{timer_prefix}_timer_expiration',
        '{timer_prefix}_timer_paused_time'
      ];
      timerKeys.forEach(key => localStorage.removeItem(key));
    }}
  }}, []);

  const handleTimeOut = () => {{
    if (isLocked || showPopup) return;
    setIsLocked(true);
    setShowPopup('timeout');

    proceedTimeoutRef.current = setTimeout(() => {{
      handleProceed();
    }}, 2000);
  }};

  const getStepConfig = () => {{
    switch (currentStep) {{
      case 1:
        return {{
          bgImage: '/main_frame/relasi.webp',
          title: 'Relasi Sosial',
          options: [
            {{ id: 'Cedhak', label: 'Cedhak' }},
            {{ id: 'Sedheng', label: 'Sedheng' }},
            {{ id: 'Adoh', label: 'Adoh' }}
          ],
          correctId: '{ans1}'
        }};
      case 2:
        return {{
          bgImage: '/main_frame/pakurmatan.webp',
          title: 'Tingkat Pakurmatan',
          options: [
            {{ id: 'Dhuwur', label: 'Dhuwur' }},
            {{ id: 'Sedheng', label: 'Sedheng' }},
            {{ id: 'Asor', label: 'Asor' }}
          ],
          correctId: '{ans2}'
        }};
      case 3:
        return {{
          bgImage: '/main_frame/drajatsosial.webp',
          title: 'Drajat Sosial',
          options: [
            {{ id: 'Tuwa', label: 'Tuwa' }},
            {{ id: 'Remaja', label: 'Remaja' }},
            {{ id: 'Bocah', label: 'Bocah' }}
          ],
          correctId: '{ans3}'
        }};
      default:
        return {{
          bgImage: '/main_frame/relasi.webp',
          title: '',
          options: [],
          correctId: ''
        }};
    }}
  }};

  const handleOptionClick = (optionId: string) => {{
    if (isLocked) return;
    setIsLocked(true);
    setSelectedOption(optionId);

    const stepConfig = getStepConfig();
    const correct = optionId === stepConfig.correctId;
    setIsAnswerCorrect(correct);

    const questionText = 'Analisis paraga {npc_name} - ' + stepConfig.title;
    const userAns = stepConfig.options.find(o => o.id === optionId)?.label || optionId;
    const correctAns = stepConfig.options.find(o => o.id === stepConfig.correctId)?.label || stepConfig.correctId;
    
    let __scoreText = 'skor : 0';
    if (correct && typeof window !== 'undefined') {{
       const __tmpEarned = (attempts === 1 ? 50 : 25);
       __scoreText = `skor : ${{__tmpEarned}}`;
    }}
    saveUlasan(questionText, userAns, correctAns, __scoreText);

    if (correct && typeof window !== 'undefined') {{
      const earned = attempts === 1 ? 50 : 25;
      
      const currentScore = parseInt(localStorage.getItem('game_score') || '0', 10);
      localStorage.setItem('game_score', (currentScore + earned).toString());
      
      setTimeout(() => {{
        setShowPopup(`pop_${{earned}}` as any);

        proceedTimeoutRef.current = setTimeout(() => {{
          handleNextStep();
        }}, 4000);
      }}, 1000);
    }} else {{
      setTimeout(() => {{
        if (attempts === 1) {{
          setShowPopup('pop_cobalagi');
          proceedTimeoutRef.current = setTimeout(() => {{
            setAttempts(2);
            setIsLocked(false);
            setSelectedOption(null);
            setIsAnswerCorrect(null);
            setShowPopup(null);
          }}, 2500);
        }} else if (attempts === 2) {{
          setShowPopup('pop_salah');
          proceedTimeoutRef.current = setTimeout(() => {{
            setAttempts(3);
            setIsLocked(false);
            setSelectedOption(null);
            setIsAnswerCorrect(null);
            setShowPopup(null);
          }}, 2500);
        }} else {{
          setShowPopup('pop_salah');
          proceedTimeoutRef.current = setTimeout(() => {{
            handleNextStep();
          }}, 2000);
        }}
      }}, 1000);
    }}
  }};

  const handleNextStep = () => {{
    if (currentStep < 3) {{
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
      setAttempts(1);
      setIsLocked(false);
      setSelectedOption(null);
      setIsAnswerCorrect(null);
      setShowPopup(null);
    }} else {{
      handleProceed();
    }}
  }};

  const handleOverlayClick = () => {{
    if (proceedTimeoutRef.current) {{
      clearTimeout(proceedTimeoutRef.current);
    }}
    
    if (showPopup === 'pop_100' && hasStreakPending) {{
      setHasStreakPending(false);
      setShowPopup('pop_streak');
      
      proceedTimeoutRef.current = setTimeout(() => {{
        handleNextStep();
      }}, 4000);
    }} else {{
      if (['pop_25', 'pop_50', 'pop_75', 'pop_100'].includes(showPopup as string) || (showPopup === 'pop_salah' && attempts === 3) || showPopup === 'timeout') {{
         handleNextStep();
      }} else {{
        if (showPopup === 'pop_cobalagi' || (showPopup === 'pop_salah' && attempts < 3)) {{
          setAttempts(attempts + 1);
          setIsLocked(false);
          setSelectedOption(null);
          setIsAnswerCorrect(null);
          setShowPopup(null);
        }}
      }}
    }}
  }};

  const handleProceed = () => {{
    if (typeof window !== 'undefined') {{
      localStorage.removeItem('{timer_prefix}_timer_expiration');
      localStorage.removeItem('{timer_prefix}_timer_paused_time');
    }}
    router.push('{next_route}');
  }};

  if (isValidating) {{
    return (
      <div className="{css_prefix}-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FFF8E1', fontSize: '20px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'sans-serif' }}>
          Loading...
        </div>
      </div>
    );
  }}

  const stepConfig = getStepConfig();

  return (
    <div className="{css_prefix}-container">
      <Home className="{css_prefix}-nav-btn {css_prefix}-home-btn" />

      <Timer
        initialTime={{150}}
        isLocked={{isLocked || !!showPopup}}
        onTimeOut={{handleTimeOut}}
        storageKey="{timer_prefix}_timer"
      />

      <Music className="{css_prefix}-nav-btn {css_prefix}-music-btn" />
      
      <div className="{css_prefix}-card-frame" style={{ backgroundImage: `url('${{stepConfig.bgImage}}')` }}>
        <div className="{css_prefix}-card-content-layout">

          <div className="{css_prefix}-column-left">
            <Image
              src="{npc_img}"
              alt="{npc_name}"
              width={{100}}
              height={{100}}
              className="{css_prefix}-avatar-image-el"
              priority
              unoptimized
            />
          </div>

          <div className="{css_prefix}-column-right">
           <div className="{css_prefix}-options-container">
              {{stepConfig.options.map((opt) => {{
                const isSelected = selectedOption === opt.id;
                let btnClass = `{css_prefix}-option-btn {css_prefix}-opt-${{opt.id}}`;

                if (isSelected) {{
                  if (isAnswerCorrect) {{
                    btnClass += " {css_prefix}-correct-option";
                  }} else if (isAnswerCorrect === false) {{
                    btnClass += " {css_prefix}-incorrect-option";
                  }}
                }}

                return (
                  <button
                    key={{opt.id}}
                    onClick={{() => handleOptionClick(opt.id)}}
                    className={{btnClass}}
                    disabled={{isLocked}}
                    type="button"
                  >
                    {{opt.label}}
                  </button>
                );
              }})}}
            </div>
          </div>

        </div>
      </div>

      <div className="{css_prefix}-bottom-banner">
        <div className="{css_prefix}-banner-content-layout">

        </div>
      </div>

      {{showPopup && (
        <div className={{`{css_prefix}-popup-overlay ${{showPopup === 'pop_streak' ? 'streak-popup-overlay' : ''}}`}} onClick={{handleOverlayClick}} style={{ cursor: 'pointer' }}>
          <div className={{`{css_prefix}-popup-card ${{showPopup === 'pop_streak' ? 'streak-popup-card' : ''}}`}}>
            <Image
              src={{
                showPopup === 'timeout'
                  ? '/main/pop_up/pop_waktuhabis1.webp'
                  : `/main/pop_up/${{showPopup}}.png`
              }}
              alt={{showPopup}}
              width={{320}}
              height={{240}}
              className="{css_prefix}-popup-image"
              unoptimized
            />
          </div>
        </div>
      )}}
    </div>
  );
}}
"""

for p in pages_data:
    # Build component name from dir
    comp_parts = p['dir'].split('/')
    comp_name = "".join([part.capitalize() for part in comp_parts[1:]]) + "Page"
    
    file_path = os.path.join(p['dir'], 'page.tsx')
    
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            match = re.search(r"router\.push\('([^']+)'\)", content)
            if match:
                if match.group(1) != '/':
                    p['nextRoute'] = match.group(1)
            
            match = re.search(r"storageKey=\"([^\"]+)_timer\"", content)
            if match:
                p['timer_prefix'] = match.group(1)
            else:
                p['timer_prefix'] = f"{comp_parts[1]}_{comp_parts[2]}"

    content_to_write = page_template.format(
        css_file=p['css'],
        component_name=comp_name,
        timer_prefix=p['timer_prefix'],
        ans1=p['answers'][0],
        ans2=p['answers'][1],
        ans3=p['answers'][2],
        npc_name=p['npc_name'],
        next_route=p['nextRoute'],
        css_prefix=p['css_prefix'],
        npc_img=p['npc_img']
    )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content_to_write)
    print(f"Updated {file_path}")

css_replacements = [
    (r'\.([a-zA-Z0-9_-]+)-opt-luwih_tuwa', r'.\1-opt-Cedhak, .\1-opt-Dhuwur, .\1-opt-Tuwa'),
    (r'\.([a-zA-Z0-9_-]+)-opt-sapantaran', r'.\1-opt-Sedheng, .\1-opt-Remaja'),
    (r'\.([a-zA-Z0-9_-]+)-opt-luwih_enom', r'.\1-opt-Adoh, .\1-opt-Asor, .\1-opt-Bocah')
]

for p in pages_data:
    css_path = os.path.join(p['dir'], p['css'])
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            css_content = f.read()
            
        for old_pattern, new_replacement in css_replacements:
            css_content = re.sub(old_pattern, new_replacement, css_content)
            
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(css_content)
        print(f"Updated CSS {css_path}")
