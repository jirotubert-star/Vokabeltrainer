import { useEffect, useMemo, useState } from "react";

const vocabulary = {
  "Zeit & Zahlen": [
    { de: "Montag", fr: "lundi" },
    { de: "Dienstag", fr: "mardi" },
    { de: "Mittwoch", fr: "mercredi" },
    { de: "Donnerstag", fr: "jeudi" },
    { de: "Freitag", fr: "vendredi" },
    { de: "Samstag", fr: "samedi" },
    { de: "Sonntag", fr: "dimanche" },
    { de: "Januar", fr: "janvier" },
    { de: "Februar", fr: "février" },
    { de: "März", fr: "mars" },
    { de: "April", fr: "avril" },
    { de: "Mai", fr: "mai" },
    { de: "Juni", fr: "juin" },
    { de: "Juli", fr: "juillet" },
    { de: "August", fr: "août" },
    { de: "September", fr: "septembre" },
    { de: "Oktober", fr: "octobre" },
    { de: "November", fr: "novembre" },
    { de: "Dezember", fr: "décembre" },
    { de: "eins", fr: "un" },
    { de: "zwei", fr: "deux" },
    { de: "drei", fr: "trois" },
    { de: "vier", fr: "quatre" },
    { de: "fünf", fr: "cinq" },
    { de: "zehn", fr: "dix" },
    { de: "zwanzig", fr: "vingt" },
  ],
  Familie: [
    { de: "der Bruder", fr: "un frère" },
    { de: "die Schwester", fr: "une sœur" },
    { de: "die Eltern", fr: "les parents" },
    { de: "der Vater", fr: "le père" },
    { de: "die Mutter", fr: "la mère" },
    { de: "der Großvater", fr: "un grand-père" },
    { de: "die Großmutter", fr: "une grand-mère" },
    { de: "der Onkel", fr: "un oncle" },
    { de: "die Tante", fr: "une tante" },
    { de: "der Freund", fr: "un ami" },
    { de: "die Freundin", fr: "une amie" },
  ],
  "Charakter & Aussehen": [
    { de: "sympathisch", fr: "sympathique" },
    { de: "nett", fr: "gentil / gentille" },
    { de: "gemein", fr: "méchant / méchante" },
    { de: "ruhig", fr: "calme" },
    { de: "lustig", fr: "drôle" },
    { de: "traurig", fr: "triste" },
    { de: "schüchtern", fr: "timide" },
    { de: "intelligent", fr: "intelligent / intelligente" },
    { de: "klein", fr: "petit / petite" },
    { de: "groß", fr: "grand / grande" },
    { de: "schön", fr: "beau / belle" },
  ],
  Kleidung: [
    { de: "der Rock", fr: "une jupe" },
    { de: "das Kleid", fr: "une robe" },
    { de: "die Hose", fr: "un pantalon" },
    { de: "das T-Shirt", fr: "un tee-shirt" },
    { de: "die Schuhe", fr: "des chaussures" },
    { de: "die Mütze", fr: "un bonnet" },
    { de: "der Schal", fr: "une écharpe" },
    { de: "die Brille", fr: "des lunettes" },
    { de: "der Rucksack", fr: "un sac à dos" },
    { de: "weiß", fr: "blanc / blanche" },
    { de: "rot", fr: "rouge" },
  ],
  Schule: [
    { de: "die Schule", fr: "un collège / un lycée" },
    { de: "das Klassenzimmer", fr: "une salle de classe" },
    { de: "der Unterricht", fr: "un cours" },
    { de: "der Lehrer", fr: "un professeur" },
    { de: "der Schüler", fr: "un élève" },
    { de: "Mathematik", fr: "les mathématiques" },
    { de: "Geschichte", fr: "l’histoire" },
    { de: "die Hausaufgaben", fr: "les devoirs" },
    { de: "lernen", fr: "étudier" },
    { de: "wiederholen", fr: "réviser" },
  ],
  Essen: [
    { de: "das Frühstück", fr: "le petit-déjeuner" },
    { de: "das Mittagessen", fr: "le déjeuner" },
    { de: "das Abendessen", fr: "le dîner" },
    { de: "das Fleisch", fr: "la viande" },
    { de: "der Fisch", fr: "le poisson" },
    { de: "das Gemüse", fr: "un légume" },
    { de: "das Brot", fr: "le pain" },
    { de: "der Käse", fr: "un fromage" },
    { de: "essen", fr: "manger" },
    { de: "trinken", fr: "boire" },
    { de: "bestellen", fr: "commander" },
  ],
  Transport: [
    { de: "das Auto", fr: "une voiture" },
    { de: "das Fahrrad", fr: "un vélo" },
    { de: "der Bus", fr: "un bus" },
    { de: "die Metro", fr: "le métro" },
    { de: "der Zug", fr: "le train" },
    { de: "der Bahnhof", fr: "une gare" },
    { de: "die Fahrkarte", fr: "un ticket" },
    { de: "reisen", fr: "voyager" },
    { de: "ankommen", fr: "arriver" },
    { de: "umsteigen", fr: "changer" },
  ],
  "Sätze & Redemittel": [
    { de: "Hallo!", fr: "Salut !" },
    { de: "Guten Tag!", fr: "Bonjour !" },
    { de: "Wie geht’s?", fr: "Ça va ?" },
    { de: "Bis bald!", fr: "À bientôt !" },
    { de: "Ich heiße Camille.", fr: "Je m’appelle Camille." },
    { de: "Ich wohne in Toulouse.", fr: "J’habite à Toulouse." },
    { de: "Tut mir leid, ich kann nicht.", fr: "Désolé / Désolée, je ne peux pas." },
    { de: "Klappt!", fr: "Ça marche !" },
    { de: "Danke für die Einladung.", fr: "Merci pour l’invitation." },
    { de: "Ich lerne seit 6 Monaten Französisch.", fr: "J’étudie le français depuis 6 mois." },
  ],
};

const STORAGE_KEY = "vokabeltrainer-progress";
const CUSTOM_VOCABULARY_KEY = "vokabeltrainer-custom-vocabulary";
const SUBJECTS = ["je", "tu", "il / elle", "nous", "vous", "ils / elles"];
const GRAMMAR = {
  er: { label: "-er", verbs: ["parler", "aimer", "jouer"], present: ["e", "es", "e", "ons", "ez", "ent"], pp: "é" },
  ir: { label: "-ir", verbs: ["finir", "choisir", "réussir"], present: ["is", "is", "it", "issons", "issez", "issent"], pp: "i" },
  re: { label: "-re", verbs: ["vendre", "attendre", "répondre"], present: ["s", "s", "", "ons", "ez", "ent"], pp: "u" },
};
const IMPARFAIT = ["ais", "ais", "ait", "ions", "iez", "aient"];

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeCustomVocabulary(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};

  return Object.fromEntries(
    Object.entries(raw)
      .map(([category, entries]) => [
        category.trim(),
        Array.isArray(entries)
          ? entries
              .map((entry) => ({
                de: typeof entry?.de === "string" ? entry.de.trim() : "",
                fr: typeof entry?.fr === "string" ? entry.fr.trim() : "",
              }))
              .filter((entry) => entry.de && entry.fr)
          : [],
      ])
      .filter(([category]) => category)
  );
}

function flatten(selected, sourceVocabulary) {
  return selected.flatMap((category) =>
    (sourceVocabulary[category] || []).map((item) => ({
      ...item,
      category,
      id: `${category}__${item.de}__${item.fr}`,
    }))
  );
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function loadCustomVocabulary() {
  try {
    return normalizeCustomVocabulary(JSON.parse(localStorage.getItem(CUSTOM_VOCABULARY_KEY) || "{}"));
  } catch {
    return {};
  }
}

function percent(history = []) {
  if (!history.length) return 0;
  return Math.round((history.filter(Boolean).length / history.length) * 100);
}

function isLearned(stats, id) {
  const history = stats[id] || [];
  return history.length >= 5 && percent(history.slice(-5)) >= 80;
}

function conjugate(verb, group, tense, index) {
  const stem = verb.slice(0, -2);
  if (tense === "participle") return `${stem}${GRAMMAR[group].pp}`;
  if (tense === "imparfait") return `${group === "ir" ? `${stem}iss` : stem}${IMPARFAIT[index]}`;
  return `${stem}${GRAMMAR[group].present[index]}`;
}

export default function App() {
  const baseCategories = Object.keys(vocabulary);
  const [customVocabulary, setCustomVocabulary] = useState({});
  const allVocabulary = useMemo(() => ({ ...vocabulary, ...customVocabulary }), [customVocabulary]);
  const categories = Object.keys(allVocabulary);
  const [selectedCategories, setSelectedCategories] = useState(baseCategories.slice(0, 4));
  const [mode, setMode] = useState("cards");
  const [direction, setDirection] = useState("de-fr");
  const [stats, setStats] = useState({});
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [match, setMatch] = useState({ left: [], right: [], done: [] });
  const [choice, setChoice] = useState({ left: null, right: null });
  const [test, setTest] = useState(null);
  const [result, setResult] = useState("");
  const [grammarGroup, setGrammarGroup] = useState("er");
  const [grammarTense, setGrammarTense] = useState("present");
  const [grammarQuestion, setGrammarQuestion] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newWordCategory, setNewWordCategory] = useState("");
  const [newGermanWord, setNewGermanWord] = useState("");
  const [newFrenchWord, setNewFrenchWord] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const cards = useMemo(
    () => flatten(selectedCategories.length ? selectedCategories : categories, allVocabulary),
    [selectedCategories, categories.join("|"), allVocabulary]
  );
  const learned = useMemo(() => cards.filter((card) => isLearned(stats, card.id)), [cards, stats]);

  useEffect(() => {
    setStats(loadProgress());
    setCustomVocabulary(loadCustomVocabulary());
  }, []);
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)), [stats]);
  useEffect(() => localStorage.setItem(CUSTOM_VOCABULARY_KEY, JSON.stringify(customVocabulary)), [customVocabulary]);

  const nextQueue = () => {
    const next = shuffle(cards);
    setQueue(next);
    setCurrent(next[0] || null);
    setShowAnswer(false);
  };

  useEffect(() => {
    nextQueue();
    const pairs = shuffle(cards).slice(0, 5);
    setMatch({
      left: shuffle(pairs.map((card) => ({ id: card.id, text: card.de }))),
      right: shuffle(pairs.map((card) => ({ id: card.id, text: card.fr }))),
      done: [],
    });
  }, [cards.length, selectedCategories.join("|"), categories.join("|")]);

  const effectiveDirection = direction === "mixed" ? (Math.random() > 0.5 ? "de-fr" : "fr-de") : direction;
  const prompt = current ? (effectiveDirection === "de-fr" ? current.de : current.fr) : "Keine Karten";
  const answer = current ? (effectiveDirection === "de-fr" ? current.fr : current.de) : "";
  const learnedPercent = cards.length ? Math.round((learned.length / cards.length) * 100) : 0;

  const mark = (known) => {
    if (!current) return;
    setStats((old) => ({ ...old, [current.id]: [...(old[current.id] || []), known].slice(-5) }));
    const rest = queue.slice(1);
    if (rest.length) {
      setQueue(rest);
      setCurrent(rest[0]);
    } else {
      nextQueue();
    }
    setShowAnswer(false);
  };

  const buildTest = () => {
    const pool = learned.length ? learned : cards;
    const card = shuffle(pool)[0];
    if (!card) return;
    const dir = direction === "mixed" ? (Math.random() > 0.5 ? "de-fr" : "fr-de") : direction;
    const correct = dir === "de-fr" ? card.fr : card.de;
    const options = shuffle([
      correct,
      ...shuffle(cards.filter((item) => item.id !== card.id)).slice(0, 3).map((item) => (dir === "de-fr" ? item.fr : item.de)),
    ]);
    setResult("");
    setTest({ card, dir, prompt: dir === "de-fr" ? card.de : card.fr, correct, options });
  };

  useEffect(() => {
    if (mode === "test") buildTest();
  }, [mode, learned.length, direction]);

  const pickMatch = (side, item) => {
    const next = { ...choice, [side]: item };
    setChoice(next);
    if (!next.left || !next.right) return;
    if (next.left.id === next.right.id) {
      setMatch((old) => ({ ...old, done: [...old.done, next.left.id] }));
      setStats((old) => ({ ...old, [next.left.id]: [...(old[next.left.id] || []), true].slice(-5) }));
    }
    setTimeout(() => setChoice({ left: null, right: null }), 250);
  };

  const buildGrammar = () => {
    const verbs = GRAMMAR[grammarGroup].verbs;
    const verb = shuffle(verbs)[0];
    const subjectIndex = Math.floor(Math.random() * SUBJECTS.length);
    const correct = conjugate(verb, grammarGroup, grammarTense, subjectIndex);
    const options = shuffle([
      correct,
      ...SUBJECTS.map((_, index) => conjugate(verb, grammarGroup, grammarTense, index)).filter((item) => item !== correct),
    ]).slice(0, 4);
    setResult("");
    setGrammarQuestion({
      prompt: grammarTense === "participle" ? `Participe passé von ${verb}` : `${SUBJECTS[subjectIndex]} + ${verb}`,
      correct,
      options,
    });
  };

  useEffect(() => {
    if (mode === "grammar") buildGrammar();
  }, [mode, grammarGroup, grammarTense]);

  const addCategory = (event) => {
    event.preventDefault();
    const category = newCategoryName.trim();
    if (!category) return;
    if (allVocabulary[category]) {
      setCustomMessage("Diese Kategorie gibt es schon.");
      return;
    }

    setCustomVocabulary((old) => ({ ...old, [category]: [] }));
    setSelectedCategories((old) => [...old, category]);
    setNewWordCategory(category);
    setNewCategoryName("");
    setCustomMessage(`Kategorie "${category}" wurde erstellt.`);
  };

  const addVocabularyEntry = (event) => {
    event.preventDefault();
    const category = newWordCategory.trim();
    const de = newGermanWord.trim();
    const fr = newFrenchWord.trim();
    if (!category || !de || !fr) {
      setCustomMessage("Bitte Kategorie, Deutsch und Französisch ausfüllen.");
      return;
    }

    setCustomVocabulary((old) => {
      const existing = old[category] || [];
      const exists = existing.some((entry) => entry.de.toLowerCase() === de.toLowerCase() && entry.fr.toLowerCase() === fr.toLowerCase());
      if (exists) return old;
      return { ...old, [category]: [...existing, { de, fr }] };
    });
    setSelectedCategories((old) => (old.includes(category) ? old : [...old, category]));
    setNewGermanWord("");
    setNewFrenchWord("");
    setCustomMessage(`"${de}" wurde gespeichert.`);
  };

  const removeCustomEntry = (category, indexToRemove) => {
    setCustomVocabulary((old) => {
      const nextEntries = (old[category] || []).filter((_, index) => index !== indexToRemove);
      if (nextEntries.length) return { ...old, [category]: nextEntries };
      const { [category]: removed, ...rest } = old;
      return rest;
    });
  };

  const customCategories = Object.keys(customVocabulary);

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Deutsch - Französisch</p>
          <h1>DELF A2 Vokabeltrainer</h1>
          <p className="intro">Karteikarten, Verbinden, Tests und Grammatiktraining mit gespeichertem Fortschritt.</p>
        </div>
        <div className="score">
          <span>{learnedPercent}%</span>
          <small>{learned.length} von {cards.length} gelernt</small>
        </div>
      </section>

      <section className="toolbar">
        {[
          ["cards", "Karteikarten"],
          ["match", "Verbinden"],
          ["test", "Vokabeltest"],
          ["grammar", "Grammatik"],
        ].map(([id, label]) => (
          <button key={id} className={mode === id ? "active" : ""} onClick={() => setMode(id)}>{label}</button>
        ))}
        <select value={direction} onChange={(event) => setDirection(event.target.value)}>
          <option value="de-fr">Deutsch → Französisch</option>
          <option value="fr-de">Französisch → Deutsch</option>
          <option value="mixed">Gemischt</option>
        </select>
      </section>

      <div className="layout">
        <section className="panel trainer">
          {mode === "cards" && (
            <>
              <div className="meta">{current?.category || "-"} · Trefferquote {current ? percent(stats[current.id]) : 0}%</div>
              <div className="cardText">{prompt}</div>
              {showAnswer && <div className="answer">{answer}</div>}
              <div className="actions">
                <button className="primary" onClick={() => setShowAnswer((old) => !old)}>{showAnswer ? "Antwort ausblenden" : "Antwort zeigen"}</button>
                <button onClick={() => mark(true)}>Gewusst</button>
                <button onClick={() => mark(false)}>Nochmal lernen</button>
              </div>
            </>
          )}

          {mode === "match" && (
            <>
              <div className="meta">Verbinde die passenden Paare · {match.done.length} / {match.left.length}</div>
              <div className="matchGrid">
                <div>
                  {match.left.map((item) => (
                    <button
                      key={item.id}
                      disabled={match.done.includes(item.id)}
                      className={match.done.includes(item.id) ? "correct" : choice.left?.id === item.id ? "selected" : ""}
                      onClick={() => pickMatch("left", item)}
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
                <div>
                  {match.right.map((item) => (
                    <button
                      key={item.id}
                      disabled={match.done.includes(item.id)}
                      className={match.done.includes(item.id) ? "correct" : choice.right?.id === item.id ? "selected" : ""}
                      onClick={() => pickMatch("right", item)}
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {mode === "test" && test && (
            <>
              <div className="meta">Testfrage {test.dir === "de-fr" ? "Deutsch → Französisch" : "Französisch → Deutsch"}</div>
              <div className="cardText">{test.prompt}</div>
              <div className="options">
                {test.options.map((option) => (
                  <button key={option} onClick={() => setResult(option === test.correct ? "Richtig" : `Falsch. Richtig: ${test.correct}`)}>
                    {option}
                  </button>
                ))}
              </div>
              {result && <div className={result === "Richtig" ? "notice good" : "notice bad"}>{result}</div>}
              <button onClick={buildTest}>Nächste Frage</button>
            </>
          )}

          {mode === "grammar" && grammarQuestion && (
            <>
              <div className="grammarControls">
                <select value={grammarGroup} onChange={(event) => setGrammarGroup(event.target.value)}>
                  {Object.entries(GRAMMAR).map(([id, group]) => <option key={id} value={id}>{group.label} Verben</option>)}
                </select>
                <select value={grammarTense} onChange={(event) => setGrammarTense(event.target.value)}>
                  <option value="present">Présent</option>
                  <option value="imparfait">Imparfait</option>
                  <option value="participle">Participe passé</option>
                </select>
              </div>
              <div className="cardText">{grammarQuestion.prompt}</div>
              <div className="options">
                {grammarQuestion.options.map((option) => (
                  <button key={option} onClick={() => setResult(option === grammarQuestion.correct ? "Richtig" : `Falsch. Richtig: ${grammarQuestion.correct}`)}>
                    {option}
                  </button>
                ))}
              </div>
              {result && <div className={result === "Richtig" ? "notice good" : "notice bad"}>{result}</div>}
              <button onClick={buildGrammar}>Nächste Aufgabe</button>
            </>
          )}
        </section>

        <aside className="panel">
          <h2>Themen auswählen</h2>
          <div className="categories">
            {categories.map((category) => (
              <button
                key={category}
                className={selectedCategories.includes(category) ? "active" : ""}
                onClick={() => setSelectedCategories((old) => old.includes(category) ? old.filter((item) => item !== category) : [...old, category])}
              >
                <strong>{category}</strong>
                <span>{allVocabulary[category].length} Karten</span>
              </button>
            ))}
          </div>
          <button className="danger" onClick={() => setStats({})}>Fortschritt zurücksetzen</button>
        </aside>
      </div>

      <section className="panel customPanel">
        <div className="customHeader">
          <div>
            <p className="eyebrow">Eigene Inhalte</p>
            <h2>Eigene Kategorien und Vokabeln</h2>
          </div>
          <span>{customCategories.length} eigene Kategorien</span>
        </div>

        <div className="customGrid">
          <form className="customForm" onSubmit={addCategory}>
            <label htmlFor="categoryName">Neue Kategorie</label>
            <input
              id="categoryName"
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
              placeholder="z. B. Urlaub"
            />
            <button className="primary" type="submit">Kategorie erstellen</button>
          </form>

          <form className="customForm" onSubmit={addVocabularyEntry}>
            <label htmlFor="wordCategory">Vokabel hinzufügen</label>
            <select
              id="wordCategory"
              value={newWordCategory}
              onChange={(event) => setNewWordCategory(event.target.value)}
            >
              <option value="">Kategorie wählen</option>
              {customCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input
              value={newGermanWord}
              onChange={(event) => setNewGermanWord(event.target.value)}
              placeholder="Deutsch"
            />
            <input
              value={newFrenchWord}
              onChange={(event) => setNewFrenchWord(event.target.value)}
              placeholder="Französisch"
            />
            <button className="primary" type="submit">Vokabel speichern</button>
          </form>
        </div>

        {customMessage && <div className="notice good">{customMessage}</div>}

        <div className="customList">
          {customCategories.length === 0 ? (
            <div className="emptyState">Noch keine eigenen Kategorien gespeichert.</div>
          ) : (
            customCategories.map((category) => (
              <div className="customCategory" key={category}>
                <div className="customCategoryTitle">
                  <strong>{category}</strong>
                  <span>{customVocabulary[category].length} Vokabeln</span>
                </div>
                <div className="customEntries">
                  {customVocabulary[category].map((entry, index) => (
                    <div className="customEntry" key={`${entry.de}-${entry.fr}-${index}`}>
                      <span>{entry.de}</span>
                      <span>{entry.fr}</span>
                      <button type="button" onClick={() => removeCustomEntry(category, index)}>Löschen</button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
