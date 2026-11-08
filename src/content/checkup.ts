import type { Lang } from "@/i18n";

export type Area = "measure" | "search" | "shelf" | "ai" | "decide";

type Checkup = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  highlight: string;
  sub: string;
  start: string;
  duration: string;
  disclaimer: string;
  question: string;
  of: string;
  back: string;
  analysing: string;
  analysingSteps: string[];
  resultTitle: string;
  levels: { min: number; label: string; text: string }[];
  areasTitle: string;
  areas: Record<Area, string>;
  nextTitle: string;
  advice: Record<Area, string>;
  cta: string;
  ctaNote: string;
  restart: string;
  /** Sent with the contact form when the visitor comes from the test. */
  summaryLabel: string;
  questions: { area: Area; q: string; options: string[] }[];
};

export const checkup: Record<Lang, Checkup> = {
  tr: {
    meta: {
      title: "Dijital pazar payı check-up | PrimeCareAds",
      description: "8 soruda ölçüm, arama, pazaryeri, yapay zeka görünürlüğü ve karar sisteminizi değerlendirin.",
    },
    eyebrow: "Check-up",
    title: "Dijital pazar payınızı",
    highlight: "2 dakikada değerlendirin",
    sub: "8 soruyu yanıtlayın; ölçüm, arama, raf, yapay zeka görünürlüğü ve karar sisteminizin nerede durduğunu görün.",
    start: "Teste başlayın",
    duration: "8 soru · yaklaşık 2 dakika",
    disclaimer: "Sonuç yalnızca sizin yanıtlarınıza dayanır; bir analiz ya da garanti değildir. Yanıtlarınız kaydedilmez.",
    question: "Soru",
    of: "/",
    back: "Geri",
    analysing: "Yanıtlarınız değerlendiriliyor",
    analysingSteps: ["Ölçüm altyapısı", "Arama ve raf payı", "Yapay zeka görünürlüğü", "Karar sistemi"],
    resultTitle: "Check-up sonucunuz",
    levels: [
      { min: 0, label: "Başlangıç", text: "Ölçüm ve karar altyapınızda önemli boşluklar var. İyi haber: en hızlı gelişme bu aşamada görülür." },
      { min: 40, label: "Gelişiyor", text: "Temel ölçüm var, ama kararlar henüz rakiplere göre pay verisine dayanmıyor." },
      { min: 70, label: "Güçlü", text: "Güçlü bir sistem kurmuşsunuz. Sıradaki adım, kararları daha hızlı ve rakip verisiyle almak." },
    ],
    areasTitle: "Alan bazında",
    areas: { measure: "Ölçüm", search: "Arama payı", shelf: "Raf ve sosyal", ai: "Yapay zeka görünürlüğü", decide: "Karar sistemi" },
    nextTitle: "İlk adımlar",
    advice: {
      measure: "Önce ölçümü düzeltin: dönüşüm etiketlerini kurun, CRM’i reklam platformlarına bağlayın. Ölçülmeyen kanal için doğru karar verilemez.",
      search: "Google Ads Açık Artırma Analizi’ni ve marka araması trendinizi rakiplerinizle haftalık izlemeye başlayın.",
      shelf: "Pazaryeri kategori sıranızı ve sosyal medyadaki ses payınızı rakiplerle düzenli ölçün.",
      ai: "Sektörünüzdeki soruları yapay zeka asistanlarına düzenli sorun ve markanızın kaç yanıtta geçtiğini kaydedin.",
      decide: "Bütçe kararlarını haftalık bir döngüye bağlayın; ROAS’ı pazar payıyla birlikte okuyun ve sapmalar için günlük uyarı kurun.",
    },
    cta: "Sonucu görüşmede konuşalım",
    ctaNote: "Sonucunuz görüşme formuna eklenir; isterseniz silebilirsiniz.",
    restart: "Testi yeniden başlatın",
    summaryLabel: "Check-up sonucu",
    questions: [
      { area: "measure", q: "Reklamlardan gelen satış ya da lead’leri doğru ölçebiliyor musunuz?", options: ["Hayır, emin değiliz", "Kısmen, bazı kanallarda", "Evet, tüm kanallarda dönüşüm etiketleri kurulu", "Evet, CRM ve satış verisiyle eşleşiyor"] },
      { area: "measure", q: "Tüm kanallarınızı tek bir panoda görebiliyor musunuz?", options: ["Hayır, her platformu ayrı açıyoruz", "Elle bir tabloda topluyoruz", "Bir panomuz var ama düzenli güncellenmiyor", "Evet, güncel bir panomuz var"] },
      { area: "search", q: "Google Ads’de rakiplerinize göre gösterim payınızı biliyor musunuz?", options: ["Hayır", "Bakıyoruz ama düzenli değil", "Her ay bakıyoruz", "Her hafta, karar alırken kullanıyoruz"] },
      { area: "search", q: "Markanızın aranma hacmi rakiplerinize göre nasıl değişiyor?", options: ["Bilmiyoruz", "Sadece kendi trendimizi izliyoruz", "Rakiplerle ara sıra kıyaslıyoruz", "Rakiplerle düzenli kıyaslıyoruz"] },
      { area: "shelf", q: "Pazaryerlerinde ya da sosyal medyada rakiplerinize göre payınızı ölçüyor musunuz?", options: ["Hayır", "Sadece kendi satış ve etkileşimimize bakıyoruz", "Bazı rakipleri elle takip ediyoruz", "Raf payını ve ses payını düzenli ölçüyoruz"] },
      { area: "ai", q: "ChatGPT ya da Gemini’ye sektörünüzle ilgili bir soru sorulduğunda markanız geçiyor mu?", options: ["Hiç kontrol etmedik", "Bir kez baktık, geçmiyordu", "Bazen geçiyor, düzenli bakmıyoruz", "Düzenli ölçüyoruz"] },
      { area: "decide", q: "Bütçe kararlarını nasıl alıyorsunuz?", options: ["Her ay aynı bütçeyle devam ediyoruz", "Platformların önerilerine göre", "Ajans raporundaki ROAS’a göre", "ROAS ve pazar payına birlikte bakarak, haftalık"] },
      { area: "decide", q: "Bir kanalda performans düştüğünde ne kadar sürede fark ediyorsunuz?", options: ["Ay sonu raporunda", "Birkaç hafta içinde", "Birkaç gün içinde", "Aynı gün, otomatik uyarıyla"] },
    ],
  },
  en: {
    meta: {
      title: "Digital market share check-up | PrimeCareAds",
      description: "Assess your measurement, search, marketplace, AI visibility and decision system in 8 questions.",
    },
    eyebrow: "Check-up",
    title: "Assess your digital market share",
    highlight: "in 2 minutes",
    sub: "Answer 8 questions and see where your measurement, search, shelf, AI visibility and decision system stand.",
    start: "Start the test",
    duration: "8 questions · about 2 minutes",
    disclaimer: "The result is based only on your answers; it is not an analysis or a guarantee. Your answers are not stored.",
    question: "Question",
    of: "/",
    back: "Back",
    analysing: "Assessing your answers",
    analysingSteps: ["Measurement setup", "Search and shelf share", "AI visibility", "Decision system"],
    resultTitle: "Your check-up result",
    levels: [
      { min: 0, label: "Starting out", text: "There are big gaps in your measurement and decision setup. The good news: this is where progress comes fastest." },
      { min: 40, label: "Developing", text: "The basic measurement is there, but decisions don’t yet rely on share data against competitors." },
      { min: 70, label: "Strong", text: "You’ve built a strong system. The next step is deciding faster, with competitor data." },
    ],
    areasTitle: "By area",
    areas: { measure: "Measurement", search: "Search share", shelf: "Shelf and social", ai: "AI visibility", decide: "Decision system" },
    nextTitle: "First steps",
    advice: {
      measure: "Fix measurement first: set up conversion tags and connect your CRM to the ad platforms. You can’t decide well on a channel you don’t measure.",
      search: "Start tracking Google Ads Auction Insights and your brand search trend against competitors every week.",
      shelf: "Measure your marketplace category rank and your share of voice on social media against competitors regularly.",
      ai: "Put your sector’s questions to AI assistants regularly and record how many answers mention your brand.",
      decide: "Tie budget decisions to a weekly loop; read ROAS together with market share and set up daily alerts for deviations.",
    },
    cta: "Let’s discuss the result in a meeting",
    ctaNote: "Your result is added to the meeting form; you can delete it if you like.",
    restart: "Restart the test",
    summaryLabel: "Check-up result",
    questions: [
      { area: "measure", q: "Can you measure the sales or leads that come from your ads accurately?", options: ["No, we’re not sure", "Partly, on some channels", "Yes, conversion tags are set up on every channel", "Yes, matched with CRM and sales data"] },
      { area: "measure", q: "Can you see all your channels on one dashboard?", options: ["No, we open each platform separately", "We collect them by hand in a spreadsheet", "We have a dashboard but it isn’t kept up to date", "Yes, we have an up-to-date dashboard"] },
      { area: "search", q: "Do you know your Google Ads impression share against competitors?", options: ["No", "We look, but not regularly", "We check it monthly", "Weekly, and we use it to decide"] },
      { area: "search", q: "How is your brand’s search volume changing against your competitors’?", options: ["We don’t know", "We only track our own trend", "We compare with competitors now and then", "We compare with competitors regularly"] },
      { area: "shelf", q: "Do you measure your share against competitors on marketplaces or social media?", options: ["No", "We only look at our own sales and engagement", "We track some competitors by hand", "We measure shelf share and share of voice regularly"] },
      { area: "ai", q: "When someone asks ChatGPT or Gemini a question about your sector, does your brand come up?", options: ["We’ve never checked", "We checked once; it didn’t", "Sometimes; we don’t check regularly", "We measure it regularly"] },
      { area: "decide", q: "How do you make budget decisions?", options: ["We keep the same budget every month", "By following the platforms’ recommendations", "By the ROAS in the agency report", "Weekly, looking at ROAS and market share together"] },
      { area: "decide", q: "When performance drops on a channel, how quickly do you notice?", options: ["In the month-end report", "Within a few weeks", "Within a few days", "The same day, with an automatic alert"] },
    ],
  },
};
