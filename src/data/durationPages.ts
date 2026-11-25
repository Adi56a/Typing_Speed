export interface DurationPage {
  path: string;           // '/typing-test/3-minute/'
  seconds: number;        // 180
  label: string;          // '3 Minute'
  directAnswer: string;   // 40–60 words, unique
  whoUsesIt: string;      // 80–150 words, unique
  scoreNotes: string;     // 60–120 words: how scores behave at this length
  faqs: { q: string; a: string }[]; // 3–4, unique per page
}

export const DURATION_PAGES: Record<string, DurationPage> = {
  '/typing-test/30-second/': {
    path: '/typing-test/30-second/',
    seconds: 30,
    label: '30 Second',
    directAnswer:
      'A good score on a 30-second typing test is between 45 and 60 WPM, with top typists exceeding 85 WPM. Because the test is short, your hands do not experience muscle fatigue, allowing you to achieve a higher speed than during longer tests. Maintaining at least 95% accuracy remains essential.',
    whoUsesIt:
      'The 30-second typing test is widely favored by gamers, competitive keyboard enthusiasts, and busy professionals who want a quick finger warm-up before starting work. Because it requires less than a minute of total commitment, learners use this sprint mode to conduct frequent interval drills throughout the day. It helps typists measure raw mechanical burst speed without dealing with physical exhaustion or cognitive strain. High-speed coders also utilize the half-minute drill to verify finger fluidity after switching keyboard layouts or switching to new mechanical switches. If you want a rapid check on keystroke response, this short test delivers fast, reliable feedback.',
    scoreNotes:
      'On a thirty-second sprint, typists typically score 5 to 10 WPM higher than their sustained five-minute pace. A single uncorrected typo severely degrades your final accuracy percentage due to the smaller keystroke denominator. Focus on striking each letter cleanly during the opening five words to establish an uninterrupted rhythm before accelerating into your maximum sprint tempo.',
    faqs: [
      {
        q: 'Why is my 30-second typing speed higher than my normal speed?',
        a: 'Short sprints measure pure finger dexterity and immediate reflex speed. Since physical fatigue does not set in over thirty seconds, most typists record their highest individual WPM scores on this test.',
      },
      {
        q: 'Is a 30-second typing test accepted for employment screening?',
        a: 'Most corporate recruiters and government agencies prefer three-minute or five-minute evaluations to verify stamina. However, the thirty-second test is perfect for personal tracking and daily warm-ups.',
      },
      {
        q: 'How often should I practice 30-second typing sprints?',
        a: 'Running three to five short sprints daily provides excellent neuromuscular stimulation. Use it as an interval exercise between longer practice sessions to push your peak burst speed higher.',
      },
    ],
  },
  '/typing-test/1-minute/': {
    path: '/typing-test/1-minute/',
    seconds: 60,
    label: '1 Minute',
    directAnswer:
      'A good score on a 1-minute typing test is between 40 and 55 WPM, which matches the standard benchmark for productive office work. Achieving over 70 WPM places you in the top 15 percent of typists globally. Consistent accuracy above 94 percent indicates reliable keyboard competency.',
    whoUsesIt:
      'The one-minute typing test is the universally recognized snapshot for measuring personal keyboard fluency. High schools, coding bootcamps, and career portals utilize 60-second evaluations to benchmark student progress and verify baseline computer literacy. Job seekers frequently run this test to assess their current capabilities before applying for administrative or data-entry positions. Because 60 seconds is long enough to gauge steady rhythm yet brief enough to repeat multiple times, millions of daily typists rely on it as their primary training benchmark. It offers the ideal balance between rapid feedback and realistic paragraph continuity.',
    scoreNotes:
      'Over sixty seconds, pacing begins to matter as much as pure finger agility. Rushing through the opening sentence often leads to early errors that disrupt rhythm and lower net WPM. Typists who maintain a controlled, steady cadence usually outscore those who start at breakneck speed and then hesitate on difficult punctuation.',
    faqs: [
      {
        q: 'Why is the 1-minute test the most common typing speed benchmark?',
        a: 'Sixty seconds provides sufficient time to test rhythm across multiple sentences while remaining fast enough to repeat several times during a single practice session.',
      },
      {
        q: 'What is an acceptable 1-minute typing speed for a resume?',
        a: 'Listing a verified speed of 50 to 65 WPM with 95% accuracy strengthens any resume for office administration, customer support, or technical writing roles.',
      },
      {
        q: 'How can I improve my 1-minute typing score?',
        a: 'Keep your eyes locked on the oncoming text rather than looking down at your hands. Developing muscle memory on common letter combinations naturally raises your 60-second output.',
      },
    ],
  },
  '/typing-test/2-minute/': {
    path: '/typing-test/2-minute/',
    seconds: 120,
    label: '2 Minute',
    directAnswer:
      'A good score on a 2-minute typing test is between 38 and 50 WPM with at least 95 percent accuracy. Maintaining this output over 120 seconds demonstrates that your keyboard speed is stable and not merely a brief sprint anomaly. Speeds over 65 WPM reflect advanced proficiency.',
    whoUsesIt:
      'The two-minute typing test is widely adopted by technical writers, customer service representatives, and transcriptionists who must maintain composure over multiple paragraphs. While a 60-second sprint rewards rapid bursts, 120 seconds reveals whether a typist can recover smoothly from an occasional mistake without derailing their cadence. Many training academies use the two-minute format as an intermediate stepping stone for students transitioning from brief drills to rigorous multi-minute employment examinations. It tests concentration, posture, and steady breathing under continuous keyboard action.',
    scoreNotes:
      'During a two-minute test, error clustering becomes the primary risk factor. Making several mistakes in a row can break your focus and drastically reduce net WPM. The most successful approach is deliberate pacing: aim for smooth, rhythmic keystrokes and resist the urge to rush when encountering unfamiliar vocabulary.',
    faqs: [
      {
        q: 'What does a 2-minute typing test reveal that a 1-minute test misses?',
        a: 'A two-minute session exposes consistency and emotional recovery. It demonstrates whether you maintain high speed after making an initial typo or lose rhythm under pressure.',
      },
      {
        q: 'Is two minutes long enough to test touch typing stamina?',
        a: 'Yes, 120 seconds is sufficient to test whether poor ergonomic habits cause early tension in your wrists, forearms, or shoulders.',
      },
      {
        q: 'How should I pace myself throughout a 2-minute test?',
        a: 'Start at approximately 90 percent of your maximum sprint speed. Establishing a stable rhythm in the first thirty seconds allows you to maintain clean accuracy until the timer expires.',
      },
    ],
  },
  '/typing-test/3-minute/': {
    path: '/typing-test/3-minute/',
    seconds: 180,
    label: '3 Minute',
    directAnswer:
      'A good score on a 3-minute typing test is between 40 and 52 WPM with 96 percent accuracy or higher. Because three minutes is the preferred duration for corporate hiring assessments, scoring above 60 WPM qualifies candidates for competitive administrative, legal, and clerical roles.',
    whoUsesIt:
      'Human resources departments, recruitment agencies, and staffing firms consider the 3-minute typing test their gold standard for candidate evaluation. It represents the sweet spot between short speed checks and lengthy endurance marathons. Employers use three-minute evaluations for screening executive assistants, paralegals, medical transcriptionists, and remote support agents. Three minutes is long enough to eliminate fluke performances and reveal genuine on-the-job typing capability under realistic working conditions. Job seekers who want a credible score to include on their CV or LinkedIn profile should practice extensively with this duration.',
    scoreNotes:
      'Scores on a three-minute test accurately reflect true workday productivity. Unlike thirty-second drills where adrenaline carries you through, a three-minute assessment tests sustained attention and physical endurance. To maximize your net score, prioritize precision over raw speed, as uncorrected mistakes heavily penalize your final result.',
    faqs: [
      {
        q: 'Why do so many employers use a 3-minute typing test?',
        a: 'Recruiters favor three minutes because it filters out lucky bursts and demonstrates realistic, repeatable productivity without taking up excessive interview time.',
      },
      {
        q: 'What typing speed should I target for an employment screening test?',
        a: 'Aiming for 45 to 55 Net WPM with at least 95 percent accuracy meets or exceeds the requirements of most corporate hiring standards.',
      },
      {
        q: 'How can I avoid mental fatigue during a 3-minute typing exam?',
        a: 'Sit upright with your feet flat on the floor and keep your elbows at ninety degrees. Relaxing your hands between sentences prevents finger stiffness.',
      },
    ],
  },
  '/typing-test/5-minute/': {
    path: '/typing-test/5-minute/',
    seconds: 300,
    label: '5 Minute',
    directAnswer:
      'A good score on a 5-minute typing test is 35 to 48 WPM with 95 percent or better accuracy. Over three hundred seconds of continuous input, fatigue sets in, making sustained precision much more difficult. Achieving over 60 Net WPM indicates exceptional clerical and data-entry readiness.',
    whoUsesIt:
      'The five-minute typing test is the standard benchmark required by government agencies, civil service commissions, and large data-processing enterprises. Civil service applicants preparing for state entrance tests, court reporting programs, and municipal clerkships routinely practice with 5-minute passages to build the stamina necessary for official testing days. Legal offices and medical documentation companies also rely on 5-minute certifications to ensure applicants can transcribe complex records accurately without slowing down. It is the definitive trial for verifying professional keyboard durability.',
    scoreNotes:
      'On a five-minute test, physical fatigue often causes a noticeable decline in speed during the fourth and fifth minutes. Errors tend to compound as fingers tire, which severely drags down Net WPM. Maintaining a relaxed hand posture and taking steady breaths helps prevent muscle tightness from sabotaging your final score.',
    faqs: [
      {
        q: 'Why is a 5-minute typing test harder than a 1-minute test?',
        a: 'Maintaining continuous concentration for five full minutes tests mental stamina and muscular endurance. Small inaccuracies accumulate over time, making high accuracy much harder to sustain.',
      },
      {
        q: 'What is the standard passing score for government 5-minute typing tests?',
        a: 'Most public sector clerk exams require between 30 and 40 Net WPM in English with a strict error penalty ceiling, typically allowing no more than 5 percent mistakes.',
      },
      {
        q: 'How should I train to improve my 5-minute endurance?',
        a: 'Build up gradually by completing daily two-minute and three-minute sessions. Pay close attention to ergonomic chair height and wrist support to eliminate unnecessary muscle fatigue.',
      },
    ],
  },
  '/typing-test/10-minute/': {
    path: '/typing-test/10-minute/',
    seconds: 600,
    label: '10 Minute',
    directAnswer:
      'A good score on a 10-minute typing test is between 32 and 45 Net WPM with an accuracy rate of 95 percent or higher. Because ten minutes represents an extreme test of sustained concentration, scores above 55 WPM qualify candidates for specialized court reporting and competitive civil service posts.',
    whoUsesIt:
      'The ten-minute typing test is the official standard for major Indian government examinations, including the Staff Selection Commission (SSC CHSL and CGL DEST), state high court typist recruitments, and railway board skill tests. It is also required for professional stenographers and real-time captioners worldwide. Candidates must demonstrate continuous focus across thousands of key depressions without losing accuracy as fatigue peaks. Practicing full ten-minute sessions trains typists to manage examination anxiety, regulate hand temperature, and maintain strict accuracy under formal time constraints.',
    scoreNotes:
      'In a ten-minute examination, stamina and emotional discipline dictate the outcome. Many candidates start too aggressively and suffer severe speed degradation halfway through the test. The secret to a passing score is disciplined, steady execution from the opening sentence to the final keystroke, ensuring zero panic when errors occur.',
    faqs: [
      {
        q: 'Which competitive exams require a 10-minute typing test?',
        a: 'The SSC CHSL typing test, SSC CGL DEST, CPCT, High Court clerkships, and numerous state public service exams use 10-minute or 15-minute formats.',
      },
      {
        q: 'How do mistakes affect scores in a 10-minute test?',
        a: 'In government examinations, mistakes are categorized as full or half errors. Exceeding the permissible error threshold (usually 5% to 7%) results in automatic disqualification regardless of speed.',
      },
      {
        q: 'What strategies prevent hand cramps during a 10-minute typing test?',
        a: 'Keep your wrists elevated off the desk surface, avoid bottoming out keys with excessive force, and gently shake out your hands during brief natural pauses between paragraphs.',
      },
    ],
  },
};

export const ALL_DURATION_PATHS = [
  { path: '/typing-test/30-second/', label: '30 second typing test', seconds: 30 },
  { path: '/typing-test/1-minute/', label: '1 minute typing test', seconds: 60 },
  { path: '/typing-test/2-minute/', label: '2 minute typing test', seconds: 120 },
  { path: '/typing-test/3-minute/', label: '3 minute typing test', seconds: 180 },
  { path: '/typing-test/5-minute/', label: '5 minute typing test', seconds: 300 },
  { path: '/typing-test/10-minute/', label: '10 minute typing test', seconds: 600 },
];
