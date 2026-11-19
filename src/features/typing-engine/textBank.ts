import { TestDifficulty, TestMode } from '../../types';

export const COMMON_WORDS_EASY = [
  'the', 'be', 'of', 'and', 'a', 'to', 'in', 'he', 'have', 'it', 'that', 'for', 'they',
  'with', 'as', 'not', 'on', 'she', 'at', 'by', 'this', 'we', 'you', 'do', 'but', 'his',
  'from', 'they', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would',
  'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go',
  'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people',
  'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
  'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use',
  'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because',
  'any', 'these', 'give', 'day', 'most', 'us', 'great', 'small', 'every', 'hand', 'life',
  'world', 'must', 'home', 'part', 'place', 'made', 'live', 'where', 'after', 'back',
  'little', 'only', 'round', 'man', 'year', 'came', 'show', 'every', 'good', 'give',
];

export const COMMON_WORDS_MEDIUM = [
  ...COMMON_WORDS_EASY,
  'system', 'program', 'computer', 'network', 'keyboard', 'practice', 'accuracy', 'progress',
  'learning', 'language', 'standard', 'sentence', 'duration', 'performance', 'developer',
  'browser', 'document', 'function', 'variable', 'efficient', 'keyboarding', 'consistent',
  'knowledge', 'frequency', 'operation', 'experience', 'technology', 'education', 'challenge',
  'measurement', 'rhythm', 'technique', 'position', 'productive', 'training', 'interface',
  'hardware', 'software', 'connection', 'execution', 'process', 'solution', 'structure',
  'foundation', 'discipline', 'confidence', 'stamina', 'cadence', 'coordinate', 'calculate',
];

export const COMMON_WORDS_HARD = [
  ...COMMON_WORDS_MEDIUM,
  'extraordinary', 'unprecedented', 'deterministic', 'architecture', 'accessibility',
  'infrastructure', 'configuration', 'cryptography', 'monochrome', 'synchronous',
  'asynchronous', 'circumstance', 'distraction', 'optimization', 'transcription',
  'jurisdiction', 'proportional', 'electromagnetic', 'perpendicular', 'sustainability',
  'recommendation', 'implementation', 'comprehension', 'internationalization',
  'interdisciplinary', 'counterintuitive', 'photosynthesis', 'characteristics',
  'notwithstanding', 'unquestionable', 'incompatibility', 'responsiveness', 'philosophical',
];

export interface CuratedQuote {
  quote: string;
  source: string;
  difficulty: TestDifficulty;
}

export const CURATED_QUOTES: CuratedQuote[] = [
  // --- EASY QUOTES (Short, Punchy, 8-18 words) ---
  { quote: 'The only way to do great work is to love what you do.', source: 'Steve Jobs', difficulty: 'easy' },
  { quote: 'Simplicity is prerequisite for reliability.', source: 'Edsger W. Dijkstra', difficulty: 'easy' },
  { quote: 'Talk is cheap. Show me the code.', source: 'Linus Torvalds', difficulty: 'easy' },
  { quote: 'Arise, awake, and stop not till the goal is reached.', source: 'Swami Vivekananda', difficulty: 'easy' },
  { quote: 'The future depends on what you do today.', source: 'Mahatma Gandhi', difficulty: 'easy' },
  { quote: 'It always seems impossible until it is done.', source: 'Nelson Mandela', difficulty: 'easy' },
  { quote: 'Continuous improvement is better than delayed perfection.', source: 'Mark Twain', difficulty: 'easy' },
  { quote: 'Whatever you are, be a good one.', source: 'Abraham Lincoln', difficulty: 'easy' },
  { quote: 'Learning never exhausts the mind.', source: 'Leonardo da Vinci', difficulty: 'easy' },
  { quote: 'Don\'t explain your philosophy. Embody it.', source: 'Epictetus', difficulty: 'easy' },
  { quote: 'Be less curious about people and more curious about ideas.', source: 'Marie Curie', difficulty: 'easy' },
  { quote: 'Practice makes permanent. Accuracy builds effortless speed.', source: 'Typing Fundamentals', difficulty: 'easy' },
  { quote: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', source: 'Mahatma Gandhi', difficulty: 'easy' },
  { quote: 'Believe you can and you are halfway there.', source: 'Theodore Roosevelt', difficulty: 'easy' },
  { quote: 'Waste no more time arguing about what a good person should be. Be one.', source: 'Marcus Aurelius', difficulty: 'easy' },
  { quote: 'Difficulties strengthen the mind, as labor does the body.', source: 'Seneca', difficulty: 'easy' },
  { quote: 'Faith is the bird that feels the light when the dawn is still dark.', source: 'Rabindranath Tagore', difficulty: 'easy' },
  { quote: 'Premature optimization is the root of all evil in programming.', source: 'Donald Knuth', difficulty: 'easy' },
  { quote: 'Make something people want.', source: 'Paul Graham', difficulty: 'easy' },
  { quote: 'It is not in the stars to hold our destiny but in ourselves.', source: 'William Shakespeare', difficulty: 'easy' },
  { quote: 'Forever is composed of nows. Master the keystroke right in front of you.', source: 'Emily Dickinson', difficulty: 'easy' },
  { quote: 'You cannot cross the sea merely by standing and staring at the water.', source: 'Rabindranath Tagore', difficulty: 'easy' },
  { quote: 'A journey of a thousand miles begins with a single step.', source: 'Lao Tzu', difficulty: 'easy' },
  { quote: 'Speed is a byproduct of relaxation and muscle memory.', source: 'Touch Typing Guild', difficulty: 'easy' },
  { quote: 'Keep your eyes on the stars, and your feet on the ground.', source: 'Theodore Roosevelt', difficulty: 'easy' },
  { quote: 'We are what we repeatedly do. Excellence, then, is a habit.', source: 'Aristotle', difficulty: 'easy' },
  { quote: 'First learn the meaning of what you say, and then speak.', source: 'Epictetus', difficulty: 'easy' },
  { quote: 'The best way to predict your future is to create it.', source: 'Abraham Lincoln', difficulty: 'easy' },
  { quote: 'Nothing in life is to be feared, it is only to be understood.', source: 'Marie Curie', difficulty: 'easy' },
  { quote: 'Simplicity is the ultimate sophistication.', source: 'Leonardo da Vinci', difficulty: 'easy' },

  // --- MEDIUM QUOTES (Balanced, 18-35 words) ---
  { quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts in the end.', source: 'Winston Churchill', difficulty: 'medium' },
  { quote: 'In the middle of difficulty lies opportunity. Keep your focus steady and your fingers poised upon the keys.', source: 'Albert Einstein', difficulty: 'medium' },
  { quote: 'You have power over your mind, not outside events. Realize this truth, and you will discover immense inner strength.', source: 'Marcus Aurelius', difficulty: 'medium' },
  { quote: 'Dream is not that which you see while sleeping; it is something that does not let you sleep.', source: 'APJ Abdul Kalam', difficulty: 'medium' },
  { quote: 'You cannot change your future, but you can change your daily habits, and your habits will transform your destiny.', source: 'APJ Abdul Kalam', difficulty: 'medium' },
  { quote: 'Sometimes it is the people no one imagines anything of who do the things that no one can imagine.', source: 'Alan Turing', difficulty: 'medium' },
  { quote: 'The most dangerous phrase in any language is: We have always done it this way. Be bold enough to change.', source: 'Grace Hopper', difficulty: 'medium' },
  { quote: 'Somewhere, something incredible is waiting to be known. We are an ambitious way for the cosmos to understand itself.', source: 'Carl Sagan', difficulty: 'medium' },
  { quote: 'The first principle is that you must not fool yourself, and remember that you are the easiest person to fool.', source: 'Richard Feynman', difficulty: 'medium' },
  { quote: 'If you want to understand the secrets of the universe, think in terms of energy, frequency and rhythmic vibration.', source: 'Nikola Tesla', difficulty: 'medium' },
  { quote: 'If I have seen further than others, it is by standing squarely upon the shoulders of giants who came before.', source: 'Isaac Newton', difficulty: 'medium' },
  { quote: 'Intelligence is the supreme ability to adapt to change. Look up at the stars and not down at your feet.', source: 'Stephen Hawking', difficulty: 'medium' },
  { quote: 'Clouds come floating into my life, no longer to carry rain or usher storm, but to add radiant color to my sunset.', source: 'Rabindranath Tagore', difficulty: 'medium' },
  { quote: 'Educate, Agitate, Organise. Cultivation of the intellect and human dignity should be the supreme aim of our existence.', source: 'B.R. Ambedkar', difficulty: 'medium' },
  { quote: 'Confidence and persistent hard work is the best medicine to kill the disease of failure and attain lasting success.', source: 'APJ Abdul Kalam', difficulty: 'medium' },
  { quote: 'You may not control every event that happens to you, but you can resolve never to be permanently diminished by them.', source: 'Maya Angelou', difficulty: 'medium' },
  { quote: 'Our doubts are persistent traitors, and make us lose the good we oft might win, by fearing to attempt.', source: 'William Shakespeare', difficulty: 'medium' },
  { quote: 'In a time of universal deceit, speaking the unvarnished truth becomes an act of genuine courage and rebellion.', source: 'George Orwell', difficulty: 'medium' },
  { quote: 'Hope is the thing with feathers that perches in the soul and sings the tune without the words and never stops.', source: 'Emily Dickinson', difficulty: 'medium' },
  { quote: 'Everyone thinks of changing the world, but almost no one pauses to consider changing their own habits first.', source: 'Leo Tolstoy', difficulty: 'medium' },
  { quote: 'Do not go where the path may lead; go instead where there is no path and leave an indelible trail behind.', source: 'Ralph Waldo Emerson', difficulty: 'medium' },
  { quote: 'Go confidently in the direction of your dreams. Live the life you have envisioned with persistence and courage.', source: 'Henry David Thoreau', difficulty: 'medium' },
  { quote: 'Optimism is the unwavering faith that leads to achievement. Absolutely nothing can be accomplished without hope and resolute confidence.', source: 'Helen Keller', difficulty: 'medium' },
  { quote: 'If you cannot fly then run, if you cannot run then walk, but whatever you do, keep moving forward.', source: 'Martin Luther King Jr.', difficulty: 'medium' },
  { quote: 'The future belongs to those who believe in the beauty of their dreams and work quietly to realize them.', source: 'Eleanor Roosevelt', difficulty: 'medium' },
  { quote: 'Tell me and I forget. Teach me and I remember. Involve me actively in the process and I truly learn.', source: 'Benjamin Franklin', difficulty: 'medium' },
  { quote: 'It is not the strongest of the species that survives, but the one most responsive and adaptable to change.', source: 'Charles Darwin', difficulty: 'medium' },
  { quote: 'Clean code always reads like it was written by someone who cares deeply about their craft and their peers.', source: 'Robert C. Martin', difficulty: 'medium' },
  { quote: 'Any fool can write code that a machine can execute. Good engineers write code that human beings can understand.', source: 'Martin Fowler', difficulty: 'medium' },
  { quote: 'Touch typing frees your conscious mind: when finger mechanics become automatic, working memory is devoted entirely to deep creative thought.', source: 'Touch Typing Mastery', difficulty: 'medium' },
  { quote: 'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.', source: 'Antoine de Saint-Exupery', difficulty: 'medium' },
  { quote: 'He who has a clear why to live can endure and overcome almost any imaginable how.', source: 'Friedrich Nietzsche', difficulty: 'medium' },
  { quote: 'Computer science is no more about computers than astronomy is about telescopes. It is about understanding problem solving itself.', source: 'Edsger W. Dijkstra', difficulty: 'medium' },
  { quote: 'Take up one single idea. Make that one idea your life; dream of it, think of it, and live upon it.', source: 'Swami Vivekananda', difficulty: 'medium' },
  { quote: 'Success can only come to you through fearless and courageous devotion to the demanding task at hand.', source: 'C.V. Raman', difficulty: 'medium' },

  // --- HARD QUOTES (Complex syntax, advanced punctuation, 35+ words) ---
  { quote: 'The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks, and then starting on the first one.', source: 'Mark Twain', difficulty: 'hard' },
  { quote: 'The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves; it holds within its mechanical wheels the potential to revolutionize how humanity computes.', source: 'Ada Lovelace', difficulty: 'hard' },
  { quote: 'To prepare effectively for competitive typing examinations, train consistently in timed intervals under realistic pressure, maintaining strict accuracy thresholds and disciplined posture throughout.', source: 'Examination Board Guide', difficulty: 'hard' },
  { quote: 'All the world is a stage, and all the men and women merely players; they have their exits and their entrances, and one person in their time plays many varied parts across seven ages.', source: 'William Shakespeare', difficulty: 'hard' },
  { quote: 'UNIX is fundamentally a simple operating system, but you have to possess a rare degree of dedication to appreciate and navigate its elegant architectural simplicity without stumbling.', source: 'Dennis Ritchie', difficulty: 'hard' },
  { quote: 'I fear not the athlete who has practiced ten thousand different kicks once, but I fear the disciplined practitioner who has practiced one essential technique ten thousand times over.', source: 'Bruce Lee', difficulty: 'hard' },
  { quote: 'Rhythm is significantly more vital than raw mechanical velocity. A steady, predictable cadence safeguards against muscular fatigue, prevents sudden bursts of typos, and ensures sustained accuracy over long sessions.', source: 'Touch Typing Guild', difficulty: 'hard' },
  { quote: 'An individual may perish for an ideal, but that righteous idea will, after their physical death, incarnate itself within the hearts and minds of a thousand subsequent generations.', source: 'Subhas Chandra Bose', difficulty: 'hard' },
  { quote: 'Knowledge can be communicated and formally taught through instruction, but profound wisdom must be lived, experienced, and fortified through personal discipline and patient reflection.', source: 'Hermann Hesse', difficulty: 'hard' },
  { quote: 'Every evening before resting, examine your day with ruthless honesty: what flaw did I confront today? What habit did I improve? What quiet virtue did I strengthen?', source: 'Seneca', difficulty: 'hard' },
  { quote: 'When you arise in the quiet of dawn, remember what an extraordinary privilege it is to be alive: to breathe, to reason, to cultivate understanding, and to pursue meaningful craft with your own hands.', source: 'Marcus Aurelius', difficulty: 'hard' },
  { quote: 'Imagination remains infinitely more expansive than knowledge alone. For knowledge is necessarily bounded by what we currently understand, whereas imagination embraces the entire unfolding universe.', source: 'Albert Einstein', difficulty: 'hard' },
  { quote: 'A ship resting quietly in harbor is undoubtedly secure, but that is not the purpose for which grand vessels are designed. Venture out into turbulent waters and discover what you are capable of achieving.', source: 'Grace Hopper', difficulty: 'hard' },
  { quote: 'Most exceptional programmers do not practice their art merely for commercial compensation or public applause; they write code because crafting elegant, logical systems is an intrinsically joyous pursuit.', source: 'Linus Torvalds', difficulty: 'hard' },
  { quote: 'Your time on this earth is strictly finite, so do not squander it living out someone else\'s preconceived expectations. Do not become ensnared by dogma, which is living with the results of other people\'s thinking.', source: 'Steve Jobs', difficulty: 'hard' },
  { quote: 'Great keyboardists do not gaze downward at their fingers; their vision remains anchored firmly on the text ahead. Train your perception to recognize entire syllables and words as single harmonious gestures.', source: 'Typing Masterclass', difficulty: 'hard' },
  { quote: 'There are only two kinds of programming languages in existence: the ones that developers constantly complain about, and the obscure ones that nobody ever actually builds production software with.', source: 'Bjarne Stroustrup', difficulty: 'hard' },
  { quote: 'Make it work, make it right, and only then make it fast. In the discipline of touch typing, establish unshakeable accuracy first, and remarkable speed will inevitably follow as an effortless consequence.', source: 'Kent Beck', difficulty: 'hard' },
  { quote: 'I would rather inhabit a world filled with provocative questions that cannot immediately be answered, than accept comforting answers that are shielded from rigorous questioning and scrutiny.', source: 'Richard Feynman', difficulty: 'hard' },
  { quote: 'You have to grow from the absolute inside out. None can teach you wisdom; none can bestow true understanding upon you. There is no other authentic teacher than your own inquiring spirit.', source: 'Swami Vivekananda', difficulty: 'hard' },
  { quote: 'An equation holds no genuine intellectual meaning for me unless it gives voice to a deeper mathematical truth that harmonizes the fundamental patterns of reality.', source: 'Srinivasa Ramanujan', difficulty: 'hard' },
  { quote: 'In mathematics and rigorous engineering, you rarely experience sudden magical comprehension; rather, through persistent exposure, systematic drills, and patient application, you gradually grow accustomed to the mechanics.', source: 'John von Neumann', difficulty: 'hard' },
  { quote: 'The future of decentralized computation and human collaboration remains far grander than anything we have witnessed thus far. The tools we construct today are merely the rough scaffolding for what is to come.', source: 'Tim Berners-Lee', difficulty: 'hard' },
  { quote: 'To succeed in long-form examinations such as those administered by high courts and government commissions, one must cultivate physical ergonomics, mental calmness, and an unwavering cadence that does not waiver under time pressure.', source: 'Exam Readiness Manual', difficulty: 'hard' },
  { quote: 'It is a well-established axiom of keen observation that the minute particulars of execution—the subtle rhythm of keystrokes, the light touch on the return, the relaxed wrist posture—matter infinitely more than frantic effort.', source: 'Arthur Conan Doyle', difficulty: 'hard' },
  { quote: 'The true mark of touch typing mastery is not the frantic speed of a brief ten-second burst, but the quiet, rhythmic fluency maintained effortlessly across twenty consecutive minutes of demanding prose.', source: 'Typing Guild Heritage', difficulty: 'hard' },
  { quote: 'Do not measure your progress by comparing your current speed to the peak performance of others. Measure your advancement strictly against your own historical baseline, celebrating each incremental gain in accuracy.', source: 'Personal Mastery Guide', difficulty: 'hard' },
  { quote: 'When practicing unfamiliar vocabulary or foreign syntactic structures, deliberately decrease your tempo until errors vanish completely, allowing the neural pathways to crystallize without the burden of correcting bad habits.', source: 'Neuromuscular Learning Institute', difficulty: 'hard' },
  { quote: 'Every single keystroke is an opportunity to cultivate presence of mind. Resist the temptation to rush ahead of your fingers, and allow the cadence of the sentence to guide your hands toward natural, fluent expression.', source: 'Mindful Keyboarding Principles', difficulty: 'hard' },
  { quote: 'The greatest obstacle to high-speed transcription is not physical finger stiffness, but the mental tension born of anxiety. Relax your shoulders, breathe steadily, and trust the muscle memory you have painstakingly built.', source: 'Professional Transcription Guild', difficulty: 'hard' },
  { quote: 'A craftsman who honors their tools treats the keyboard not as an obstacle to be hammered, but as a responsive instrument capable of translating raw human imagination directly into enduring digital prose.', source: 'Digital Craftsmanship Manifesto', difficulty: 'hard' },
  { quote: 'In the realm of competitive typing, the difference between a fluent sixty words per minute and an elite one hundred words per minute is not brute strength, but the systematic elimination of hesitation between word boundaries.', source: 'Speed Typists Handbook', difficulty: 'hard' },
  { quote: 'Accuracy is the foundational currency of speed. Every keystroke error costs at least three subsequent motions: the realization of mistake, the backspace penalty, and the re-typing of the correct character.', source: 'Error Analysis in Keyboarding', difficulty: 'hard' },
  { quote: 'True excellence in any discipline emerges when conscious competence recedes into unconscious mastery, freeing the spirit to soar unencumbered by the mechanics of the medium.', source: 'The Way of the Touch Typist', difficulty: 'hard' },
  { quote: 'Whether you are composing code, drafting legal briefs, or preparing for national qualification examinations, treat each session as a deliberate craft worthy of your deepest concentration and unwavering care.', source: 'Dedication to Excellence', difficulty: 'hard' },
];

export const CANONICAL_INITIAL_TEXT =
  'the system and program for modern computer keyboard practice builds accuracy and continuous progress every day in typing speed with rhythm discipline and steady cadence learning new words and practicing daily typing checks reinforces muscle memory and confidence on the keyboard focus on accuracy first and natural speed will follow effortlessly with deliberate practice every single time you sit down to test your typing performance';

export interface TextOptions {
  mode: TestMode;
  difficulty?: TestDifficulty;
  punctuation?: boolean;
  numbers?: boolean;
  wordCount?: number;
}

export function generateTestText(options: TextOptions): string {
  const { mode, difficulty = 'medium', punctuation = false, numbers = false, wordCount = 60 } = options;

  if (mode === 'quote') {
    // Filter quotes matching the selected difficulty
    const matchingQuotes = CURATED_QUOTES.filter((q) => q.difficulty === difficulty);
    const pool = matchingQuotes.length > 0 ? matchingQuotes : CURATED_QUOTES;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex].quote;
  }

  let bank = COMMON_WORDS_MEDIUM;
  if (difficulty === 'easy') bank = COMMON_WORDS_EASY;
  if (difficulty === 'hard') bank = COMMON_WORDS_HARD;

  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const randomWord = bank[Math.floor(Math.random() * bank.length)];
    let word = randomWord;

    // Apply numbers if toggled
    if (numbers && i % 8 === 7) {
      word = Math.floor(Math.random() * 1000).toString();
    }

    // Apply punctuation if toggled
    if (punctuation && i > 0 && i % 6 === 0) {
      const punctMarks = ['.', ',', ';', '!', '?'];
      const mark = punctMarks[Math.floor(Math.random() * punctMarks.length)];
      word = word + mark;
    }

    // Capitalize start of sentence if punctuation is enabled
    if (punctuation && (i === 0 || words[i - 1]?.endsWith('.'))) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    words.push(word);
  }

  return words.join(' ');
}
