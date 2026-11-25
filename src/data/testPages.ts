export interface TestLanding {
  slug: string; // 'ssc-cgl' -> /typing-test/ssc-cgl/
  title: string;
  description: string;
  h1: string;
  breadcrumb: string;
  preset: {
    durationSec: number;
    mode: 'words' | 'paragraph' | 'numbers' | 'numpad' | 'code' | 'hindi';
    difficulty?: 'easy' | 'medium' | 'hard';
    scoring?: 'standard' | 'ssc-cgl' | 'ssc-chsl' | 'kdph' | 'kph';
    customText?: string;
    withPunctuation?: boolean;
    withNumbers?: boolean;
  };
  directAnswer: string; // 40–60 words
  rulesTable?: { label: string; value: string }[];
  officialSource?: { label: string; url: string }; // required for exam pages
  sections: { h2: string; body: string }[]; // total >= 600 unique words
  faqs: { q: string; a: string }[]; // 3–5
  related: string[]; // 3–6 slugs
}

export const TEST_LANDINGS: TestLanding[] = [
  {
    slug: 'ssc-cgl',
    title: 'SSC CGL Typing Test (DEST) Online – Free Mock Simulator',
    description:
      'Practice official SSC CGL Tier 2 DEST typing test online. 2,000 keystrokes in 15 minutes, official error calculation rules, and instant pass/fail evaluation.',
    h1: 'SSC CGL Typing Test (DEST) Online',
    breadcrumb: 'SSC CGL DEST',
    preset: {
      durationSec: 900,
      mode: 'paragraph',
      difficulty: 'medium',
      scoring: 'ssc-cgl',
      customText:
        'The economic modernization of a developing democracy depends fundamentally upon the precision, transparency, and computational efficiency of its civil service administration. Over the past twenty years, public delivery mechanisms have transitioned from physical ledger systems to distributed digital platforms, ensuring that government services reach citizens with minimal bureaucratic delay and absolute accountability. Executive officers, tax inspectors, and audit assistants carry the solemn constitutional duty of maintaining flawless accuracy across legislative registers, judicial filings, and fiscal accounts. In governmental operations, typographical precision is far more than an operational convenience; it represents the essential guardian of legal clarity and procedural justice. An uncorrected numerical error, misplaced decimal separator, or omitted statutory clause can alter legal entitlements and compromise national revenue collection. Consequently, competitive examinations conduct rigorous Data Entry Speed Tests to verify that candidates maintain sustained concentration and rapid keystroke fluency under timed pressure. Aspirants must train with disciplined touch-typing techniques, maintaining steady finger cadence across the home row and resisting the temptation to visually inspect physical keyboard switches.',
    },
    directAnswer:
      'The SSC CGL Tier-2 Data Entry Speed Test (DEST) requires candidates to type a 2,000-keystroke English passage within 15 minutes, equivalent to approximately 26.67 words per minute or 8,000 Key Depressions Per Hour (KDPH). Candidates in unreserved categories are permitted a maximum mistake threshold of 7%, while reserved categories are allowed up to 10%.',
    rulesTable: [
      { label: 'Exam Duration', value: '15 Minutes (900 Seconds)' },
      { label: 'Required Volume', value: '2,000 Key Depressions (approx. 400 words)' },
      { label: 'Speed Benchmark', value: '8,000 KDPH (~26.67 net WPM)' },
      { label: 'Permissible Error (UR)', value: '7% Maximum Mistake Ratio' },
      { label: 'Permissible Error (OBC/SC/ST/EWS)', value: '10% Maximum Mistake Ratio' },
      { label: 'Evaluation Standard', value: 'Qualifying Only (Mandatory for all Tier-2 posts)' },
      { label: 'Allowed Navigation', value: 'Arrow keys and Backspace fully permitted' },
    ],
    officialSource: {
      label: 'Staff Selection Commission Official Notice (ssc.gov.in)',
      url: 'https://ssc.gov.in',
    },
    sections: [
      {
        h2: 'SSC CGL DEST Exam Environment & Interface Mechanics',
        body: 'The Staff Selection Commission conducts the DEST module on designated desktop personal computers equipped with standard physical membrane keyboards. The computer display is split horizontally into two distinct sections: the upper view pane presents the official master text passage, while the lower active workspace receives the candidate keystrokes. Copying and pasting functionalities are disabled within the official testing engine, and automated spell-checking tools are suppressed. Candidates can freely navigate back and forth using keyboard arrow keys or mouse scroll wheels to review previously typed sentences. Unlike casual typing test websites where completed words disappear from view, the SSC examination interface retains your entire draft visible throughout the full 15 minutes, allowing you to proofread thoroughly before time runs out.',
      },
      {
        h2: 'Official Mistake Rubric: Full Errors vs Half Errors',
        body: 'The Commission applies an explicit mathematical rubric to grade candidate transcripts. A Full Mistake (1.0 point deduction) is charged whenever an entire word from the master passage is omitted, an extraneous non-existent word is added, or a master term is replaced with an erroneous word. A Half Mistake (0.5 point deduction) is logged for capitalization errors (such as entering lowercase letters for proper nouns like "India"), incorrect punctuation marks, or improper spacing between words. The cumulative mistake score is divided by the total number of words in the master passage to determine your final percentage error. For unreserved candidates, any error percentage exceeding 7.00% results in immediate disqualification from all Tier-2 ministerial and departmental posts.',
      },
      {
        h2: 'Strategic Preparation Routine to Clear the 7% Threshold',
        body: 'Because 26.67 WPM is a modest typing speed, the primary hurdle in CGL DEST is nervous fatigue and careless typographical errors rather than velocity. Candidates should establish two dedicated thirty-minute daily practice sessions focusing strictly on official socio-economic and administrative texts. Keep your wrists comfortably elevated above the desk surface to avoid tendon fatigue, and maintain visual contact solely with the master text on screen. Strive to finish your initial transcript within 12 minutes, leaving the final 3 minutes available for methodical backspacing and error correction. Training on multiple keyboards with varying switch resistances prepares your fingers for hardware differences at regional testing facilities.',
      },
      {
        h2: 'Keyboard Hardware & Exam Hall Ergonomics',
        body: 'Testing centers allocated by the Commission frequently feature older membrane desktop keyboards that have experienced extensive student use. The keys may feel stiffer or have slightly uneven travel depth compared to modern laptop switches. During the initial trial warm-up period provided at the test center, rigorously test every key—especially the space bar, backspace, and shift keys. If any switch exhibits sticking or fails to register key depressions cleanly, immediately notify the test invigilator and request a replacement workstation before the formal examination begins.',
      },
    ],
    faqs: [
      {
        q: 'Is backspace permitted during the SSC CGL DEST typing test?',
        a: 'Yes, backspace and arrow navigation keys are fully operational throughout the official 15-minute examination. You can move freely to rectify typos before final submission.',
      },
      {
        q: 'What happens if I type less than 2,000 keystrokes in CGL Tier 2?',
        a: 'Failing to complete the full passage results in heavy omission penalties. Each missing word is scored as a full mistake, which quickly pushes your error percentage past the 7% disqualification ceiling.',
      },
      {
        q: 'Is DEST mandatory for all SSC CGL posts?',
        a: 'Yes. In the revised SSC CGL examination scheme, the Data Entry Speed Test is compulsory for all candidates qualifying for Tier-2, regardless of whether their specific department requires data entry.',
      },
      {
        q: 'What font and keyboard layout are used for CGL English typing?',
        a: 'The test uses standard Arial or Times New Roman system fonts on the standard English US QWERTY keyboard layout.',
      },
    ],
    related: ['ssc-chsl', 'data-entry', 'for-jobs', '10-key'],
  },
  {
    slug: 'ssc-chsl',
    title: 'SSC CHSL Typing Test Online – Free LDC & PA/SA Simulator',
    description:
      'Practice the official 10-minute SSC CHSL typing skill test. English 35 WPM / Hindi 30 WPM benchmark simulator with live KDPH tracking and mistake breakdown.',
    h1: 'SSC CHSL Typing Test Online',
    breadcrumb: 'SSC CHSL Test',
    preset: {
      durationSec: 600,
      mode: 'paragraph',
      difficulty: 'medium',
      scoring: 'ssc-chsl',
      customText:
        'Modern parliamentary democracy requires prompt, meticulous, and error-free administrative processing of ministerial records and public grievances. Clerical personnel serving across central ministries, subordinate directorates, and autonomous statutory commissions function as the indispensable operational link between legislative policy and ground execution. The Staff Selection Commission enforces a mandatory qualifying typing benchmark of thirty-five words per minute in English, corresponding to ten thousand five hundred key depressions per hour, to confirm that clerical aspirants possess the cognitive composure and keystroke velocity required for high-volume documentation duties. While swift finger movement is helpful, the evaluation rubric severely penalizes uncorrected omissions, erroneous substitutions, and punctuation irregularities. Aspirants are strongly advised to develop disciplined touch-typing habits, prioritizing accuracy above ninety-six percent before attempting to force maximum velocity. Consistent daily practice with formal governmental prose remains the single most dependable method to conquer examination nervousness and secure administrative employment.',
    },
    directAnswer:
      'The SSC CHSL (Combined Higher Secondary Level) typing assessment mandates a qualifying speed of 35 words per minute in English (10,500 KDPH) or 30 words per minute in Hindi (9,000 KDPH) over a 10-minute session. Unreserved candidates must maintain an error margin at or below 7% to qualify for Lower Division Clerk (LDC) and Junior Secretariat Assistant (JSA) posts.',
    rulesTable: [
      { label: 'Exam Duration', value: '10 Minutes (600 Seconds)' },
      { label: 'English Speed Benchmark', value: '35 WPM (10,500 Key Depressions Per Hour)' },
      { label: 'Hindi Speed Benchmark', value: '30 WPM (9,000 Key Depressions Per Hour)' },
      { label: 'Allowed Mistake (UR)', value: '7% Maximum Permissible Error' },
      { label: 'Allowed Mistake (Reserved)', value: '10% Maximum Permissible Error' },
      { label: 'Total Keystrokes Expected', value: '1,750 Keystrokes in 10 Minutes' },
      { label: 'Target Posts', value: 'LDC, JSA, Postal Assistant, Sorting Assistant' },
    ],
    officialSource: {
      label: 'Staff Selection Commission CHSL Guidelines',
      url: 'https://ssc.gov.in',
    },
    sections: [
      {
        h2: 'SSC CHSL Typing Speed Standards for LDC and JSA Posts',
        body: 'The CHSL skill test evaluates practical typing proficiency for candidates appointed to clerical positions across India. English-medium examinees are provided a passage containing approximately 1,750 key depressions, requiring a net speed of 35 WPM over ten minutes. For candidates who select the Hindi medium during registration, the requirement is 30 WPM (1,500 keystrokes) on computers configured with Mangal Unicode fonts in either InScript or Remington Gail layouts. Meeting the typing threshold is strictly qualifying in nature; it does not add points to your written merit rank, but failing disqualifies you from job appointment regardless of your written score.',
      },
      {
        h2: 'Managing the 10-Minute Endurance Challenge',
        body: 'Unlike a quick 60-second typing sprint, a 10-minute assessment tests physical stamina and psychological focus. Finger muscles naturally tire after four to five minutes of intense typing, which often leads to erratic keystroke cadence and an influx of accidental typos during the second half of the test. Maintain a steady, moderate pace from the very first sentence. Keep your breathing calm, elevate your wrists slightly off the table edge to prevent median nerve compression, and do not panic if you hear neighboring examinees typing loudly around you in the testing hall.',
      },
      {
        h2: 'Itemized Error Breakdown and Scoring Methodology',
        body: 'The SSC CHSL grading software measures errors by comparing the submitted candidate script against the master text. Omissions of complete words, unwarranted additions, and phonetic substitutions count as full mistakes. Incomplete words, spacing slips between words, and incorrect letter cases count as half mistakes. If an unreserved candidate accumulates more than 7% total mistakes, the candidate fails the evaluation. Training with our simulator helps you visualize your full and half mistakes in real time so you can adjust your typing rhythm before exam day.',
      },
      {
        h2: 'Building a Progressive 30-Day Training Schedule',
        body: 'To reliably surpass the 35 WPM requirement under examination pressure, your practice baseline should reach 42 to 45 WPM in comfortable home conditions. Spend the first 10 days mastering touch-typing accuracy on our free typing lessons, eliminating visual glances at your hands. Dedicate the middle 10 days to timed 5-minute drills using governmental and parliamentary speeches. Spend the final 10 days taking two complete 10-minute mock tests daily under strict exam conditions, ensuring you consistently achieve sub-5% mistake rates.',
      },
    ],
    faqs: [
      {
        q: 'Can I change my typing language from Hindi to English at the exam center?',
        a: 'No. The typing medium is fixed based on your original SSC CHSL application form choice. It cannot be altered at the test venue under any circumstances.',
      },
      {
        q: 'How is Net WPM calculated in the SSC CHSL test?',
        a: 'Net WPM is calculated as Gross WPM minus penalties for uncorrected mistakes over the 10-minute duration. Total key depressions divided by 5 yields words, which is then divided by 10 minutes.',
      },
      {
        q: 'Is the SSC CHSL typing test conducted on a computer or typewriter?',
        a: 'All SSC typing tests are conducted exclusively on standard desktop personal computers. Mechanical typewriters are no longer used.',
      },
      {
        q: 'What is the best way to prepare for the 10-minute duration?',
        a: 'Practice with full 10-minute timed passages at least twice daily. Prioritize achieving 97% accuracy over raw speed, as eliminating error deductions is the key to qualifying.',
      },
    ],
    related: ['ssc-cgl', 'data-entry', 'hindi', 'for-jobs'],
  },
  {
    slug: '10-key',
    title: '10 Key Typing Test – Free Numeric Keypad (KPH) Speed Test',
    description:
      'Test your 10-key numeric keypad speed and accuracy in Keystrokes Per Hour (KPH). Practice numbers-only data entry drills with instant KPH scoring.',
    h1: '10 Key Typing Test (Numeric Keypad)',
    breadcrumb: '10 Key Test',
    preset: {
      durationSec: 60,
      mode: 'numpad',
      difficulty: 'medium',
      scoring: 'kph',
      customText:
        '4829 1058 3920 4819 5729 8492 1029 3847 5920 1849 5028 4910 2948 5819 4028 1948 2049 5820 1948 3029 4819 2048 5920 1948 3029 4819 2048 5920 1948 3029 7492 8301 9284 6103 8472 9102 7394 8201 6482 7193 8392 7481 9204 8391 7204 8392 9182 7391 8492 9102 8394 7291 8492 9103 8492 7301 8492 9102 8492 7391',
    },
    directAnswer:
      'A 10-key typing test evaluates numeric keypad data entry speed measured in Keystrokes Per Hour (KPH). An average 10-key speed is 8,000 to 9,000 KPH (roughly 130 to 150 digits per minute), while professional data entry, accounting, and banking benchmarks demand 10,000 to 12,000+ KPH with 99% numeric accuracy.',
    rulesTable: [
      { label: 'Measurement Metric', value: 'Keystrokes Per Hour (KPH)' },
      { label: 'Standard Test Duration', value: '1 Minute, 2 Minutes, or 3 Minutes' },
      { label: 'Entry Level Benchmark', value: '8,000 KPH (~133 digits/minute)' },
      { label: 'Professional Benchmark', value: '10,000+ KPH (~167 digits/minute)' },
      { label: 'Elite Speed Benchmark', value: '12,000+ KPH (~200 digits/minute)' },
      { label: 'Primary Anchor Key', value: 'Tactile bump on the 5 key (Middle Finger)' },
      { label: 'Target Accuracy', value: '99% Minimum (Zero tolerance for fiscal error)' },
    ],
    sections: [
      {
        h2: 'Understanding 10-Key Numpad Ergonomics & Hand Placement',
        body: 'The dedicated numeric keypad on desktop keyboards organizes digits in a geometric 3x3 grid with zero resting below. Proper 10-key technique anchors your right hand over the middle row: your right index finger rests on 4, your middle finger anchors on the tactile raised nub on 5, and your ring finger covers 6. Your thumb operates 0 and the double-zero key, while your little finger controls the decimal point and Enter key. Keeping your wrist neutral and curling your fingers gently into a relaxed dome shape prevents forearm fatigue during long inventory sessions.',
      },
      {
        h2: 'Converting KPH to WPM for Numeric Data Entry',
        body: 'While standard typing is recorded in Words Per Minute, numeric entry is recorded in Keystrokes Per Hour because single numerical figures do not form multi-letter linguistic words. To convert between the two metrics: divide your hourly KPH score by 60 to calculate keystrokes per minute, then divide by 5 to find the rough WPM equivalent. An operator typing at 10,000 KPH presses approximately 166.7 digits per minute, which equals roughly 33.3 standard typing words per minute.',
      },
      {
        h2: 'Eliminating Miskeys on Financial and Inventory Data',
        body: 'In accounting, bookkeeping, medical billing, and retail inventory management, a single mis-keyed digit can cause massive balance sheet discrepancies. Professional 10-key operators prioritize rhythm over frantic speed. Train yourself never to look down from the invoice sheet to the physical numpad. Build blind muscle memory for the diagonal reaches from 5 up to 8 and down to 2, ensuring that every actuation is confirmed by tactile switch feedback rather than visual confirmation.',
      },
      {
        h2: 'Standard Industry Hiring Cutoffs for 10-Key Tests',
        body: 'Commercial banks, distribution fulfillment centers, corporate billing departments, and municipal auditing offices frequently test applicant keypad proficiency before extending employment offers. An entry-level warehouse inventory clerk or receiving associate is expected to achieve 7,500 to 8,000 KPH, whereas accounts receivable specialists, payroll processors, and bank tellers must reliably exceed 10,000 KPH with fewer than two errors per voucher batch. Elite administrative transcribers often achieve 12,000 to 14,000 KPH during high-volume end-of-month financial reconciliation cycles.',
      },
      {
        h2: '5-Minute Warm-Up Drill for Faster Numpad Navigation',
        body: 'Before beginning any formal numeric test, spend five minutes running ascending and descending triad sequences (such as 1-2-3, 4-5-6, 7-8-9, and 9-8-7). Maintaining a continuous rhythmic tempo without pausing at the end of each digit cluster trains finger fluidity and eliminates muscular stiffness in the hand.',
      },
    ],
    faqs: [
      {
        q: 'What is considered a good 10-key speed for job applications?',
        a: 'A score of 10,000 KPH with at least 98% accuracy is the standard hiring threshold for bank tellers, bookkeeping clerks, and data entry specialists.',
      },
      {
        q: 'Can I take a 10-key test on a laptop without a dedicated numpad?',
        a: 'We strongly recommend connecting a full-sized external keyboard with a physical 10-key numeric cluster, as top-row number keys do not measure numpad proficiency.',
      },
      {
        q: 'How is 10-key accuracy calculated?',
        a: 'Accuracy represents the percentage of correct digits entered out of total keystrokes. Typing 150 digits with 3 errors yields a 98% accuracy score.',
      },
      {
        q: 'Why does the 5 key have a small bump on it?',
        a: 'The physical ridge on the 5 key serves as the tactile home anchor for your middle finger, allowing you to position your hand blindly without looking down.',
      },
    ],
    related: ['data-entry', 'for-jobs', 'ssc-cgl', 'ssc-chsl'],
  },
  {
    slug: 'data-entry',
    title: 'Data Entry Typing Test – Practice Mixed Alphanumeric WPM',
    description:
      'Practice data entry typing tests with mixed alphanumeric text: street addresses, postal codes, and currency amounts. Instant WPM and error tracking.',
    h1: 'Data Entry Typing Test',
    breadcrumb: 'Data Entry Test',
    preset: {
      durationSec: 180,
      mode: 'paragraph',
      difficulty: 'hard',
      scoring: 'standard',
      withNumbers: true,
      withPunctuation: true,
      customText:
        'Invoice #48291 Order Date: 14/11/2026 Customer: Johnathan Miller Address: 742 Evergreen Terrace Springfield IL 62704 Phone: (217) 555-0192 Part #AX-902-B Quantity: 45 Unit Price: $32.50 Total: $1,462.50 Account: #8849-2018 Payment: MasterCard Exp: 08/29 Status: Verified Approved Shipping: Priority Express Tracking: 1Z9999999999999999 Notes: Deliver to rear loading dock before 5:00 PM.',
    },
    directAnswer:
      'Data entry typing tests evaluate your ability to transcribe mixed alphanumeric content—including addresses, invoice serial numbers, phone numbers, and currency values—rapidly and without errors. Most data entry job positions require between 50 and 65 net words per minute with an accuracy threshold of at least 98%.',
    rulesTable: [
      { label: 'Target Hiring Speed', value: '50 – 65 Net Words Per Minute (WPM)' },
      { label: 'Minimum Accuracy Floor', value: '98% – 99% Required' },
      { label: 'Passage Characteristics', value: 'Mixed Alphanumeric, Postal Codes, Currency, Symbols' },
      { label: 'Assessment Length', value: '3 to 5 Minutes' },
      { label: 'Common Employment Sectors', value: 'Healthcare, Logistics, Insurance, Banking, Public Sector' },
    ],
    sections: [
      {
        h2: 'The Anatomy of a Professional Data Entry Assessment',
        body: 'Standard prose typing tests evaluate continuous vocabulary sentences, but real-world data entry involves transcribing structured databases containing proper nouns, alphanumeric part numbers, postal zip codes, and fiscal amounts. Typing alphanumeric content forces your hands to frequently reach up to the top number row and activate modifier keys (Shift, Dollar Sign, Hash, Hyphens). These abrupt shifts disrupt standard typing cadence and dramatically increase error rates among typists who only practice simple lowercase prose.',
      },
      {
        h2: 'Why Alphanumeric Speed Differs From Prose Speed',
        body: 'Even an advanced 80 WPM typist often experiences their speed dropping to 50 to 55 WPM when tested on mixed alphanumeric data entry. The cognitive processing involved in checking punctuation combinations, telephone formats, and capitalization cannot rely on linguistic predictive text intuition. Every character must be read, verified, and struck with conscious discipline. To maintain high throughput, practice shifting your eyes two words ahead of your active keystrokes, feeding your fingers a steady queue of characters.',
      },
      {
        h2: 'Techniques for Eliminating Errors in Alphanumeric Fields',
        body: 'When transcribing invoices, billing records, medical charts, or customer databases, errors carry heavy business and compliance costs. Avoid rushing through long serial numbers; instead, group digits mentally into familiar 3-digit or 4-digit chunks, identical to how you memorize phone numbers. Keep your palms slightly elevated to give your fingers maximum vertical reach toward the top number row without dragging across lower keys. Regular 10-minute drills with randomized addresses dramatically sharpen hand-eye coordination.',
      },
      {
        h2: 'Preparing for Employer Data Entry Screenings',
        body: 'Before attending a corporate data entry evaluation, practice typing mixed text for at least 15 minutes daily. Familiarize yourself with standard symbols like ampersands, asterisks, brackets, and colons. Developing confident finger reaches for these symbols eliminates the hesitation pauses that reduce overall WPM scores during formal job candidate assessments. Consistent daily practice ensures that you easily exceed the minimum 98% accuracy threshold.',
      },
      {
        h2: 'Database Verification and Record Transcribing Workflow',
        body: 'Professional data clerks work across enterprise databases, enterprise resource planning (ERP) suites, electronic medical records (EMR), and financial accounting spreadsheets. Maintaining high productivity requires coordinating keyboard navigation shortcuts—such as Tab, Shift-Tab, Page Down, and Enter—to move seamlessly across table cells without touching the mouse. Mastering these keyboard shortcuts saves hundreds of cumulative seconds during lengthy clerical audits, letting you focus entirely on transcriptional accuracy.',
      },
    ],
    faqs: [
      {
        q: 'What is a good score on a data entry typing test?',
        a: 'A score of 55 to 65 WPM with 98% or higher accuracy is considered strong and qualifies for most corporate and administrative data entry roles.',
      },
      {
        q: 'Why is accuracy more important than speed in data entry?',
        a: 'An error in a customer address, social security number, or financial ledger entry can lead to lost deliveries, legal non-compliance, and costly database rollbacks.',
      },
      {
        q: 'How should I practice typing numbers and symbols quickly?',
        a: 'Use our targeted numbers and symbols practice drills, which isolate top-row reaches and train muscle memory for shifted symbols like @, #, $, and &.',
      },
      {
        q: 'Do employers verify data entry certificates?',
        a: 'Yes. Many recruitment platforms and hiring agencies ask candidates to submit a verified typing certificate demonstrating sustained accuracy over a 3-minute or 5-minute test.',
      },
    ],
    related: ['10-key', 'for-jobs', 'ssc-cgl', 'ssc-chsl'],
  },
  {
    slug: 'for-jobs',
    title: 'Typing Test for Jobs – Pre-Employment Speed & Accuracy Test',
    description:
      'Prepare for workplace hiring assessments with our 3-minute pre-employment typing test. Check WPM benchmarks for administrative and clerical roles.',
    h1: 'Typing Test for Jobs',
    breadcrumb: 'Job Typing Test',
    preset: {
      durationSec: 180,
      mode: 'paragraph',
      difficulty: 'medium',
      scoring: 'standard',
      customText:
        'Professional workplace communication requires clear expression, rapid turnaround times, and consistent accuracy across all digital documentation. Whether preparing executive briefs, responding to urgent client communications, or updating internal enterprise databases, competent keyboard skills represent a fundamental prerequisite for modern career success. Corporate recruiters and human resource specialists utilize pre-employment typing screenings to filter applicant pools efficiently. Demonstrating a sustained speed of fifty words per minute with ninety-five percent accuracy assures employers that you possess the technical fluidity necessary to handle high-volume administrative responsibilities without creating cognitive friction or typographical bottlenecks.',
    },
    directAnswer:
      'Most pre-employment typing tests for office, clerical, and customer support roles require candidates to take a 3-minute or 5-minute timed typing test. The standard hiring cut-off is 40 to 50 words per minute with 95% accuracy, while legal, executive, and specialized administrative roles often require 60 to 75 WPM.',
    rulesTable: [
      { label: 'General Office Cut-off', value: '40 – 45 WPM (95% Accuracy)' },
      { label: 'Administrative & Secretarial', value: '50 – 60 WPM (97% Accuracy)' },
      { label: 'Customer Support / Live Chat', value: '55 – 65 WPM (95% Accuracy)' },
      { label: 'Legal & Medical Transcription', value: '70 – 85+ WPM (99% Accuracy)' },
      { label: 'Recommended Test Length', value: '3 Minutes (Official Employer Standard)' },
      { label: 'Verified Certificate', value: 'Available upon completing test with 90%+ accuracy' },
    ],
    sections: [
      {
        h2: 'What Employers Look for in Pre-Employment Typing Assessments',
        body: 'During corporate recruitment, employers administer typing tests not just to measure raw keyboard speed, but to evaluate your composure under timed evaluation constraints. A candidate who types at 50 WPM with 98% accuracy is consistently favored over one who types at 75 WPM with 88% accuracy, because correcting sloppy errors wastes valuable supervisory time. Employers look for steady cadence, clean punctuation, and low backspacing frequency.',
      },
      {
        h2: 'Overcoming Test Anxiety During Timed Job Screenings',
        body: 'It is completely normal to experience an adrenaline spike when taking a job screening test. Test anxiety causes shallow breathing, cold fingers, and involuntary muscle tension in the shoulders and wrists. Before starting your test, take three slow deep breaths and shake out your hands to promote blood circulation. During the first thirty seconds of the test, deliberately type slightly below your top speed to lock in clean rhythm and build psychological confidence.',
      },
      {
        h2: 'How to Showcase Your Typing Speed on Resumes & LinkedIn',
        body: 'Including your typing speed on your resume can give you a tangible competitive edge for clerical, customer service, and administrative openings. State your Net WPM, accuracy percentage, and test duration prominently under your Core Skills or Technical Competencies section—for example: "Touch Typing: 65 Net WPM with 98% Accuracy (Verified 3-Minute Test)". You can also attach our verified typing certificate link directly to your LinkedIn profile.',
      },
      {
        h2: 'Industry Specific Speed Thresholds and Standards',
        body: 'Different industries maintain varied standards for typing performance. While general office roles accept 45 WPM, medical transcriptionists, paralegals, and legal secretaries face strict 70+ WPM benchmarks with near-zero error tolerances. Live customer chat agents require 60 WPM to handle multiple simultaneous user conversations effectively without delayed response times. Software engineers benefit from 50 to 65 WPM when rapidly prototyping code logic or participating in collaborative pair programming sprints.',
      },
      {
        h2: 'Optimizing Typing Posture for Extended Workdays',
        body: 'To avoid repetitive strain injuries (RSI) and wrist fatigue during 8-hour clerical shifts, maintain an upright seated posture with feet planted flat on the floor and lumbar support firmly engaged. Position your display directly at eye level and keep your keyboard centered relative to your body. Relaxed shoulders and elevated wrists ensure sustained typing comfort throughout the entire workday, preventing midday speed slowdowns.',
      },
    ],
    faqs: [
      {
        q: 'What is the average typing speed required for office jobs?',
        a: 'The standard minimum prerequisite for general administrative and clerical positions is 40 to 50 Net WPM with at least 95% accuracy.',
      },
      {
        q: 'How long are pre-employment typing tests usually?',
        a: 'Most employer screening platforms use 3-minute or 5-minute evaluations to measure true sustained speed rather than short burst speed.',
      },
      {
        q: 'Can I get a verified certificate to show employers?',
        a: 'Yes. After completing a 3-minute test with at least 90% accuracy, you can generate a free verified certificate with a unique validation code and LinkedIn share link.',
      },
      {
        q: 'Does backspace penalize my score during job tests?',
        a: 'Backspace itself does not subtract points, but pressing backspace multiple times consumes valuable seconds that could be spent advancing through the text.',
      },
    ],
    related: ['data-entry', '10-key', 'ssc-cgl', 'ssc-chsl'],
  },
  {
    slug: 'hindi',
    title: 'Hindi Typing Test (Mangal – InScript & Remington Gail) Online',
    description:
      'Free online Hindi typing test in Mangal font. Practice InScript and Remington Gail layouts for SSC, CPCT, High Court, and state government exams.',
    h1: 'Hindi Typing Test (Mangal – InScript & Remington Gail)',
    breadcrumb: 'Hindi Test',
    preset: {
      durationSec: 600,
      mode: 'hindi',
      difficulty: 'medium',
      scoring: 'kdph',
      customText:
        'भारत एक विशाल और समृद्ध ऐतिहासिक विरासत वाला महान राष्ट्र है। यहाँ विभिन्न संस्कृतियों, भाषाओं, परंपराओं और भौगोलिक विविधताओं का अद्भुत संगम देखने को मिलता है। आधुनिक सूचना प्रौद्योगिकी के युग में डिजिटल साक्षरता और कंप्यूटर दक्षता प्रत्येक नागरिक तथा कर्मचारी के लिए एक अत्यंत आवश्यक कौशल बन चुकी है। सरकारी कार्यालयों और सार्वजनिक उपक्रमों में देवनागरी लिपि के माध्यम से आधिकारिक कार्य संपादन करने हेतु गति और सटीकता के साथ हिंदी टंकण का अभ्यास करना अत्यंत लाभदायक सिद्ध होता है। नियमित और अनुशासित अभ्यास से टंकण की गति में निरंतर सुधार किया जा सकता है।',
    },
    directAnswer:
      'The Hindi typing test measures words per minute in the Devanagari script, primarily utilized for Indian central and state government recruitment exams including SSC, State High Courts, CPCT, and Police services. The standard qualifying benchmark is 30 WPM (9,000 KDPH) in Mangal font using either the InScript or Remington Gail keyboard layout.',
    rulesTable: [
      { label: 'Qualifying Speed Benchmark', value: '30 Words Per Minute (9,000 KDPH)' },
      { label: 'Standard Font Family', value: 'Mangal (Unicode Compatible Font)' },
      { label: 'Primary Keyboard Layouts', value: 'InScript & Remington Gail (Krutidev keymap on Unicode)' },
      { label: 'Standard Exam Duration', value: '10 to 15 Minutes' },
      { label: 'Permissible Error Ceiling', value: '7% for UR | 10% for Reserved Categories' },
      { label: 'Common Government Exams', value: 'SSC CHSL, UPSSSC, MP CPCT, Rajasthan High Court' },
    ],
    sections: [
      {
        h2: 'InScript vs Remington Gail Layout Differences',
        body: 'Government examinations in India typically offer examinees a choice between two primary Hindi keyboard layouts. The InScript layout is the official national standard designed by the Department of Electronics. It follows a phonetic logic where vowels are grouped on the left hand and consonants on the right hand, making it extremely ergonomic for touch typists. Remington Gail mimics the vintage mechanical typewriter layout using the legacy Kruti Dev keymapping mapped onto modern Unicode Mangal fonts. Candidates transitioning from typewriters usually favor Remington Gail, while younger students learn InScript faster.',
      },
      {
        h2: 'Official Government Hindi Typing Guidelines & Standards',
        body: 'Under official government recruitment norms, Hindi typing speed is calculated based on 1 word = 5 characters. A benchmark speed of 30 WPM requires generating 150 correct key depressions per minute (9,000 Key Depressions Per Hour). In exams like SSC CHSL and State High Court stenography, examinees must produce error-free matras, half-letters (halant combinations), and conjuncts. Missing a virama or mistyping a conjunct letter like ksha or tra is heavily penalized under the official scoring rubric.',
      },
      {
        h2: 'Mastering Devanagari Matras and Complex Conjuncts',
        body: 'The primary challenge for Hindi typing learners is handling matras and conjuncts. In InScript, typing a half-letter requires pressing the consonant followed by the Halant (D key), followed immediately by the subsequent consonant. Train your fingers to treat these multi-key combinations as unified phonetic chords rather than disparate individual keys. Maintaining a steady practice regimen of fifteen minutes daily helps you master complex conjuncts without hesitating during official timed exams.',
      },
      {
        h2: 'Overcoming Common Input Method Issues on Exam Day',
        body: 'At state and central testing venues, examinees must verify that the language input bar is configured to Hindi Mangal before the timer starts. Check that the NumLock key is active if utilizing special Alt-code combinations. Practicing with our online Hindi simulator ensures that your keystroke rhythms remain steady, avoiding cognitive hesitation during official testing sessions.',
      },
      {
        h2: 'Speed Conversion Table: Hindi WPM to Key Depressions (KDPH)',
        body: 'In Indian government recruitment, typing criteria are defined in either Words Per Minute or Key Depressions Per Hour. A speed of 25 WPM corresponds to 7,500 KDPH, 30 WPM equals 9,000 KDPH, and 35 WPM equals 10,500 KDPH. Each word is calculated based on five keystrokes, meaning every matra, consonant, space, and halant counts toward your aggregate key depressions score.',
      },
    ],
    faqs: [
      {
        q: 'Which font is used for government Hindi typing tests?',
        a: 'The official font for almost all central and state government typing tests is Mangal, a standardized Unicode font accepted by SSC, CPCT, and High Courts.',
      },
      {
        q: 'Is InScript easier to learn than Remington Gail?',
        a: 'Yes, for new learners InScript is significantly easier because it follows a logical phonetic layout. However, candidates with prior Kruti Dev typewriter training often prefer Remington Gail.',
      },
      {
        q: 'What is the speed requirement for SSC CHSL Hindi typing?',
        a: 'The SSC CHSL Hindi typing benchmark is 30 WPM (9,000 KDPH) over a 10-minute duration with a maximum allowable error rate of 7% for unreserved candidates.',
      },
      {
        q: 'Do I need special software installed to type in Hindi?',
        a: 'No. Our browser test supports Hindi typing directly using standard system input methods without requiring external software downloads.',
      },
    ],
    related: ['ssc-chsl', 'ssc-cgl', 'data-entry', 'for-jobs'],
  },
];

export function getTestLanding(slug: string): TestLanding | undefined {
  return TEST_LANDINGS.find((p) => p.slug === slug);
}
