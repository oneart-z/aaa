const categories = {
  brand: {
    label: "採用広報",
    description: "候補者が応募前に信頼できる情報量と一貫性"
  },
  experience: {
    label: "候補者体験",
    description: "応募から選考後までの透明性と離脱しにくさ"
  },
  skills: {
    label: "スキルベース採用",
    description: "学歴・年数に偏らない職務要件と評価設計"
  },
  data: {
    label: "AI・データ運用",
    description: "AI検索時代に対応した求人情報と改善サイクル"
  }
};

const options = [
  {
    value: 0,
    title: "未整備",
    text: "担当者の経験や都度対応に依存している"
  },
  {
    value: 1,
    title: "一部実施",
    text: "必要に応じて実施しているが標準化されていない"
  },
  {
    value: 2,
    title: "運用中",
    text: "基本の型があり、複数の募集で使えている"
  },
  {
    value: 3,
    title: "改善中",
    text: "成果データを見ながら継続的に改善している"
  }
];

const questions = [
  {
    id: "evp",
    category: "brand",
    text: "自社で働く価値を、職種別・候補者層別に具体化できていますか。"
  },
  {
    id: "content",
    category: "brand",
    text: "社員の声、働き方、成長機会、報酬、選考情報を応募前に確認できる状態ですか。"
  },
  {
    id: "channel",
    category: "brand",
    text: "採用サイト、求人媒体、SNS、スカウト文面でメッセージが一貫していますか。"
  },
  {
    id: "speed",
    category: "experience",
    text: "応募後の初回連絡、面接調整、合否連絡の目安を決めて守れていますか。"
  },
  {
    id: "transparency",
    category: "experience",
    text: "選考フロー、評価観点、面接で見られるポイントを候補者に明示していますか。"
  },
  {
    id: "follow",
    category: "experience",
    text: "辞退理由、面接後の不安、内定承諾前の疑問を拾う仕組みがありますか。"
  },
  {
    id: "requirements",
    category: "skills",
    text: "求人票は学歴・経験年数だけでなく、必要スキルと期待成果で定義されていますか。"
  },
  {
    id: "assessment",
    category: "skills",
    text: "面接・課題・書類選考で、候補者の実務スキルを同じ基準で評価できていますか。"
  },
  {
    id: "learning",
    category: "skills",
    text: "AI活用力、学習速度、変化対応力を職種に応じて評価対象に入れていますか。"
  },
  {
    id: "language",
    category: "data",
    text: "AI検索や求人レコメンドに伝わる自然な文章で、職務・魅力・条件を記述していますか。"
  },
  {
    id: "metrics",
    category: "data",
    text: "流入、応募率、面接移行率、辞退率、承諾率をチャネル別に見ていますか。"
  },
  {
    id: "governance",
    category: "data",
    text: "AIツールを採用に使う場合の確認責任、公平性、候補者への説明方針がありますか。"
  }
];

const recommendationsByCategory = {
  brand: [
    "職種別に候補者が知りたい情報を棚卸しし、採用サイトの1ページに集約する。",
    "求人票、スカウト、SNS投稿で使う価値訴求を3つに絞り、表現を統一する。"
  ],
  experience: [
    "応募後24時間以内の一次返信と、選考ごとの連絡期限を標準ルールにする。",
    "面接前に評価観点と所要時間を共有し、候補者の不確実性を下げる。"
  ],
  skills: [
    "必須条件をスキル、成果、任せる業務に分解し、学歴・年数条件を見直す。",
    "面接評価シートを作り、AI活用力や学習速度を職種に応じて観察できる設問にする。"
  ],
  data: [
    "採用チャネル別に応募率、面接移行率、辞退率、承諾率を月次で確認する。",
    "AIや求人検索に読み取られやすいよう、曖昧な表現を具体的な職務・条件・成果に置き換える。"
  ]
};

const form = document.querySelector("#diagnosisForm");
const questionList = document.querySelector("#questionList");
const resetButton = document.querySelector("#resetButton");
const resultSection = document.querySelector("#result");
const totalScore = document.querySelector("#totalScore");
const heroScore = document.querySelector("#heroScore");
const resultLead = document.querySelector("#resultLead");
const maturityLabel = document.querySelector("#maturityLabel");
const priorityTheme = document.querySelector("#priorityTheme");
const scoreBar = document.querySelector("#scoreBar");
const categoryResults = document.querySelector("#categoryResults");
const recommendations = document.querySelector("#recommendations");

renderQuestions();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const diagnosis = calculateDiagnosis();
  renderResult(diagnosis);
  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

resetButton.addEventListener("click", () => {
  form.reset();
  resultSection.hidden = true;
  totalScore.textContent = "0";
  heroScore.textContent = "--";
});

function renderQuestions() {
  const fragment = document.createDocumentFragment();

  questions.forEach((question, index) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "question-card";

    const legend = document.createElement("legend");
    legend.className = "question-meta";
    legend.innerHTML = `<span>Q${String(index + 1).padStart(2, "0")} / ${categories[question.category].label}</span><small>1つ選択</small>`;

    const title = document.createElement("h3");
    title.textContent = question.text;

    const optionGroup = document.createElement("div");
    optionGroup.className = "option-group";

    options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      const inputId = `${question.id}-${option.value}`;
      label.innerHTML = `
        <input
          id="${inputId}"
          type="radio"
          name="${question.id}"
          value="${option.value}"
          ${optionIndex === 1 ? "checked" : ""}
        >
        <span class="option-content">
          <strong>${option.title}</strong>
          <span>${option.text}</span>
        </span>
      `;
      optionGroup.append(label);
    });

    fieldset.append(legend, title, optionGroup);
    fragment.append(fieldset);
  });

  questionList.append(fragment);
}

function calculateDiagnosis() {
  const formData = new FormData(form);
  const categoryTotals = {};

  for (const key of Object.keys(categories)) {
    categoryTotals[key] = {
      raw: 0,
      max: questions.filter((question) => question.category === key).length * 3
    };
  }

  for (const question of questions) {
    const value = Number(formData.get(question.id) || 0);
    categoryTotals[question.category].raw += value;
  }

  const categoryScores = Object.entries(categoryTotals).map(([key, score]) => ({
    key,
    label: categories[key].label,
    description: categories[key].description,
    score: Math.round((score.raw / score.max) * 100)
  }));

  const total = Math.round(categoryScores.reduce((sum, item) => sum + item.score, 0) / categoryScores.length);
  const weakest = [...categoryScores].sort((a, b) => a.score - b.score)[0];

  return {
    total,
    weakest,
    categoryScores,
    maturity: getMaturity(total)
  };
}

function renderResult(diagnosis) {
  totalScore.textContent = diagnosis.total;
  heroScore.textContent = diagnosis.total;
  resultLead.textContent = diagnosis.maturity.lead;
  maturityLabel.textContent = diagnosis.maturity.label;
  priorityTheme.textContent = `${diagnosis.weakest.label}：${diagnosis.weakest.description}`;
  scoreBar.style.width = `${diagnosis.total}%`;

  categoryResults.replaceChildren(
    ...diagnosis.categoryScores.map((category) => {
      const article = document.createElement("article");
      article.className = "category-card";
      article.dataset.level = getLevel(category.score);
      article.innerHTML = `
        <h3>${category.label}</h3>
        <p>${category.description}</p>
        <strong>${category.score}</strong>
      `;
      return article;
    })
  );

  const orderedRecommendations = buildRecommendations(diagnosis);
  recommendations.replaceChildren(
    ...orderedRecommendations.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    })
  );
}

function buildRecommendations(diagnosis) {
  const categoriesByPriority = [...diagnosis.categoryScores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  return categoriesByPriority.flatMap((category) => recommendationsByCategory[category.key]).slice(0, 4);
}

function getMaturity(score) {
  if (score >= 80) {
    return {
      label: "高度運用段階",
      lead: "採用広報、候補者体験、評価、データ運用が概ね連動しています。今後は職種別の勝ち筋を磨き、施策ごとの投資対効果を検証してください。"
    };
  }

  if (score >= 60) {
    return {
      label: "標準運用段階",
      lead: "基本的な採用施策は整っています。2026年の採用環境では、候補者に伝わる具体性とデータに基づく改善頻度が差になりやすい状態です。"
    };
  }

  if (score >= 40) {
    return {
      label: "改善着手段階",
      lead: "採用活動の型は一部ありますが、属人的な運用が残っています。まずは応募前情報、選考体験、評価基準の3点を標準化してください。"
    };
  }

  return {
    label: "基盤整備段階",
    lead: "採用マーケティングの土台整備が優先です。求人票と採用サイトの情報を見直し、候補者が安心して応募できる最低限の情報から整えてください。"
  };
}

function getLevel(score) {
  if (score >= 70) return "high";
  if (score >= 45) return "mid";
  return "low";
}
