export const translations = {
  en: {
    header: {
      title: "Japan Pension Calculator",
      subtitle:
        "Lump-sum Withdrawal & Old-age Pension estimator for departing foreigners",
    },
    step1: {
      title: "Step 1 — Dates in Japan",
      arrival: "First arrival / pension enrollment",
      departure: "Planned departure",
      baseMonth: "Base month (last premium paid)",
      baseMonthHint: "Usually the month before departure",
      totalPeriod: "Total period",
      months: "months",
      yearPlaceholder: "Year",
      monthPlaceholder: "Month",
    },
    step2: {
      title: "Step 2 — National Pension Month Breakdown",
      desc: "Allocate your NP months across each category. Exemption months have different weights per Japan Pension Service rules.",
      fullPaid: "Fully paid",
      quarterExempt: "¼ exemption",
      halfExempt: "½ exemption",
      threeQuarterExempt: "¾ exemption",
      fullExempt: "Full exemption",
      studentDeferment: "Student deferment",
      fullPaidDesc: "Normal full contribution months",
      quarterExemptDesc: "1/4 exempted — counts as ¾ month",
      halfExemptDesc: "Half exempted — counts as ½ month",
      threeQuarterExemptDesc: "3/4 exempted — counts as ¼ month",
      fullExemptDesc:
        "Fully exempted — counts for 120-month threshold only, not payout",
      studentDefermentDesc:
        "学生納付特例 — counts for 120-month threshold only, not payout",
      npEntered: "NP months entered",
      weightedPaid: "Weighted contribution-paid",
      of: "of",
      total: "total",
      mismatch:
        "NP months entered ({a}) do not match total period ({t}). The difference may be Employees' Pension months — enter those in Step 3.",
    },
    step3: {
      title: "Step 3 — Employees' Pension (厚生年金)",
      desc: "Leave at 0 if you were only in the National Pension (e.g., self-employed, student). Uses your gross (pre-tax) salary — specifically the standard monthly remuneration (標準報酬月額), which is your gross pay before income tax or social insurance deductions.",
      epMonths: "EP months enrolled",
      avgSalary: "Avg monthly gross salary (¥)",
      avgSalaryHint: "Gross pay before any deductions",
      totalBonuses: "Total bonuses over entire EP period (¥)",
      totalBonusesHint: "Sum of all gross bonuses over the entire EP period",
      asrLabel: "Average Standard Remuneration",
      asrNote: "(monthly pay + bonuses ÷ months)",
    },
    result: {
      title: "Result",
      qualPeriod: "Qualification period",
      npPaid: "NP contribution-paid",
      epMonths: "EP months",
      toOldAge: "to go for 120",
      oldAgeElig: "≥ 120 ✓ Old-age",
      minOk: "≥ 6 ✓",
      belowMin: "below 6 minimum",
      none: "—",
      eligOldAge: "Eligible for Old-age Pension (120+ months)",
      eligLumpSum: "Eligible for Lump-sum Withdrawal Payment",
      notElig: "Not yet eligible",
      sectionA: "A. Lump-sum Withdrawal (脱退一時金)",
      sectionB: "B. Old-age Pension (老齢年金) — Monthly from Age 65",
      lumpSumBlockedOldAge:
        "You have 120+ qualifying months — you cannot claim the Lump-sum Withdrawal Payment. You are entitled to the Old-age Pension instead.",
      lumpSumBlockedMin:
        "Lump-sum Withdrawal is not available (below 6-month minimum).",
      combinedTitle: "Combined Lump-sum Total",
      npLumpSum: "NP lump-sum",
      epGross: "EP gross amount",
      epTax: "EP withholding tax (20.42%)",
      totalGross: "Total gross",
      totalNet: "Total net (after EP tax)",
      disclaimer1:
        "Estimate only. Actual amounts determined by Japan Pension Service. Old-age figures use FY2024 Basic Pension reference and are subject to annual revision.",
      disclaimer2:
        "If your home country has a Social Security Agreement with Japan (Germany, USA, Belgium, France, Canada, Australia, Netherlands, Czech, Spain, Ireland, Brazil, Switzerland, Hungary, India, Luxembourg, Philippines, Slovakia, Finland, Sweden, Austria), claiming the lump-sum forfeits totalization rights — consult your pension office first.",
      disclaimerSource:
        "Source: Japan Pension Service — Lump-sum Withdrawal guide (March 2026).",
      officialPDF: "Official PDF (EP)",
      officialPDFUrl:
        "https://www.nenkin.go.jp/international/english/japanese-system/benefit/payment.files/A.pdf",
      npSourceLabel: "NP lump-sum source (JA)",
      npSourceUrl:
        "https://www.nenkin.go.jp/service/jukyu/seido/sonota-kyufu/dattai-ichiji/20210401_01.html",
      abbrev: "NP = National Pension (国民年金) · EP = Employees' Pension (厚生年金)",
    },
    npBox: {
      title: "National Pension (国民年金) — Lump-sum Withdrawal",
      formula: "Formula: Amount = NP monthly premium × ½ × Number",
      fiscalYear: "Fiscal year",
      premium: "NP monthly premium",
      paidMonths: "Contribution-paid months",
      cappedAt: "Capped at {cap} months",
      number: "Number used for calculation",
      amount: "Amount",
      noTax: "NP lump-sum is not subject to withholding tax.",
      belowMin: "NP contribution-paid ({n} months) below the 6-month minimum.",
    },
    epBox: {
      title: "Employees' Pension (厚生年金) — Lump-sum Withdrawal",
      formula1:
        "Formula: Amount = Average Standard Remuneration (ASR) × Payment Rate",
      formula2: "Payment Rate = Insurance Rate × ½ × Number",
      step1: "Step 1 — Average Standard Remuneration (ASR)",
      step1Formula:
        "ASR = (Total standard monthly pay + Total bonuses) ÷ Total insured months",
      salaryXMonths: "Monthly salary × months",
      totalBonuses: "Total bonuses",
      asr: "ASR",
      step2: "Step 2 — Payment Rate (from table)",
      insuranceRate: "Insurance rate",
      cappedMonths: "EP months (capped at {cap})",
      number: "Number used for calculation",
      paymentRate: "Payment Rate",
      step3: "Step 3 — Lump-sum Withdrawal Amount",
      gross: "Gross amount",
      tax: "Withholding tax (20.42%)",
      net: "Net amount (after tax)",
      taxNote:
        "20.42% is withheld at source on EP payments to non-residents. You may reclaim it by appointing a tax agent and filing a return before leaving Japan.",
      belowMin:
        "EP months ({n}) below the 6-month minimum, or no salary entered.",
    },
    oaBox: {
      title: "Old-age Pension (老齢年金) — Monthly from Age 65",
      approx:
        "Estimate based on current months. Actual amount determined by Japan Pension Service at retirement, adjusted annually.",
      basicTitle: "Basic Pension (老齢基礎年金)",
      basicFormula: "Annual = Full amount × (NP qualifying months ÷ 480)",
      fullAmount: "Full Basic Pension (FY2024)",
      npMonths: "NP qualifying months",
      annualBasic: "Annual Basic Pension",
      monthlyBasic: "Monthly Basic Pension",
      epTitle: "Earnings-related Pension (老齢厚生年金)",
      epFormula: "Annual = ASR × 5.481‰ × EP months  (post-April 2003 rate)",
      asr: "Average Standard Remuneration",
      epMonths: "EP months",
      annualEP: "Annual EP Pension",
      monthlyEP: "Monthly EP Pension",
      totalMonthly: "Total monthly (from age 65)",
      totalAnnual: "Total annual",
      needMore:
        "You have {cur} qualifying months. You need {need} more to reach the 120-month threshold. This estimate shows what you would receive at 120 months.",
    },
    footer:
      "Unofficial estimation tool. Data from Japan Pension Service (March 2026). Always verify with",
    theme: { light: "Light", dark: "Dark" },
    guide: {
      title: "Where to find your pension data",
      desc: "Log in to Myna Portal and open 年金資格記録情報 (Pension Qualification Records). Use the highlighted values to fill in the calculator.",
      linkText: "Open Myna Portal →",
      show: "Show Myna Portal guide",
      hide: "Hide guide",
      epSection: "Employees' Pension record",
      npSection: "Contribution period records",
      m_epDate: "→ Arrival month (Step 1)",
      m_epMonths: "→ EP months enrolled (Step 3)",
      m_kyosai: "→ EP months if civil servant (Step 3)",
      kyosaiNote:
        "Civil servants (公務員): If 厚生年金資格月数情報 shows 0, look at 共済組合等納付月数情報 instead — enter that value as your EP months in Step 3. Since October 2015, 共済年金 (mutual aid pension) was merged into 厚生年金 and is recorded here. Example: enrolled Apr 2023, 共済組合等 = 36 → enter 36 as EP months in Step 3.",
      m_npPaid: "→ Fully paid (Step 2)",
      m_npFullExempt: "→ Full exemption (Step 2)",
      m_np34Exempt: "→ ¾ exemption (Step 2)",
      m_npHalfExempt: "→ ½ exemption (Step 2)",
      m_np14Exempt: "→ ¼ exemption (Step 2)",
      m_npStudent: "→ Student deferment (Step 2)",
      note: "Tip: the NP totals (国民年金加入月数情報 etc.) are for reference only — enter each category separately in Step 2.",
      totalSection: "Grand totals (verification)",
      m_grandTotal: "→ Must match Qualification period in Result",
      required: "Required",
      verifyLabel: "Enter 年金加入月数合計情報 to verify",
      verifyTopDesc:
        "Enter the grand total from the 年金資格記録情報 page on Myna Portal. This lets us confirm all your entries are correct before calculating.",
      whereToFind:
        "Not sure where to find this number? Open the Myna Portal guide below ↓",
      verifyMatch:
        "Match ✓  Calculator total ({calc} mo) matches your Myna Portal record.",
      verifyProjection:
        "Projection mode ↗  Your portal currently shows {portal} mo. The calculator is projecting {calc} mo — you need {diff} more months to reach this.",
      verifyMismatch:
        "Mismatch  Calculator shows {calc} months but portal shows {portal} months. Check your Step 2 and Step 3 entries.",
    },
  },

  ja: {
    header: {
      title: "日本年金計算機",
      subtitle: "日本を離れる外国人向け — 脱退一時金・老齢年金の試算",
    },
    step1: {
      title: "ステップ1 — 在日期間",
      arrival: "初来日日 / 年金加入開始月",
      departure: "出国予定月",
      baseMonth: "基準月（最後に保険料を納付した月）",
      baseMonthHint: "通常、出国予定月の前月",
      totalPeriod: "合計期間",
      months: "ヶ月",
      yearPlaceholder: "年",
      monthPlaceholder: "月",
    },
    step2: {
      title: "ステップ2 — 国民年金の月数内訳",
      desc: "各カテゴリーに国民年金の月数を割り当ててください。免除月は日本年金機構のルールにより異なる重みが適用されます。",
      fullPaid: "保険料納付済",
      quarterExempt: "4分の1免除",
      halfExempt: "半額免除",
      threeQuarterExempt: "4分の3免除",
      fullExempt: "全額免除",
      studentDeferment: "学生納付特例",
      fullPaidDesc: "通常の全額納付月",
      quarterExemptDesc: "4分の1免除 — 4分の3月として換算",
      halfExemptDesc: "半額免除 — 2分の1月として換算",
      threeQuarterExemptDesc: "4分の3免除 — 4分の1月として換算",
      fullExemptDesc:
        "全額免除 — 受給資格期間のみカウント（支給額に反映されません）",
      studentDefermentDesc:
        "学生納付特例 — 受給資格期間のみカウント（支給額に反映されません）",
      npEntered: "入力した国民年金月数",
      weightedPaid: "加重保険料納付済月数",
      of: "/",
      total: "合計",
      mismatch:
        "入力した国民年金月数（{a}ヶ月）が合計期間（{t}ヶ月）と一致しません。差分は厚生年金の月数の可能性があります — ステップ3で入力してください。",
    },
    step3: {
      title: "ステップ3 — 厚生年金",
      desc: "国民年金のみ加入（自営業・学生など）の場合は0のままにしてください。計算には税引き前の給与（標準報酬月額）を使用します。これは所得税・社会保険料控除前の総支給額に基づきます。",
      epMonths: "厚生年金加入月数",
      avgSalary: "平均月額給与（税引き前・円）",
      avgSalaryHint: "控除前の月額総支給額",
      totalBonuses: "在籍期間中の賞与合計額（円）",
      totalBonusesHint: "在籍期間中に受け取った賞与の合計（税引き前）",
      asrLabel: "平均標準報酬額",
      asrNote: "（月額 ＋ 賞与 ÷ 月数）",
    },
    result: {
      title: "計算結果",
      qualPeriod: "受給資格期間",
      npPaid: "国民年金納付済月数",
      epMonths: "厚生年金月数",
      toOldAge: "で120ヶ月到達",
      oldAgeElig: "120ヶ月以上 ✓ 老齢年金",
      minOk: "6ヶ月以上 ✓",
      belowMin: "6ヶ月未満",
      none: "—",
      eligOldAge: "老齢年金の受給資格あり（120ヶ月以上）",
      eligLumpSum: "脱退一時金の請求資格あり",
      notElig: "未だ受給資格なし",
      sectionA: "A. 脱退一時金",
      sectionB: "B. 老齢年金 — 65歳から月額",
      lumpSumBlockedOldAge:
        "受給資格期間が120ヶ月以上あるため、脱退一時金は請求できません。将来、老齢年金を受け取ることができます。",
      lumpSumBlockedMin: "脱退一時金は利用不可（最低6ヶ月未満）。",
      combinedTitle: "脱退一時金合計",
      npLumpSum: "国民年金脱退一時金",
      epGross: "厚生年金脱退一時金（税引き前）",
      epTax: "源泉徴収税（20.42%）",
      totalGross: "合計（税引き前）",
      totalNet: "合計（手取り）",
      disclaimer1:
        "これは試算です。実際の支給額は日本年金機構が決定します。老齢年金額は2024年度の老齢基礎年金額を基準としており、毎年改定されます。",
      disclaimer2:
        "日本と社会保障協定を締結している国（ドイツ、アメリカ、ベルギー、フランス、カナダ、オーストラリア、オランダ、チェコ、スペイン、アイルランド、ブラジル、スイス、ハンガリー、インド、ルクセンブルク、フィリピン、スロバキア、フィンランド、スウェーデン、オーストリア）から来日されている場合、脱退一時金を受け取ると通算権利が失われます。事前に年金事務所にご相談ください。",
      disclaimerSource: "出典：日本年金機構 脱退一時金のご案内（2026年3月）。",
      officialPDF: "公式PDF（厚生年金）",
      officialPDFUrl:
        "https://www.nenkin.go.jp/service/jukyu/seido/sonota-kyufu/dattai-ichiji/20150406.html#cmskounen",
      npSourceLabel: "国民年金の出典",
      npSourceUrl:
        "https://www.nenkin.go.jp/service/jukyu/seido/sonota-kyufu/dattai-ichiji/20210401_01.html",
      abbrev: "国年（NP） = 国民年金 · 厚年（EP） = 厚生年金",
    },
    npBox: {
      title: "国民年金 — 脱退一時金",
      formula: "計算式：支給額 ＝ 国民年金保険料 × 1/2 × 支給額計算に用いる数",
      fiscalYear: "年度",
      premium: "国民年金保険料（月額）",
      paidMonths: "保険料納付済期間等の月数",
      cappedAt: "上限{cap}ヶ月に適用",
      number: "支給額計算に用いる数",
      amount: "支給額",
      noTax: "国民年金の脱退一時金は源泉徴収されません。",
      belowMin: "保険料納付済月数（{n}ヶ月）が最低6ヶ月を下回っています。",
    },
    epBox: {
      title: "厚生年金 — 脱退一時金",
      formula1: "計算式：支給額 ＝ 平均標準報酬額 × 支給率",
      formula2: "支給率 ＝ 保険料率 × 1/2 × 被保険者期間月数に応じた数",
      step1: "ステップ1 — 平均標準報酬額",
      step1Formula:
        "平均標準報酬額 ＝（全月の標準報酬月額 ＋ 標準賞与額の合計）÷ 全被保険者期間月数",
      salaryXMonths: "月額給与 × 月数",
      totalBonuses: "賞与合計",
      asr: "平均標準報酬額",
      step2: "ステップ2 — 支給率（表より）",
      insuranceRate: "保険料率",
      cappedMonths: "厚生年金月数（上限{cap}ヶ月）",
      number: "支給率計算に用いる数",
      paymentRate: "支給率",
      step3: "ステップ3 — 脱退一時金支給額",
      gross: "支給額（税引き前）",
      tax: "源泉徴収税（20.42%）",
      net: "手取り支給額",
      taxNote:
        "非居住者への厚生年金脱退一時金の支給には20.42%の源泉徴収が行われます。出国前に納税管理人を選任し確定申告を行うことで還付を受けられる場合があります。",
      belowMin:
        "厚生年金月数（{n}ヶ月）が最低6ヶ月を下回っているか、給与が未入力です。",
    },
    oaBox: {
      title: "老齢年金 — 65歳から月額",
      approx:
        "現在の加入月数に基づく試算です。実際の支給額は退職時に日本年金機構が決定し、毎年改定されます。",
      basicTitle: "老齢基礎年金",
      basicFormula: "年額 ＝ 満額 × （国民年金資格期間月数 ÷ 480）",
      fullAmount: "老齢基礎年金の満額（2024年度）",
      npMonths: "国民年金資格期間月数",
      annualBasic: "老齢基礎年金の年額",
      monthlyBasic: "老齢基礎年金の月額",
      epTitle: "老齢厚生年金",
      epFormula:
        "年額 ＝ 平均標準報酬額 × 5.481‰ × 厚生年金月数（2003年4月以降の率）",
      asr: "平均標準報酬額",
      epMonths: "厚生年金月数",
      annualEP: "老齢厚生年金の年額",
      monthlyEP: "老齢厚生年金の月額",
      totalMonthly: "合計月額（65歳から）",
      totalAnnual: "合計年額",
      needMore:
        "現在の受給資格期間は{cur}ヶ月です。老齢年金を受給するにはあと{need}ヶ月が必要です。この試算は120ヶ月到達時の予想額です。",
    },
    footer:
      "非公式試算ツール。日本年金機構（2026年3月）のデータに基づいています。必ず確認を",
    theme: { light: "ライト", dark: "ダーク" },
    guide: {
      title: "マイナポータルでデータを確認する",
      desc: "マイナポータルにログインし、「年金資格記録情報」ページを開いてください。ハイライトされた値を計算機に入力してください。",
      linkText: "マイナポータルを開く →",
      show: "マイナポータル入力ガイドを表示",
      hide: "ガイドを閉じる",
      epSection: "厚生年金加入記録情報",
      npSection: "年金加入期間・納付等月数記録情報",
      m_epDate: "→ 来日月（ステップ1）",
      m_epMonths: "→ 厚生年金月数（ステップ3）",
      m_kyosai: "→ 厚生年金月数・公務員の場合（ステップ3）",
      kyosaiNote:
        "公務員の方：厚生年金資格月数情報が0の場合は、共済組合等納付月数情報の値をステップ3の厚生年金月数に入力してください。2015年10月以降、共済年金は厚生年金に統合され、この欄に記録されます。例：2023年4月加入・共済組合等 = 36ヶ月 → ステップ3に36を入力。",
      m_npPaid: "→ 保険料納付済（ステップ2）",
      m_npFullExempt: "→ 全額免除（ステップ2）",
      m_np34Exempt: "→ ¾免除（ステップ2）",
      m_npHalfExempt: "→ 半額免除（ステップ2）",
      m_np14Exempt: "→ ¼免除（ステップ2）",
      m_npStudent: "→ 学生納付特例（ステップ2）",
      note: "注意：ポータルに表示される国民年金の合計月数は参考値です。ステップ2で各カテゴリーの内訳を入力してください。",
      totalSection: "合計（確認用）",
      m_grandTotal: "→ 計算結果の「受給資格期間」と一致するか確認",
      required: "必須",
      verifyLabel: "年金加入月数合計情報を入力して確認",
      verifyTopDesc:
        "マイナポータルの「年金資格記録情報」ページに表示される合計月数を入力してください。入力内容が正しいか確認できます。",
      whereToFind:
        "この数字がどこにあるか分からない場合は、下のマイナポータルガイドを開いてください ↓",
      verifyMatch:
        "一致 ✓  計算結果（{calc}ヶ月）はマイナポータルの記録と一致しています。",
      verifyProjection:
        "予測モード ↗  ポータルの現在の記録は{portal}ヶ月です。計算機の予測は{calc}ヶ月 — あと{diff}ヶ月で到達します。",
      verifyMismatch:
        "不一致  計算結果は{calc}ヶ月ですが、ポータルは{portal}ヶ月を示しています。ステップ2・3の入力を確認してください。",
    },
  },

  id: {
    header: {
      title: "Kalkulator Pensiun Jepang",
      subtitle:
        "Estimasi Pembayaran Sekaligus & Pensiun Hari Tua bagi WNA yang meninggalkan Jepang",
    },
    step1: {
      title: "Langkah 1 — Periode di Jepang",
      arrival: "Pertama kali tiba / terdaftar pensiun",
      departure: "Rencana keberangkatan",
      baseMonth: "Bulan dasar (bulan premi terakhir dibayar)",
      baseMonthHint: "Biasanya bulan sebelum keberangkatan",
      totalPeriod: "Total periode",
      months: "bulan",
      yearPlaceholder: "Tahun",
      monthPlaceholder: "Bulan",
    },
    step2: {
      title: "Langkah 2 — Rincian Bulan Pensiun Nasional",
      desc: "Alokasikan bulan Pensiun Nasional ke setiap kategori. Bulan pembebasan memiliki bobot berbeda sesuai aturan Japan Pension Service.",
      fullPaid: "Dibayar penuh",
      quarterExempt: "Bebas ¼",
      halfExempt: "Bebas ½",
      threeQuarterExempt: "Bebas ¾",
      fullExempt: "Bebas penuh",
      studentDeferment: "Penangguhan mahasiswa",
      fullPaidDesc: "Bulan iuran penuh normal",
      quarterExemptDesc: "Bebas ¼ — dihitung sebagai ¾ bulan",
      halfExemptDesc: "Bebas setengah — dihitung sebagai ½ bulan",
      threeQuarterExemptDesc: "Bebas ¾ — dihitung sebagai ¼ bulan",
      fullExemptDesc:
        "Bebas penuh — hanya untuk syarat 120 bulan, bukan pembayaran",
      studentDefermentDesc:
        "学生納付特例 — hanya untuk syarat 120 bulan, bukan pembayaran",
      npEntered: "Bulan NP yang dimasukkan",
      weightedPaid: "Iuran berbobot berbayar",
      of: "dari",
      total: "total",
      mismatch:
        "Bulan NP ({a}) tidak cocok dengan total periode ({t}). Selisihnya mungkin bulan Pensiun Karyawan — masukkan di Langkah 3.",
    },
    step3: {
      title: "Langkah 3 — Pensiun Karyawan (厚生年金)",
      desc: "Biarkan 0 jika hanya mengikuti Pensiun Nasional (mis. wiraswasta, mahasiswa). Menggunakan gaji kotor (sebelum pajak) — khususnya remunerasi bulanan standar (標準報酬月額), yaitu gaji kotor sebelum pajak atau potongan asuransi sosial.",
      epMonths: "Bulan terdaftar EP",
      avgSalary: "Rata-rata gaji kotor bulanan (¥)",
      avgSalaryHint: "Gaji kotor sebelum potongan apapun",
      totalBonuses: "Total bonus seluruh periode EP (¥)",
      totalBonusesHint: "Jumlah semua bonus kotor selama seluruh periode EP",
      asrLabel: "Rata-rata Remunerasi Standar",
      asrNote: "(gaji bulanan + bonus ÷ bulan)",
    },
    result: {
      title: "Hasil",
      qualPeriod: "Periode kualifikasi",
      npPaid: "NP iuran berbayar",
      epMonths: "Bulan EP",
      toOldAge: "menuju 120",
      oldAgeElig: "≥ 120 ✓ Pensiun Tua",
      minOk: "≥ 6 ✓",
      belowMin: "di bawah minimum 6",
      none: "—",
      eligOldAge: "Memenuhi syarat Pensiun Hari Tua (120+ bulan)",
      eligLumpSum: "Memenuhi syarat Pembayaran Sekaligus",
      notElig: "Belum memenuhi syarat",
      sectionA: "A. Pembayaran Sekaligus (脱退一時金)",
      sectionB: "B. Pensiun Hari Tua (老齢年金) — Bulanan mulai Usia 65",
      lumpSumBlockedOldAge:
        "Anda memiliki 120+ bulan kualifikasi — tidak dapat mengklaim Pembayaran Sekaligus. Anda berhak atas Pensiun Hari Tua.",
      lumpSumBlockedMin:
        "Pembayaran Sekaligus tidak tersedia (di bawah minimum 6 bulan).",
      combinedTitle: "Total Pembayaran Sekaligus",
      npLumpSum: "NP sekaligus",
      epGross: "EP jumlah kotor",
      epTax: "Pajak pemotongan EP (20,42%)",
      totalGross: "Total kotor",
      totalNet: "Total bersih (setelah pajak EP)",
      disclaimer1:
        "Ini hanyalah estimasi. Jumlah aktual ditentukan Japan Pension Service. Angka Pensiun Hari Tua menggunakan referensi FY2024 dan dapat berubah setiap tahun.",
      disclaimer2:
        "Jika negara asal Anda memiliki Perjanjian Keamanan Sosial dengan Jepang (Jerman, AS, Belgia, Prancis, Kanada, Australia, Belanda, Ceko, Spanyol, Irlandia, Brasil, Swiss, Hongaria, India, Luksemburg, Filipina, Slowakia, Finlandia, Swedia, Austria), mengklaim pembayaran sekaligus menghilangkan hak totalisasi.",
      disclaimerSource:
        "Sumber: Japan Pension Service — Panduan Pembayaran Sekaligus (Maret 2026).",
      officialPDF: "PDF Resmi (EP)",
      officialPDFUrl:
        "https://www.nenkin.go.jp/international/english/japanese-system/benefit/payment.files/F.pdf",
      npSourceLabel: "Sumber NP (JA)",
      npSourceUrl:
        "https://www.nenkin.go.jp/service/jukyu/seido/sonota-kyufu/dattai-ichiji/20210401_01.html",
      abbrev: "NP = Pensiun Nasional (国民年金) · EP = Pensiun Karyawan (厚生年金)",
    },
    npBox: {
      title: "Pensiun Nasional (国民年金) — Pembayaran Sekaligus",
      formula: "Rumus: Jumlah = Premi bulanan NP × ½ × Angka",
      fiscalYear: "Tahun fiskal",
      premium: "Premi bulanan NP",
      paidMonths: "Bulan iuran berbayar",
      cappedAt: "Dibatasi {cap} bulan",
      number: "Angka untuk perhitungan",
      amount: "Jumlah",
      noTax: "Pembayaran sekaligus NP tidak dikenakan pajak pemotongan.",
      belowMin: "Bulan iuran NP ({n}) di bawah minimum 6 bulan.",
    },
    epBox: {
      title: "Pensiun Karyawan (厚生年金) — Pembayaran Sekaligus",
      formula1:
        "Rumus: Jumlah = Rata-rata Remunerasi Standar (RRS) × Tingkat Pembayaran",
      formula2: "Tingkat Pembayaran = Tingkat Asuransi × ½ × Angka",
      step1: "Langkah 1 — Rata-rata Remunerasi Standar (RRS)",
      step1Formula:
        "RRS = (Total gaji bulanan standar + Total bonus standar) ÷ Total bulan",
      salaryXMonths: "Gaji bulanan × bulan",
      totalBonuses: "Total bonus",
      asr: "Rata-rata Remunerasi Standar (RRS)",
      step2: "Langkah 2 — Tingkat Pembayaran (dari tabel)",
      insuranceRate: "Tingkat asuransi",
      cappedMonths: "Bulan EP (dibatasi {cap})",
      number: "Angka untuk perhitungan",
      paymentRate: "Tingkat Pembayaran",
      step3: "Langkah 3 — Jumlah Pembayaran Sekaligus",
      gross: "Jumlah kotor",
      tax: "Pajak pemotongan (20,42%)",
      net: "Jumlah bersih (setelah pajak)",
      taxNote:
        "20,42% dipotong di sumber untuk pembayaran EP kepada non-residen. Anda dapat mengklaim kembali dengan menunjuk agen pajak sebelum meninggalkan Jepang.",
      belowMin:
        "Bulan EP ({n}) di bawah minimum 6 bulan, atau gaji belum dimasukkan.",
    },
    oaBox: {
      title: "Pensiun Hari Tua (老齢年金) — Bulanan mulai Usia 65",
      approx:
        "Estimasi berdasarkan bulan kontribusi saat ini. Jumlah aktual ditentukan Japan Pension Service saat pensiun, disesuaikan setiap tahun.",
      basicTitle: "Pensiun Dasar (老齢基礎年金)",
      basicFormula: "Tahunan = Jumlah penuh × (bulan NP ÷ 480)",
      fullAmount: "Pensiun Dasar penuh (FY2024)",
      npMonths: "Bulan kualifikasi NP",
      annualBasic: "Pensiun Dasar tahunan",
      monthlyBasic: "Pensiun Dasar bulanan",
      epTitle: "Pensiun Terkait Penghasilan (老齢厚生年金)",
      epFormula: "Tahunan = RRS × 5,481‰ × bulan EP (tarif pasca April 2003)",
      asr: "Rata-rata Remunerasi Standar",
      epMonths: "Bulan EP",
      annualEP: "Pensiun EP tahunan",
      monthlyEP: "Pensiun EP bulanan",
      totalMonthly: "Total bulanan (dari usia 65)",
      totalAnnual: "Total tahunan",
      needMore:
        "Anda memiliki {cur} bulan kualifikasi. Butuh {need} bulan lagi untuk mencapai 120 bulan. Estimasi ini menunjukkan jumlah jika Anda mencapai 120 bulan.",
    },
    footer:
      "Alat estimasi tidak resmi. Data dari Japan Pension Service (Maret 2026). Selalu verifikasi di",
    theme: { light: "Terang", dark: "Gelap" },
    guide: {
      title: "Temukan data pensiun Anda di Myna Portal",
      desc: "Masuk ke Myna Portal dan buka 年金資格記録情報 (Catatan Kualifikasi Pensiun). Gunakan nilai yang disorot untuk mengisi kalkulator.",
      linkText: "Buka Myna Portal →",
      show: "Tampilkan panduan Myna Portal",
      hide: "Sembunyikan panduan",
      epSection: "Catatan Pensiun Karyawan",
      npSection: "Catatan periode kontribusi",
      m_epDate: "→ Bulan kedatangan (Langkah 1)",
      m_epMonths: "→ Bulan EP (Langkah 3)",
      m_kyosai: "→ Bulan EP jika PNS (Langkah 3)",
      kyosaiNote:
        "Pegawai negeri (公務員): Jika 厚生年金資格月数情報 menunjukkan 0, lihat 共済組合等納付月数情報 — masukkan nilai tersebut sebagai bulan EP di Langkah 3. Sejak Oktober 2015, 共済年金 digabung ke dalam 厚生年金 dan dicatat di kolom ini. Contoh: terdaftar April 2023, 共済組合等 = 36 → masukkan 36 sebagai bulan EP di Langkah 3.",
      m_npPaid: "→ Dibayar penuh (Langkah 2)",
      m_npFullExempt: "→ Bebas penuh (Langkah 2)",
      m_np34Exempt: "→ Bebas ¾ (Langkah 2)",
      m_npHalfExempt: "→ Bebas ½ (Langkah 2)",
      m_np14Exempt: "→ Bebas ¼ (Langkah 2)",
      m_npStudent: "→ Penangguhan mahasiswa (Langkah 2)",
      note: "Tips: total bulan NP di portal (国民年金加入月数情報 dll.) hanya referensi — masukkan setiap kategori secara terpisah di Langkah 2.",
      totalSection: "Total keseluruhan (verifikasi)",
      m_grandTotal: "→ Harus cocok dengan Periode kualifikasi di Hasil",
      required: "Wajib",
      verifyLabel: "Masukkan 年金加入月数合計情報 untuk verifikasi",
      verifyTopDesc:
        "Masukkan total dari halaman 年金資格記録情報 di Myna Portal untuk memastikan semua data sudah diisi dengan benar.",
      whereToFind:
        "Tidak tahu cara menemukannya? Buka panduan Myna Portal di bawah ↓",
      verifyMatch:
        "Cocok ✓  Total kalkulator ({calc} bulan) sesuai dengan data Myna Portal Anda.",
      verifyProjection:
        "Mode proyeksi ↗  Portal Anda saat ini menunjukkan {portal} bulan. Kalkulator memproyeksikan {calc} bulan — butuh {diff} bulan lagi untuk mencapainya.",
      verifyMismatch:
        "Tidak cocok  Kalkulator menunjukkan {calc} bulan tetapi portal menunjukkan {portal} bulan. Periksa entri Langkah 2 dan Langkah 3.",
    },
  },
};

// T(lang, 'step1.title') or T(lang, 'step2.mismatch', { a: 10, t: 12 })
export function T(lang, key, vars) {
  const keys = key.split(".");
  let val = translations[lang] ?? translations.en;
  for (const k of keys) {
    if (val == null) return key;
    val = val[k];
  }
  if (typeof val !== "string") return key;
  if (vars) return val.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
  return val;
}
