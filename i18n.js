(function () {
  const STORAGE_KEY = "portfolio-lang";

  const strings = {
    en: {
      "nav.about": "About",
      "nav.experience": "Experience",
      "nav.reports": "Tech Reports",
      "nav.software": "Software",
      "nav.mobile": "Mobile",
      "nav.skills": "Skills",
      "nav.contact": "Contact",
      "nav.aria": "Main navigation",
      "theme.toggle": "Switch theme",
      "menu.toggle": "Toggle menu",
      "lang.toggle": "عربي",
      "lang.aria": "Switch to Arabic",

      "hero.badge": "Open to opportunities",
      "hero.greeting": "Hello, I'm <em>Dana Hussain AlHayki</em>",
      "hero.title": "Securing systems, <span class=\"text-gradient\">building software</span> that scales",
      "hero.subtitle": "Cybersecurity & Full Stack Developer",
      "hero.description": "A dynamic and dedicated IT professional with a passion for technology that knows no bounds. Completed a Bachelor’s degree in Cybersecurity and a Diploma in Full Stack Development, mastering complex programming languages while engaging deeply in the evolving realm of cybersecurity. With knowledge spanning networking, information systems, and computer science, stands out as a versatile specialist, driven by enthusiasm and determination to carve a confident and innovative career path.",
      "hero.btn.reports": "Tech Reports",
      "hero.btn.software": "Software Projects",
      "hero.btn.viewCv": "View CV",
      "hero.btn.downloadCv": "Download CV",
      "hero.stat.reports": "Tech Reports",
      "hero.stat.software": "Software",
      "hero.stat.mobile": "Mobile",
      "hero.stat.total": "Total projects",
      "hero.stats.aria": "Project breakdown",

      "about.label": "About",
      "about.title": "Technical background",
      "about.location": "Arad, Muharraq · Bahrain",
      "about.p1": "I'm a dynamic and dedicated IT professional with a passion for technology spanning cybersecurity, full stack development, and mobile applications. I combine hands-on engineering with a strong foundation in networking, information systems, and computer science.",
      "about.p2": "Earned a Bachelor's in Cybersecurity at the University of Bahrain with a very good GPA of 3.26 out of 4, and a Full Stack & Mobile Development diploma at Reboot01. I've volunteered at the Arab International CyberSecurity Conference (AICS) and BAYG as part of the IT team.",
      "about.h1.title": "Cybersecurity",
      "about.h1.desc": "Risk assessment, secure software development, and enterprise compliance frameworks.",
      "about.h2.title": "Full Stack Development",
      "about.h2.desc": "REST APIs, real-time systems, database design, and containerized deployments.",
      "about.h3.title": "Mobile & AI Security",
      "about.h3.desc": "Flutter apps with E2EE, plus AI-powered tools like secure command execution platforms.",

      "exp.label": "Experience",
      "exp.title": "Training & Volunteering",
      "exp.intro": "Professional training, certificates, public-sector experience, and volunteer work supporting major events and community programs in Bahrain.",
      "exp.badge.training": "Training",
      "exp.badge.volunteer": "Volunteering",
      "exp.moi.role": "Information Technology Intern",
      "exp.moi.org": "Ministry of Interior",
      "exp.moi.date": "Jun 2026 – Aug 2026",
      "exp.moi.1": "Contributed to day-to-day administrative and operational activities within a government institution.",
      "exp.moi.2": "Helped organize, review, and maintain official documentation and institutional records.",
      "exp.moi.3": "Built familiarity with formal processes, compliance requirements, and public-sector workplace standards.",
      "exp.moi.4": "Supported the preparation, formatting, and handling of official correspondence and internal reports.",
      "exp.moi.5": "Strengthened attention to detail, organizational habits, and confidence working within structured workflows.",
      "exp.moi.cert": "View Training Certificate",
      "exp.yc.role": "Ushers Committee Organizer",
      "exp.yc.org": "Youth City 2030",
      "exp.yc.date": "Jul 2026 – Aug 2026",
      "exp.yc.1": "Coordinated ushering operations for Youth City 2030 events, supporting on-site visitor flow and committee activities.",
      "exp.yc.2": "Built digital tools to automate visitor registration and tracking, cutting down manual administrative work.",
      "exp.yc.3": "Designed a Google Forms registration workflow with Google Sheets and Apps Script to manage daily ticket capacity and keep registration records up to date.",
      "exp.yc.4": "Developed a privacy-focused visitor tracking system using unique IDs, with live occupancy monitoring, 45-minute session timers, interactive visitor cards, and automated remaining-time and overtime alerts.",
      "exp.yc.cert": "View Volunteer Certificate",
      "exp.aics.role": "Workshop Organizer",
      "exp.aics.org": "Arab International CyberSecurity Conference & Exhibition (AICS)",
      "exp.aics.date": "Nov 2025",
      "exp.aics.1": "Volunteered as an organizer for the University of Bahrain workshop at a major regional cybersecurity conference.",
      "exp.aics.2": "Supported workshop coordination, on-site logistics, and smooth delivery of conference programming.",
      "exp.aics.3": "Gained exposure to professional cybersecurity events, networking, and large-scale event operations.",
      "exp.bayg.role": "IT Team Organizer",
      "exp.bayg.org": "Bahrain Asian Youth Games (BAYG)",
      "exp.bayg.date": "Oct 2025",
      "exp.bayg.1": "Volunteered with the IT team as an organizer during the Bahrain Asian Youth Games.",
      "exp.bayg.2": "Assisted with technical and operational support to keep event IT services running reliably.",
      "exp.bayg.3": "Built teamwork, communication, and problem-solving skills in a fast-paced, high-visibility environment.",
      "exp.bayg.cert": "View Volunteer Certificate",

      "cert.title": "Certificates",
      "cert.grad.title": "Graduation Statement — University of Bahrain",
      "cert.grad.desc": "Bachelor's degree in Cybersecurity with a very good GPA of 3.26 out of 4.",
      "cert.transcript.title": "Official Academic Transcript",
      "cert.transcript.desc": "University of Bahrain transcript reflecting a cumulative GPA of 3.26 / 4.00.",
      "cert.ai.title": "AI Challenge Participation",
      "cert.ai.desc": "Participated in the AI Challenge organized by the Information & eGovernment Authority with the Royal Academy of Police (Jan 2026).",
      "cert.hcia.title": "HCIA openEuler MOOC Exam",
      "cert.hcia.desc": "Completed the Huawei HCIA openEuler MOOC exam covering Linux and open-source operating system fundamentals.",
      "cert.osint.title": "OSINT Essentials Workshop",
      "cert.osint.desc": "Completed the “Exploring Reconnaissance: OSINT Essentials” workshop with the University of Bahrain Cybersecurity Club (2024).",
      "cert.startup.title": "StartUp Bahrain @ University of Bahrain",
      "cert.startup.desc": "Participated in StartUp Bahrain’s University of Bahrain program, focused on entrepreneurship and startup skills (May 2026).",
      "cert.jp.title": "Website Development — EFE × J.P. Morgan",
      "cert.jp.desc": "Completed a website development program with Education For Employment in partnership with J.P. Morgan.",

      "work.label": "Work",
      "work.title": "Technical Work",
      "work.intro": "Security reports, software builds, and mobile applications from my studies and hands-on work.",
      "work.reports": "Tech Reports",
      "work.software": "Software Projects",
      "work.mobile": "Mobile Applications",
      "work.viewAll": "View all",

      "skills.label": "Skills",
      "skills.title": "Technical Stack",
      "skills.programming": "Programming",
      "skills.frameworks": "Frameworks & Tools",
      "skills.expertise": "Expertise",
      "skills.cyber": "Cybersecurity",
      "skills.fullstack": "Full Stack Dev",
      "skills.mobile": "Mobile Apps",
      "skills.db": "Database Design",
      "skills.risk": "Risk Assessment",
      "skills.it": "IT Coordination",

      "contact.label": "Contact",
      "contact.title": "Get in Touch",
      "contact.intro": "Interested in cybersecurity, development, or collaboration? I'd love to connect.",
      "contact.email": "Email",
      "contact.phone": "Phone",
      "contact.linkedin": "LinkedIn",
      "contact.resume": "Resume",
      "contact.viewCv": "View CV (PDF)",
      "contact.downloadCv": "Download CV (PDF)",

      "footer.about": "About",
      "footer.experience": "Experience",
      "footer.reports": "Tech Reports",
      "footer.software": "Software",
      "footer.mobile": "Mobile",
      "footer.contact": "Contact",

      "page.reports.label": "Tech Reports",
      "page.reports.title": "Technical Reports",
      "page.reports.desc": "Security assessments, audit plans, and research reports from academic and applied work.",
      "page.software.label": "Software",
      "page.software.title": "Software Engineering Projects",
      "page.software.desc": "Applications, APIs, and tools built with modern technology stacks.",
      "page.mobile.label": "Mobile",
      "page.mobile.title": "Mobile Application Projects",
      "page.mobile.desc": "Flutter and React Native apps — games, utilities, and secure messaging built for iOS and Android.",
      "page.projects.count": "projects.",

      "cat.report": "Tech Report",
      "cat.coding": "Software",
      "cat.mobile": "Mobile App",
      "cat.readReport": "Read report",
      "cat.viewProject": "View project",
      "cat.viewApp": "View app",
      "cat.backReports": "All Tech Reports",
      "cat.backSoftware": "All Software Projects",
      "cat.backMobile": "All Mobile Apps",
      "cat.backReportsBtn": "Back to Tech Reports",
      "cat.backSoftwareBtn": "Back to Software",
      "cat.backMobileBtn": "Back to Mobile Apps",

      "loading.projects": "Loading projects…",
      "loading.project": "Loading project…",
      "empty.reports": "No tech reports yet.",
      "empty.software": "No software projects yet.",
      "empty.mobile": "No mobile apps yet.",
      "error.projects": "Unable to load projects. Please try again later.",
      "error.project": "Unable to load project. Please try again later.",
      "error.notFound": "Project not found.",
      "error.noSlug": "No project specified.",

      "detail.demoVideo": "Demo Video",
      "detail.screenRecording": "Screen Recording",
      "detail.openYoutube": "Open on YouTube",
      "detail.openDrive": "Open in Google Drive",
      "detail.watchDemo": "Watch Demo",
      "detail.documents": "Report Documents",
      "detail.viewReport": "View Report",
      "detail.viewRepo": "View Repository",
      "detail.readFull": "Read Full Report",
      "detail.visitSite": "Visit Live Site",
    },

    ar: {
      "nav.about": "نبذة عني",
      "nav.experience": "الخبرات",
      "nav.reports": "التقارير التقنية",
      "nav.software": "البرمجيات",
      "nav.mobile": "الجوال",
      "nav.skills": "المهارات",
      "nav.contact": "تواصل",
      "nav.aria": "القائمة الرئيسية",
      "theme.toggle": "تبديل المظهر",
      "menu.toggle": "فتح القائمة",
      "lang.toggle": "EN",
      "lang.aria": "التبديل إلى الإنجليزية",

      "hero.badge": "متاحة للفرص",
      "hero.greeting": "مرحباً، أنا <em>دانة حسين الحايكي</em>",
      "hero.title": "تأمين الأنظمة، و<span class=\"text-gradient\">بناء برمجيات</span> قابلة للتوسع",
      "hero.subtitle": "أمن سيبراني ومطوّرة Full Stack",
      "hero.description": "متخصصة تقنية ديناميكية ومتفانية بشغف لا حدود له تجاه التكنولوجيا. حاصلة على بكالوريوس في الأمن السيبراني ودبلوم في تطوير Full Stack، مع إتقان لغات برمجة متعددة وانخراط عميق في مجال الأمن السيبراني المتطور. بمعرفة تمتد عبر الشبكات ونظم المعلومات وعلوم الحاسوب، تتميز كمتخصصة متعددة المهارات، مدفوعة بالحماس والعزيمة لبناء مسار مهني واثق ومبتكر.",
      "hero.btn.reports": "التقارير التقنية",
      "hero.btn.software": "المشاريع البرمجية",
      "hero.btn.viewCv": "عرض السيرة",
      "hero.btn.downloadCv": "تحميل السيرة",
      "hero.stat.reports": "التقارير",
      "hero.stat.software": "البرمجيات",
      "hero.stat.mobile": "الجوال",
      "hero.stat.total": "إجمالي المشاريع",
      "hero.stats.aria": "توزيع المشاريع",

      "about.label": "نبذة عني",
      "about.title": "الخلفية التقنية",
      "about.location": "عراد، المحرق · البحرين",
      "about.p1": "أنا متخصصة تقنية ديناميكية ومتفانية بشغف يمتد عبر الأمن السيبراني وتطوير Full Stack وتطبيقات الجوال. أجمع بين الهندسة العملية وأساس قوي في الشبكات ونظم المعلومات وعلوم الحاسوب.",
      "about.p2": "حصلت على بكالوريوس الأمن السيبراني من جامعة البحرين بمعدل تراكمي جيد جدًا 3.26 من 4، ودبلوم تطوير Full Stack والجوال من Reboot01. تطوعت في المؤتمر العربي الدولي للأمن السيبراني (AICS) وفي ألعاب الشباب الآسيوية (BAYG) ضمن فريق تقنية المعلومات.",
      "about.h1.title": "الأمن السيبراني",
      "about.h1.desc": "تقييم المخاطر، تطوير البرمجيات الآمنة، وأطر الامتثال المؤسسي.",
      "about.h2.title": "تطوير Full Stack",
      "about.h2.desc": "واجهات REST، الأنظمة الفورية، تصميم قواعد البيانات، والنشر بالحاويات.",
      "about.h3.title": "الجوال وأمن الذكاء الاصطناعي",
      "about.h3.desc": "تطبيقات Flutter مع التشفير من طرف إلى طرف، وأدوات أمنية مدعومة بالذكاء الاصطناعي.",

      "exp.label": "الخبرات",
      "exp.title": "التدريب والتطوع",
      "exp.intro": "تدريب مهني، شهادات، خبرة في القطاع العام، وأعمال تطوعية تدعم الفعاليات والبرامج المجتمعية في البحرين.",
      "exp.badge.training": "تدريب",
      "exp.badge.volunteer": "تطوع",
      "exp.moi.role": "متدربة تقنية معلومات",
      "exp.moi.org": "وزارة الداخلية",
      "exp.moi.date": "يونيو 2026 – أغسطس 2026",
      "exp.moi.1": "ساهمت في الأنشطة الإدارية والتشغيلية اليومية داخل مؤسسة حكومية.",
      "exp.moi.2": "ساعدت في تنظيم ومراجعة وحفظ الوثائق والسجلات الرسمية.",
      "exp.moi.3": "اكتسبت معرفة بالإجراءات الرسمية ومتطلبات الامتثال ومعايير العمل في القطاع العام.",
      "exp.moi.4": "دعمت إعداد وتنسيق ومعالجة المراسلات والتقارير الرسمية.",
      "exp.moi.5": "عززت الاهتمام بالتفاصيل والتنظيم والثقة في العمل ضمن سير عمل منظم.",
      "exp.moi.cert": "عرض شهادة التدريب",
      "exp.yc.role": "منظمة لجنة المضيفين",
      "exp.yc.org": "مدينة الشباب 2030",
      "exp.yc.date": "يوليو 2026 – أغسطس 2026",
      "exp.yc.1": "نسّقت عمليات الاستضافة لفعاليات مدينة الشباب 2030 ودعم تدفق الزوار وأنشطة اللجنة.",
      "exp.yc.2": "بنيت أدوات رقمية لأتمتة تسجيل الزوار وتتبعهم وتقليل العمل الإداري اليدوي.",
      "exp.yc.3": "صممت نظام تسجيل عبر Google Forms مع Sheets وApps Script لإدارة الطاقة الاستيعابية اليومية وتحديث سجلات التسجيل.",
      "exp.yc.4": "طورت نظام تتبع زوار يراعي الخصوصية بمعرفات فريدة، مع مراقبة الإشغال المباشر ومؤقتات جلسة 45 دقيقة وتنبيهات الوقت الإضافي.",
      "exp.yc.cert": "عرض شهادة التطوع",
      "exp.aics.role": "منظمة ورشة عمل",
      "exp.aics.org": "المؤتمر والمعرض العربي الدولي للأمن السيبراني (AICS)",
      "exp.aics.date": "نوفمبر 2025",
      "exp.aics.1": "تطوعت كمنظمة لورشة جامعة البحرين في مؤتمر إقليمي كبير للأمن السيبراني.",
      "exp.aics.2": "دعمت تنسيق الورشة واللوجستيات الميدانية وضمان سير برنامج المؤتمر بسلاسة.",
      "exp.aics.3": "اكتسبت خبرة في فعاليات الأمن السيبراني المهنية والتواصل وعمليات الفعاليات الكبرى.",
      "exp.bayg.role": "منظمة فريق تقنية المعلومات",
      "exp.bayg.org": "ألعاب الشباب الآسيوية في البحرين (BAYG)",
      "exp.bayg.date": "أكتوبر 2025",
      "exp.bayg.1": "تطوعت مع فريق تقنية المعلومات كمنظمة خلال ألعاب الشباب الآسيوية في البحرين.",
      "exp.bayg.2": "ساعدت في الدعم التقني والتشغيلي لضمان استمرارية خدمات تقنية المعلومات للفعالية.",
      "exp.bayg.3": "طورت مهارات العمل الجماعي والتواصل وحل المشكلات في بيئة سريعة وعالية الظهور.",
      "exp.bayg.cert": "عرض شهادة التطوع",

      "cert.title": "الشهادات",
      "cert.grad.title": "إفادة تخرج — جامعة البحرين",
      "cert.grad.desc": "بكالوريوس الأمن السيبراني بمعدل تراكمي جيد جدًا 3.26 من 4.",
      "cert.transcript.title": "كشف الدرجات الرسمي",
      "cert.transcript.desc": "كشف درجات جامعة البحرين بمعدل تراكمي 3.26 من 4.00.",
      "cert.ai.title": "المشاركة في تحدي الذكاء الاصطناعي",
      "cert.ai.desc": "شاركت في تحدي الذكاء الاصطناعي الذي نظمته هيئة المعلومات والحكومة الإلكترونية بالتعاون مع الأكاديمية الملكية للشرطة (يناير 2026).",
      "cert.hcia.title": "اختبار HCIA openEuler MOOC",
      "cert.hcia.desc": "أكملت اختبار Huawei HCIA openEuler MOOC حول أساسيات لينكس وأنظمة التشغيل مفتوحة المصدر.",
      "cert.osint.title": "ورشة أساسيات OSINT",
      "cert.osint.desc": "أكملت ورشة «استكشاف الاستطلاع: أساسيات OSINT» مع نادي الأمن السيبراني في جامعة البحرين (2024).",
      "cert.startup.title": "ستارت أب البحرين @ جامعة البحرين",
      "cert.startup.desc": "شاركت في برنامج ستارت أب البحرين في جامعة البحرين، مع التركيز على ريادة الأعمال ومهارات الشركات الناشئة (مايو 2026).",
      "cert.jp.title": "تطوير المواقع — EFE × J.P. Morgan",
      "cert.jp.desc": "أكملت برنامج تطوير مواقع مع Education For Employment بالشراكة مع J.P. Morgan.",

      "work.label": "الأعمال",
      "work.title": "الأعمال التقنية",
      "work.intro": "تقارير أمنية، مشاريع برمجية، وتطبيقات جوال من دراستي وعملي العملي.",
      "work.reports": "التقارير التقنية",
      "work.software": "المشاريع البرمجية",
      "work.mobile": "تطبيقات الجوال",
      "work.viewAll": "عرض الكل",

      "skills.label": "المهارات",
      "skills.title": "المكدس التقني",
      "skills.programming": "البرمجة",
      "skills.frameworks": "الأطر والأدوات",
      "skills.expertise": "الخبرات",
      "skills.cyber": "الأمن السيبراني",
      "skills.fullstack": "تطوير Full Stack",
      "skills.mobile": "تطبيقات الجوال",
      "skills.db": "تصميم قواعد البيانات",
      "skills.risk": "تقييم المخاطر",
      "skills.it": "تنسيق تقنية المعلومات",

      "contact.label": "تواصل",
      "contact.title": "للتواصل معي",
      "contact.intro": "مهتم بالأمن السيبراني أو التطوير أو التعاون؟ يسعدني التواصل.",
      "contact.email": "البريد",
      "contact.phone": "الهاتف",
      "contact.linkedin": "لينكدإن",
      "contact.resume": "السيرة الذاتية",
      "contact.viewCv": "عرض السيرة (PDF)",
      "contact.downloadCv": "تحميل السيرة (PDF)",

      "footer.about": "نبذة عني",
      "footer.experience": "الخبرات",
      "footer.reports": "التقارير التقنية",
      "footer.software": "البرمجيات",
      "footer.mobile": "الجوال",
      "footer.contact": "تواصل",

      "page.reports.label": "التقارير التقنية",
      "page.reports.title": "التقارير التقنية",
      "page.reports.desc": "تقييمات أمنية وخطط تدقيق وتقارير بحثية من العمل الأكاديمي والتطبيقي.",
      "page.software.label": "البرمجيات",
      "page.software.title": "مشاريع هندسة البرمجيات",
      "page.software.desc": "تطبيقات وواجهات برمجية وأدوات مبنية بمكدسات تقنية حديثة.",
      "page.mobile.label": "الجوال",
      "page.mobile.title": "مشاريع تطبيقات الجوال",
      "page.mobile.desc": "تطبيقات Flutter و React Native — ألعاب وأدوات ومراسلة آمنة لنظامي iOS و Android.",
      "page.projects.count": "مشاريع.",

      "cat.report": "تقرير تقني",
      "cat.coding": "برمجيات",
      "cat.mobile": "تطبيق جوال",
      "cat.readReport": "قراءة التقرير",
      "cat.viewProject": "عرض المشروع",
      "cat.viewApp": "عرض التطبيق",
      "cat.backReports": "كل التقارير التقنية",
      "cat.backSoftware": "كل المشاريع البرمجية",
      "cat.backMobile": "كل تطبيقات الجوال",
      "cat.backReportsBtn": "العودة إلى التقارير التقنية",
      "cat.backSoftwareBtn": "العودة إلى البرمجيات",
      "cat.backMobileBtn": "العودة إلى تطبيقات الجوال",

      "loading.projects": "جاري تحميل المشاريع…",
      "loading.project": "جاري تحميل المشروع…",
      "empty.reports": "لا توجد تقارير تقنية بعد.",
      "empty.software": "لا توجد مشاريع برمجية بعد.",
      "empty.mobile": "لا توجد تطبيقات جوال بعد.",
      "error.projects": "تعذر تحميل المشاريع. حاول مرة أخرى لاحقاً.",
      "error.project": "تعذر تحميل المشروع. حاول مرة أخرى لاحقاً.",
      "error.notFound": "المشروع غير موجود.",
      "error.noSlug": "لم يُحدد مشروع.",

      "detail.demoVideo": "فيديو العرض",
      "detail.screenRecording": "تسجيل الشاشة",
      "detail.openYoutube": "فتح على يوتيوب",
      "detail.openDrive": "فتح في Google Drive",
      "detail.watchDemo": "مشاهدة العرض",
      "detail.documents": "مستندات التقرير",
      "detail.viewReport": "عرض التقرير",
      "detail.viewRepo": "عرض المستودع",
      "detail.readFull": "قراءة التقرير الكامل",
      "detail.visitSite": "زيارة الموقع",
    },
  };

  function getPreferredLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ar") return stored;
    return "en";
  }

  function applyDocumentLang(lang) {
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    html.setAttribute("data-lang", lang);
  }

  function t(key) {
    const lang = document.documentElement.getAttribute("data-lang") || "en";
    return (strings[lang] && strings[lang][key]) || strings.en[key] || key;
  }

  function applyTranslations(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = t(key);
      if (value) el.textContent = value;
    });
    scope.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const value = t(key);
      if (value) el.innerHTML = value;
    });
    scope.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const value = t(key);
      if (value) el.setAttribute("aria-label", value);
    });
    scope.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      const value = t(key);
      if (value) el.setAttribute("title", value);
    });

    const langBtn = document.querySelector(".lang-toggle");
    if (langBtn) {
      langBtn.textContent = t("lang.toggle");
      langBtn.setAttribute("aria-label", t("lang.aria"));
      langBtn.setAttribute("title", t("lang.aria"));
    }
  }

  function localizeProject(project) {
    if (!project) return project;
    const lang = document.documentElement.getAttribute("data-lang") || "en";
    if (lang !== "ar") return project;

    const ar = (window.PORTFOLIO_PROJECTS_AR || {})[project.slug];
    if (!ar) return project;

    return {
      ...project,
      title: ar.title || project.title,
      description: ar.description || project.description,
      content: ar.content || project.content,
    };
  }

  window.portfolioI18n = {
    get: getPreferredLang,
    t,
    apply: applyTranslations,
    localizeProject,
    set(lang) {
      if (lang !== "en" && lang !== "ar") return;
      localStorage.setItem(STORAGE_KEY, lang);
      applyDocumentLang(lang);
      applyTranslations();
      window.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
    },
    toggle() {
      const current = document.documentElement.getAttribute("data-lang") || "en";
      const next = current === "ar" ? "en" : "ar";
      window.portfolioI18n.set(next);
      return next;
    },
  };

  applyDocumentLang(getPreferredLang());
})();
