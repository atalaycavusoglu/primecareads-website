import type { Lang } from "@/i18n";

export type Service = {
  /** Shared by the TR and EN versions; also picks the icon. */
  key: "ads" | "seo" | "social" | "email" | "data" | "training";
  lang: Lang;
  slug: string;
  title: string;
  /** One line for the services list. */
  text: string;
  /** Three short bullets for the services list. */
  points: string[];
  metaDescription: string;
  intro: string;
  deliverables: { t: string; d: string }[];
  kpis: string[];
  faqs: [string, string][];
};

export const services: Service[] = [
  {
    key: "ads",
    lang: "tr",
    slug: "performans-reklamlari",
    title: "Performans reklamları",
    text: "Google Ads, Meta ve Amazon, Hepsiburada, Trendyol, Etsy reklamları.",
    points: ["Arama, Alışveriş, Performance Max ve YouTube kampanyaları", "Facebook ve Instagram’da katalog ve lead reklamları", "Pazaryeri ürün reklamları ve raf payı takibi"],
    metaDescription: "Google Ads, Meta ve pazaryeri reklamlarını satış, nitelikli lead ve pazar payı hedefiyle yönetiyoruz.",
    intro: "Reklam hesaplarınızı tıklama ya da form sayısına göre değil, satışa, nitelikli görüşmeye ve rakiplerinize göre payınıza göre yönetiyoruz. Bütçe, en çok getiri bırakan kanala ve ürüne her hafta yeniden dağıtılır.",
    deliverables: [
      { t: "Google Ads", d: "Arama, Alışveriş, Performance Max, Demand Gen ve YouTube kampanyalarının kurulumu ve yönetimi." },
      { t: "Meta reklamları", d: "Facebook ve Instagram’da katalog, lead ve video kampanyaları; Conversions API kurulumu." },
      { t: "Pazaryeri reklamları", d: "Trendyol, Hepsiburada, Amazon ve Etsy’de ürün reklamları ve arama sırası takibi." },
      { t: "Bütçe ve teklif yönetimi", d: "Stok, marj ve lead puanı verisiyle haftalık bütçe kararları." },
    ],
    kpis: ["Satış ve ürün bazında ROAS", "Nitelikli görüşme başı maliyet", "Gösterim payı ve pazaryeri raf payı"],
    faqs: [
      ["Minimum reklam bütçesi var mı?", "Sabit bir alt sınırımız yok. Görüşmede hedefinize ve sektörünüze göre anlamlı sonuç verecek bütçeyi birlikte belirliyoruz."],
      ["Mevcut hesaplarımızla mı çalışıyorsunuz?", "Evet. Hesaplar ve tüm veri sizde kalır; biz yönetici erişimiyle çalışırız."],
      ["Kampanyaları ne sıklıkla optimize ediyorsunuz?", "Sapmaları her gün izliyoruz; bütçe ve teklif kararlarını haftalık toplantıda alıyoruz."],
    ],
  },
  {
    key: "ads",
    lang: "en",
    slug: "performance-advertising",
    title: "Performance advertising",
    text: "Google Ads, Meta, and ads on Amazon, Hepsiburada, Trendyol and Etsy.",
    points: ["Search, Shopping, Performance Max and YouTube campaigns", "Catalogue and lead ads on Facebook and Instagram", "Marketplace product ads and shelf share tracking"],
    metaDescription: "We run Google Ads, Meta and marketplace ads for sales, qualified leads and market share.",
    intro: "We manage your ad accounts by sales, qualified meetings and your share against competitors, not by clicks or form counts. The budget is redistributed every week to the channel and product that return the most.",
    deliverables: [
      { t: "Google Ads", d: "Setting up and running Search, Shopping, Performance Max, Demand Gen and YouTube campaigns." },
      { t: "Meta ads", d: "Catalogue, lead and video campaigns on Facebook and Instagram; Conversions API setup." },
      { t: "Marketplace ads", d: "Product ads and search rank tracking on Trendyol, Hepsiburada, Amazon and Etsy." },
      { t: "Budget and bidding", d: "Weekly budget decisions using stock, margin and lead score data." },
    ],
    kpis: ["Sales and ROAS per product", "Cost per qualified meeting", "Impression share and marketplace shelf share"],
    faqs: [
      ["Is there a minimum ad budget?", "We have no fixed minimum. In the meeting we agree on a budget that can give meaningful results for your goal and sector."],
      ["Do you work in our existing accounts?", "Yes. The accounts and all data stay yours; we work with manager access."],
      ["How often do you optimise campaigns?", "We watch for deviations every day and make budget and bidding decisions in a weekly meeting."],
    ],
  },
  {
    key: "seo",
    lang: "tr",
    slug: "seo-ve-yapay-zeka-aramasi",
    title: "SEO ve yapay zeka araması",
    text: "Teknik, yerel ve mobil SEO; ChatGPT, Gemini ve Google yapay zeka özetlerinde görünürlük.",
    points: ["Teknik SEO denetimi ve site hızı", "Yerel SEO ve Google İşletme Profili", "Yapay zeka yanıtlarında geçme oranı ölçümü"],
    metaDescription: "Teknik, yerel ve mobil SEO ile ChatGPT, Gemini ve Google yapay zeka özetlerinde marka görünürlüğü.",
    intro: "Müşterileriniz artık hem Google’da arıyor hem de yapay zeka asistanlarına soruyor. İki rafı birlikte ölçüyor, içerik ve teknik altyapıyı ikisinde de görünecek şekilde düzenliyoruz.",
    deliverables: [
      { t: "Teknik SEO", d: "Tarama, indeksleme, site hızı, yapılandırılmış veri ve mobil uyumluluk denetimi." },
      { t: "Yerel SEO", d: "Google İşletme Profili, yerel aramalar ve harita sonuçları." },
      { t: "İçerik ve anahtar kelime planı", d: "Müşterilerin sorduğu sorulara göre sayfa ve blog planı." },
      { t: "Yapay zeka görünürlüğü", d: "ChatGPT, Gemini ve Google yapay zeka özetlerinde düzenli ölçüm ve iyileştirme." },
    ],
    kpis: ["Organik trafik ve organik dönüşüm", "Marka araması payı", "Yapay zeka yanıtlarında geçme oranı"],
    faqs: [
      ["SEO sonuçları ne zaman görülür?", "Teknik düzeltmelerin etkisi birkaç hafta içinde, içerik çalışmalarının etkisi genellikle birkaç ay içinde görülür."],
      ["Yapay zeka görünürlüğünü nasıl ölçüyorsunuz?", "Sektörünüzdeki soruları asistanlara düzenli soruyor, markanızın ve rakiplerinizin kaç yanıtta geçtiğini kaydediyoruz."],
      ["Sitemizi siz mi değiştiriyorsunuz?", "Teknik değişiklikleri ekibinizle ya da yazılımcınızla birlikte uyguluyoruz; içerikleri biz hazırlayabiliriz."],
    ],
  },
  {
    key: "seo",
    lang: "en",
    slug: "seo-and-ai-search",
    title: "SEO and AI search",
    text: "Technical, local and mobile SEO; visibility in ChatGPT, Gemini and Google AI overviews.",
    points: ["Technical SEO audit and site speed", "Local SEO and Google Business Profile", "Measuring how often you appear in AI answers"],
    metaDescription: "Technical, local and mobile SEO, and brand visibility in ChatGPT, Gemini and Google AI overviews.",
    intro: "Your customers now search on Google and ask AI assistants. We measure both shelves together and shape your content and technical setup so you appear on both.",
    deliverables: [
      { t: "Technical SEO", d: "Crawling, indexing, site speed, structured data and mobile audit." },
      { t: "Local SEO", d: "Google Business Profile, local searches and map results." },
      { t: "Content and keyword plan", d: "A page and blog plan built on the questions customers ask." },
      { t: "AI visibility", d: "Regular measurement and improvement in ChatGPT, Gemini and Google AI overviews." },
    ],
    kpis: ["Organic traffic and organic conversions", "Brand search share", "Mention rate in AI answers"],
    faqs: [
      ["When do SEO results show?", "Technical fixes usually show within a few weeks; content work usually within a few months."],
      ["How do you measure AI visibility?", "We regularly put your sector’s questions to AI assistants and record how many answers mention you and your competitors."],
      ["Do you change our website?", "We apply technical changes together with your team or developer; we can write the content."],
    ],
  },
  {
    key: "social",
    lang: "tr",
    slug: "sosyal-medya-ve-icerik",
    title: "Sosyal medya ve içerik",
    text: "Strateji, içerik takvimi, video ve görsel üretimi.",
    points: ["Kanal stratejisi ve içerik takvimi", "Kısa video, Reels ve görsel üretimi", "Ses payı ve etkileşim raporu"],
    metaDescription: "Sosyal medya stratejisi, içerik takvimi, video ve görsel üretimi; etkisini ses payı ve marka aramasıyla ölçüyoruz.",
    intro: "Sosyal medya içeriğini beğeni sayısıyla değil, markanızı ne kadar büyüttüğüyle ölçüyoruz: ses payınız ve marka aramalarınızdaki değişim. İçerik takvimi bu veriye göre güncellenir.",
    deliverables: [
      { t: "Strateji", d: "Hangi kanalda, kime, hangi mesajla konuşacağınızı belirleyen kanal planı." },
      { t: "İçerik takvimi", d: "Aylık takvim, metinler ve yayın planı." },
      { t: "Video ve görsel üretimi", d: "Reels, kısa video ve kampanya görselleri." },
      { t: "Raporlama", d: "Erişim, etkileşim ve rakiplerle kıyaslı ses payı raporu." },
    ],
    kpis: ["Ses payı (share of voice)", "Marka araması artışı", "Etkileşim ve erişim"],
    faqs: [
      ["Hangi platformlarda çalışıyorsunuz?", "Ağırlıklı olarak Instagram, Facebook, YouTube ve LinkedIn; hedefinize göre seçiyoruz."],
      ["Çekimleri siz mi yapıyorsunuz?", "Kısa video ve görsel üretimini biz yapıyoruz; büyük prodüksiyonlarda iş ortaklarımızla çalışıyoruz."],
      ["Topluluk yönetimi dahil mi?", "Görüşmede ihtiyacınıza göre kapsamı birlikte belirliyoruz."],
    ],
  },
  {
    key: "social",
    lang: "en",
    slug: "social-media-and-content",
    title: "Social media and content",
    text: "Strategy, content calendar, video and visual production.",
    points: ["Channel strategy and content calendar", "Short video, Reels and visual production", "Share of voice and engagement reporting"],
    metaDescription: "Social media strategy, content calendar, video and visual production, measured by share of voice and brand search.",
    intro: "We measure social content by how much it grows your brand, not by likes: your share of voice and the change in brand searches. The content calendar is updated with that data.",
    deliverables: [
      { t: "Strategy", d: "A channel plan for where you speak, to whom and with which message." },
      { t: "Content calendar", d: "A monthly calendar, copy and publishing plan." },
      { t: "Video and visual production", d: "Reels, short videos and campaign visuals." },
      { t: "Reporting", d: "Reach, engagement and share of voice against competitors." },
    ],
    kpis: ["Share of voice", "Growth in brand searches", "Engagement and reach"],
    faqs: [
      ["Which platforms do you work on?", "Mainly Instagram, Facebook, YouTube and LinkedIn; we choose according to your goal."],
      ["Do you do the shoots?", "We produce short videos and visuals; for larger productions we work with partners."],
      ["Is community management included?", "We agree the scope in the meeting based on what you need."],
    ],
  },
  {
    key: "email",
    lang: "tr",
    slug: "e-posta-pazarlama",
    title: "E-posta pazarlama",
    text: "Segmentasyon, otomasyon ve A/B testiyle e-posta kampanyaları.",
    points: ["Müşteri segmentasyonu", "Hoş geldin, sepet hatırlatma ve geri kazanım akışları", "Konu satırı ve içerik A/B testleri"],
    metaDescription: "Segmentasyon, otomasyon akışları ve A/B testleriyle satış getiren e-posta pazarlaması.",
    intro: "E-posta, sahip olduğunuz en ucuz kanaldır. Müşterilerinizi davranışlarına göre gruplandırıyor, doğru anda otomatik giden akışlar kuruyor ve her gönderimi test ediyoruz.",
    deliverables: [
      { t: "Segmentasyon", d: "Satın alma geçmişi, ilgi alanı ve etkileşime göre müşteri grupları." },
      { t: "Otomasyon akışları", d: "Hoş geldin, sepet hatırlatma, satın alma sonrası ve geri kazanım akışları." },
      { t: "Kampanya e-postaları", d: "Tasarım, metin ve gönderim takvimi." },
      { t: "A/B testleri", d: "Konu satırı, içerik ve gönderim saati testleri." },
    ],
    kpis: ["E-postadan gelen satış", "Açılma ve tıklama oranı", "Liste büyümesi ve abonelikten çıkma oranı"],
    faqs: [
      ["Hangi e-posta araçlarıyla çalışıyorsunuz?", "Kullandığınız platformla çalışıyoruz; yoksa ihtiyacınıza uygun olanı birlikte seçiyoruz."],
      ["İzinli liste şart mı?", "Evet. Ticari e-postalar yalnızca onay vermiş kişilere ve İYS kaydıyla gönderilir."],
      ["Ne kadar sıklıkla gönderim yapılmalı?", "Sektöre ve listeye göre değişir; testlerle sizin için doğru sıklığı buluyoruz."],
    ],
  },
  {
    key: "email",
    lang: "en",
    slug: "email-marketing",
    title: "Email marketing",
    text: "Email campaigns with segmentation, automation and A/B testing.",
    points: ["Customer segmentation", "Welcome, basket reminder and win-back flows", "Subject line and content A/B tests"],
    metaDescription: "Email marketing that sells, with segmentation, automated flows and A/B tests.",
    intro: "Email is the cheapest channel you own. We group your customers by behaviour, build flows that go out automatically at the right moment and test every send.",
    deliverables: [
      { t: "Segmentation", d: "Customer groups by purchase history, interests and engagement." },
      { t: "Automated flows", d: "Welcome, basket reminder, post-purchase and win-back flows." },
      { t: "Campaign emails", d: "Design, copy and send calendar." },
      { t: "A/B tests", d: "Subject line, content and send time tests." },
    ],
    kpis: ["Sales from email", "Open and click rates", "List growth and unsubscribe rate"],
    faqs: [
      ["Which email tools do you use?", "We work in the platform you use; if you don’t have one we choose a suitable one together."],
      ["Do we need an opt-in list?", "Yes. Commercial emails go only to people who have consented, registered in Turkey’s IYS system."],
      ["How often should we send?", "It depends on the sector and list; we find the right frequency for you through tests."],
    ],
  },
  {
    key: "data",
    lang: "tr",
    slug: "veri-gorsellestirme",
    title: "Veri görselleştirme",
    text: "Tüm kanallar için tek dashboard; dijital check-up ile başlangıç.",
    points: ["Analytics, dönüşüm etiketi ve CRM kurulumu", "Tüm kanalları ve rakipleri gösteren tek pano", "Başlangıçta dijital check-up raporu"],
    metaDescription: "Analytics, dönüşüm etiketleri ve CRM kurulumuyla tüm kanallarınızı ve rakiplerinizi tek panoda görün.",
    intro: "Doğru karar doğru ölçümle başlar. Analytics, dönüşüm etiketleri, CRM ve pazaryeri verisini tek yerde topluyor; tüm kanallarınızı ve rakiplerinizi tek panoda gösteriyoruz.",
    deliverables: [
      { t: "Dijital check-up", d: "Mevcut ölçüm altyapınızın denetimi ve eksiklerin listesi." },
      { t: "Ölçüm kurulumu", d: "GA4, Google Tag Manager, dönüşüm etiketleri, Conversions API ve CRM bağlantısı." },
      { t: "Pano", d: "Tüm kanalları, ROAS’ı ve pazar payını yan yana gösteren tek dashboard." },
      { t: "Uyarılar", d: "Sapma olduğunda size ve ekibimize giden günlük uyarılar." },
    ],
    kpis: ["Ölçülen dönüşümlerin doğruluğu", "Kanal bazında getiri", "Rakiplere göre pazar payı"],
    faqs: [
      ["Hangi araçlarla pano kuruyorsunuz?", "Looker Studio gibi yaygın araçlarla; mevcut aracınız varsa onunla çalışıyoruz."],
      ["Verimiz nerede saklanıyor?", "Kendi hesaplarınızda. Panoya erişim size aittir."],
      ["Çerez onayı ve KVKK’ya uygun kurulum yapıyor musunuz?", "Evet. Etiketleri çerez onayına bağlı olarak (Consent Mode) kuruyoruz."],
    ],
  },
  {
    key: "data",
    lang: "en",
    slug: "data-visualisation",
    title: "Data visualisation",
    text: "One dashboard for every channel, starting with a digital check-up.",
    points: ["Analytics, conversion tag and CRM setup", "One dashboard showing every channel and competitor", "A digital check-up report to start"],
    metaDescription: "See every channel and competitor on one dashboard, with Analytics, conversion tags and CRM set up properly.",
    intro: "Good decisions start with good measurement. We bring Analytics, conversion tags, CRM and marketplace data into one place and show every channel and competitor on one dashboard.",
    deliverables: [
      { t: "Digital check-up", d: "An audit of your current measurement setup and a list of gaps." },
      { t: "Measurement setup", d: "GA4, Google Tag Manager, conversion tags, Conversions API and CRM connection." },
      { t: "Dashboard", d: "One dashboard with every channel, ROAS and market share side by side." },
      { t: "Alerts", d: "Daily alerts to you and our team when something deviates." },
    ],
    kpis: ["Accuracy of measured conversions", "Return by channel", "Market share against competitors"],
    faqs: [
      ["Which tools do you build dashboards with?", "Common tools such as Looker Studio; if you already have one we work with it."],
      ["Where is our data stored?", "In your own accounts. Access to the dashboard is yours."],
      ["Is the setup consent-compliant?", "Yes. We set up tags tied to cookie consent (Consent Mode)."],
    ],
  },
  {
    key: "training",
    lang: "tr",
    slug: "egitim",
    title: "Eğitim",
    text: "Dijital pazarlama, SEO, veri analizi ve yapay zeka eğitimleri.",
    points: ["Ekiplere uygulamalı reklam ve SEO eğitimi", "Veri analizi ve raporlama atölyeleri", "Pazarlamada yapay zeka kullanımı"],
    metaDescription: "Pazarlama ekipleri için uygulamalı dijital pazarlama, SEO, veri analizi ve yapay zeka eğitimleri.",
    intro: "Ekibinizin kendi hesaplarında uygulayarak öğrendiği eğitimler veriyoruz. İçerik ekibinizin seviyesine ve kullandığınız araçlara göre hazırlanır.",
    deliverables: [
      { t: "Reklam eğitimi", d: "Google Ads ve Meta reklamlarında kurulum, ölçüm ve optimizasyon." },
      { t: "SEO eğitimi", d: "Teknik SEO, içerik planı ve yapay zeka araması." },
      { t: "Veri analizi atölyesi", d: "GA4, raporlama ve pano okuma." },
      { t: "Pazarlamada yapay zeka", d: "İçerik, analiz ve raporlamada yapay zekayı güvenle kullanma." },
    ],
    kpis: ["Ekibin uygulayabildiği konular", "Eğitim sonrası hesap sağlığı", "Raporlama süresi"],
    faqs: [
      ["Eğitimler yüz yüze mi?", "Kadıköy’deki ofisimizde, sizin ofisinizde ya da çevrim içi yapılabilir."],
      ["Kaç kişilik gruplar için uygun?", "Küçük ekiplerle uygulamalı çalışmayı tercih ediyoruz; kapsamı görüşmede belirliyoruz."],
      ["Eğitim sonrası destek var mı?", "Görüşmede ihtiyacınıza göre takip oturumları planlayabiliriz."],
    ],
  },
  {
    key: "training",
    lang: "en",
    slug: "training",
    title: "Training",
    text: "Training in digital marketing, SEO, data analysis and AI.",
    points: ["Hands-on ads and SEO training for teams", "Data analysis and reporting workshops", "Using AI in marketing"],
    metaDescription: "Hands-on digital marketing, SEO, data analysis and AI training for marketing teams.",
    intro: "Our training has your team learn by doing, in your own accounts. The content is built around your team’s level and the tools you use.",
    deliverables: [
      { t: "Ads training", d: "Setup, measurement and optimisation in Google Ads and Meta." },
      { t: "SEO training", d: "Technical SEO, content planning and AI search." },
      { t: "Data analysis workshop", d: "GA4, reporting and reading dashboards." },
      { t: "AI in marketing", d: "Using AI safely in content, analysis and reporting." },
    ],
    kpis: ["Topics the team can apply", "Account health after training", "Time spent on reporting"],
    faqs: [
      ["Is training in person?", "At our office in Kadıköy, at yours, or online."],
      ["What group size suits it?", "We prefer hands-on work with small teams; we agree the scope in the meeting."],
      ["Is there support afterwards?", "We can plan follow-up sessions based on what you need."],
    ],
  },
];

export const servicesFor = (lang: Lang) => services.filter((s) => s.lang === lang);
export const findService = (lang: Lang, slug: string) => services.find((s) => s.lang === lang && s.slug === slug);
export const serviceTranslation = (s: Service) => services.find((x) => x.key === s.key && x.lang !== s.lang);
