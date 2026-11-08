import type { Lang } from "@/i18n";

export type Block =
  | { t: "p"; x: string }
  | { t: "h2"; x: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: { t: string; d: string }[] }
  | { t: "note"; x: string };

export type Post = {
  /** Shared by the TR and EN versions of the same article. */
  key: string;
  lang: Lang;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  minutes: number;
  body: Block[];
};

/*
 * Starter articles written for launch. Dates are publish dates set at launch;
 * no client results or invented figures appear in them.
 */
export const posts: Post[] = [
  {
    key: "roas",
    lang: "tr",
    slug: "roas-tek-basina-yetmez",
    title: "ROAS tek başına neden yetmez?",
    description: "Reklam getirisi yükselirken pazar payınız düşebilir. ROAS’ı rakiplerle kıyaslı pazar payıyla birlikte okumanın yolu.",
    category: "Ölçüm",
    date: "2026-10-14",
    minutes: 5,
    body: [
      { t: "p", x: "Ajans raporlarının çoğu aynı soruyla başlar: Bu ay ROAS kaç oldu? Soru önemli ama tek başına yanıltıcı. ROAS, harcadığınız her liranın kaç lira satış getirdiğini söyler; rakiplerinize göre büyüyüp büyümediğinizi söylemez." },
      { t: "h2", x: "ROAS’ın görmediği şey" },
      { t: "p", x: "ROAS’ı yükseltmenin en kolay yolu, harcamayı sizi zaten tanıyan kişilere kaydırmaktır: marka aramalarına ve yeniden pazarlamaya. Rapor güzel görünür ama yeni müşteri kazanmazsınız. Aynı dönemde rakibiniz genel aramalarda gösterim payını artırıyorsa, birkaç ay sonra marka aramalarınız da azalmaya başlar." },
      { t: "p", x: "Kısacası ROAS içe dönük bir ölçüdür: kendi kampanyanızın verimini gösterir. Pazar payı dışa dönüktür: rafın ne kadarının sizde olduğunu gösterir." },
      { t: "h2", x: "Pazar payını hangi verilerle ölçüyoruz?" },
      {
        t: "ul",
        items: [
          "Google Ads gösterim payı ve Açık Artırma Analizi: aynı aramalarda rakiplerinizin ne sıklıkla göründüğü.",
          "Marka araması payı: sizin ve rakiplerinizin markasının ne kadar arandığı.",
          "Pazaryeri raf payı: Trendyol, Hepsiburada ve Amazon’da kategori aramalarında ürünlerinizin sırası.",
          "Yapay zeka yanıt payı: ChatGPT ve Gemini’ye sorulan sektör sorularında markanızın geçme oranı.",
        ],
      },
      { t: "h2", x: "İkisini birlikte okumak" },
      { t: "p", x: "Haftalık raporda ROAS ve pazar payı yan yana durur. Karşınıza dört durumdan biri çıkar:" },
      {
        t: "ol",
        items: [
          { t: "ROAS yükseliyor, pay yükseliyor", d: "Büyüme sağlıklı; bütçe artırılabilir." },
          { t: "ROAS yükseliyor, pay düşüyor", d: "Kampanya daralıyor; yeni müşteri getiren kanallara pay ayrılmalı." },
          { t: "ROAS düşüyor, pay yükseliyor", d: "Büyümenin bedeli ödeniyor; marjın bunu kaldırıp kaldırmadığına bakılmalı." },
          { t: "İkisi de düşüyor", d: "Önce ölçüm altyapısı, sonra kreatif ve teklif stratejisi kontrol edilmeli." },
        ],
      },
      { t: "p", x: "Bu dört durumdan hangisinde olduğunuzu bilmeden bütçe kararı vermek, haritasız yol almaya benzer." },
      { t: "note", x: "ROAS’ı takip edin ama tek başına okumayın. Kararı her zaman rakiplerinize göre payınızla birlikte verin." },
    ],
  },
  {
    key: "roas",
    lang: "en",
    slug: "roas-is-not-enough",
    title: "Why ROAS alone isn’t enough",
    description: "Your return on ad spend can rise while your market share falls. How to read ROAS together with market share against competitors.",
    category: "Measurement",
    date: "2026-10-14",
    minutes: 5,
    body: [
      { t: "p", x: "Most agency reports open with the same question: what was ROAS this month? It’s a fair question, but on its own it misleads. ROAS tells you how much revenue each unit of spend brought in. It doesn’t tell you whether you’re growing against your competitors." },
      { t: "h2", x: "What ROAS can’t see" },
      { t: "p", x: "The easiest way to raise ROAS is to move spend towards people who already know you: brand searches and remarketing. The report looks good, but you don’t win new customers. If a competitor is raising its impression share on generic searches at the same time, your brand searches start to shrink a few months later." },
      { t: "p", x: "In short, ROAS looks inward: it shows how efficient your own campaign is. Market share looks outward: it shows how much of the shelf is yours." },
      { t: "h2", x: "Which data do we use to measure market share?" },
      {
        t: "ul",
        items: [
          "Google Ads impression share and Auction Insights: how often competitors appear on the same searches.",
          "Brand search share: how much your brand is searched compared with your competitors’.",
          "Marketplace shelf share: where your products rank in category searches on Trendyol, Hepsiburada and Amazon.",
          "AI answer share: how often your brand appears when sector questions are put to ChatGPT and Gemini.",
        ],
      },
      { t: "h2", x: "Reading them together" },
      { t: "p", x: "In the weekly report ROAS and market share sit side by side. You’ll find yourself in one of four situations:" },
      {
        t: "ol",
        items: [
          { t: "ROAS up, share up", d: "Growth is healthy; the budget can go up." },
          { t: "ROAS up, share down", d: "The campaign is narrowing; give more to channels that bring new customers." },
          { t: "ROAS down, share up", d: "You’re paying for growth; check whether your margin can carry it." },
          { t: "Both down", d: "Check the measurement setup first, then creative and bidding strategy." },
        ],
      },
      { t: "p", x: "Making budget decisions without knowing which of these four you’re in is like driving without a map." },
      { t: "note", x: "Track ROAS, but never read it alone. Always decide with your share against competitors beside it." },
    ],
  },
  {
    key: "ai",
    lang: "tr",
    slug: "yapay-zeka-markanizi-oneriyor-mu",
    title: "Yapay zeka markanızı öneriyor mu?",
    description: "ChatGPT, Gemini ve Google’ın yapay zeka özetlerinde markanızın ne sıklıkla geçtiğini ölçmenin ve artırmanın yolu.",
    category: "Yapay zeka araması",
    date: "2026-10-28",
    minutes: 6,
    body: [
      { t: "p", x: "Müşterileriniz artık yalnızca Google’da arama yapmıyor. “Hassas cilt için hangi nemlendirici?” gibi soruları ChatGPT’ye ya da Gemini’ye soruyor, ya da yanıtı Google’ın yapay zeka özetinde okuyor. Bu yanıtlarda adınız geçmiyorsa, o müşteri için yoksunuz." },
      { t: "h2", x: "Görünürlüğü nasıl ölçüyoruz?" },
      {
        t: "ol",
        items: [
          { t: "Soru setini çıkarıyoruz", d: "Sektörünüzde müşterilerin sorduğu soruları arama verisinden ve satış ekibinizin notlarından derliyoruz." },
          { t: "Soruları düzenli soruyoruz", d: "Aynı soruları ChatGPT, Gemini ve Google’ın yapay zeka özetlerinde belirli aralıklarla tekrar soruyoruz. Yanıtlar değiştiği için tek ölçüm yeterli değil." },
          { t: "Geçme oranını hesaplıyoruz", d: "Markanızın kaç yanıtta, hangi sırada ve hangi kaynakla anıldığını kaydediyoruz." },
          { t: "Rakiplerle kıyaslıyoruz", d: "Aynı yanıtlarda rakiplerinizin geçme oranını da ölçüyor, sonucu pay olarak raporluyoruz." },
        ],
      },
      { t: "h2", x: "Görünürlüğü ne artırır?" },
      { t: "p", x: "Yapay zeka asistanları yanıtlarını web’deki içeriklerden derler. Bu yüzden klasik SEO’nun temelleri burada da geçerli; bunlara birkaç yenisi ekleniyor:" },
      {
        t: "ul",
        items: [
          "Sık sorulan soruları açık ve doğrudan yanıtlayan sayfalar.",
          "Ürün ve hizmet bilgilerinin yapılandırılmış veriyle işaretlenmesi.",
          "Markanızın bağımsız sitelerde, karşılaştırma yazılarında ve listelerde anılması.",
          "Tutarlı marka bilgisi: adres, kategori ve ürün adları her yerde aynı olmalı.",
        ],
      },
      { t: "p", x: "Bu çalışmanın etkisi bir günde görülmez; bu yüzden ölçümü düzenli tekrarlamak ve değişimi rakiplerinizle birlikte izlemek önemlidir." },
      { t: "note", x: "Yapay zeka yanıtları yeni bir raf. Önce ölçün, sonra içerik ve SEO planını bu ölçüme göre güncelleyin." },
    ],
  },
  {
    key: "ai",
    lang: "en",
    slug: "does-ai-recommend-your-brand",
    title: "Does AI recommend your brand?",
    description: "How to measure, and raise, how often your brand appears in ChatGPT, Gemini and Google’s AI overviews.",
    category: "AI search",
    date: "2026-10-28",
    minutes: 6,
    body: [
      { t: "p", x: "Your customers no longer search only on Google. They ask ChatGPT or Gemini questions like “Which moisturiser is best for sensitive skin?”, or read the answer in Google’s AI overview. If your name isn’t in those answers, you don’t exist for that customer." },
      { t: "h2", x: "How do we measure visibility?" },
      {
        t: "ol",
        items: [
          { t: "We build the question set", d: "We collect the questions customers ask in your sector from search data and your sales team’s notes." },
          { t: "We ask them regularly", d: "We put the same questions to ChatGPT, Gemini and Google’s AI overviews at set intervals. Answers change, so one measurement isn’t enough." },
          { t: "We calculate the mention rate", d: "We record how many answers mention your brand, in what position and from which source." },
          { t: "We compare with competitors", d: "We measure your competitors’ mention rate in the same answers and report the result as a share." },
        ],
      },
      { t: "h2", x: "What raises visibility?" },
      { t: "p", x: "AI assistants build their answers from content on the web. The basics of classic SEO still apply, with a few additions:" },
      {
        t: "ul",
        items: [
          "Pages that answer frequently asked questions clearly and directly.",
          "Product and service information marked up with structured data.",
          "Your brand being mentioned on independent sites, comparison articles and lists.",
          "Consistent brand information: address, category and product names should match everywhere.",
        ],
      },
      { t: "p", x: "The effect doesn’t show up overnight, so it matters to repeat the measurement regularly and follow the change alongside your competitors." },
      { t: "note", x: "AI answers are a new shelf. Measure first, then update your content and SEO plan with that measurement." },
    ],
  },
  {
    key: "lead",
    lang: "tr",
    slug: "form-sayisindan-nitelikli-gorusmeye",
    title: "Form sayısından nitelikli görüşmeye",
    description: "Lead kampanyalarını form sayısına değil satışa dönen görüşmeye göre optimize etmek için lead puanlama nasıl kurulur?",
    category: "Lead",
    date: "2026-11-05",
    minutes: 5,
    body: [
      { t: "p", x: "Lead kampanyalarında en sık görülen sorun şudur: Form sayısı artar, satış ekibi ise arayacak doğru kişiyi bulamaz. Reklam platformları onlara ne öğretirseniz onu bulur. Yalnızca form sayısını öğretirseniz form doldurmaya en yatkın kişiyi bulurlar, satın almaya en yakın kişiyi değil." },
      { t: "h2", x: "Lead puanlama nedir?" },
      { t: "p", x: "Lead puanlama, her başvuruyu satışa dönüşme olasılığına göre derecelendirmektir. Puan; formdaki bilgilerden (bütçe, sektör, zamanlama), davranıştan (hangi sayfaları gezdiği, kaç kez geri döndüğü) ve satış ekibinin geri bildiriminden oluşur." },
      { t: "h2", x: "Dört adımda kurulum" },
      {
        t: "ol",
        items: [
          { t: "Tüm kanalları tek yerde toplayın", d: "Form, telefon ve WhatsApp başvuruları aynı CRM’e, kaynak bilgisiyle birlikte düşmeli." },
          { t: "“Nitelikli”yi tanımlayın", d: "Satış ekibiyle oturup hangi başvurunun görüşmeye değer olduğunu yazılı kurallara dökün." },
          { t: "Sonucu reklam platformlarına geri gönderin", d: "Google Ads’in çevrimdışı dönüşüm içe aktarma özelliği ve Meta’nın Conversions API’si ile nitelikli lead ve satış bilgisini geri yükleyin." },
          { t: "Hedefi değiştirin", d: "Kampanyaları form başına maliyet yerine nitelikli görüşme başına maliyete göre optimize edin." },
        ],
      },
      { t: "h2", x: "Neyi izlemelisiniz?" },
      {
        t: "ul",
        items: [
          "Nitelikli görüşme sayısı ve görüşme başı maliyet.",
          "Başvurudan görüşmeye geçiş oranı, kanal kanal.",
          "Satış ekibinin ilk dönüş süresi: geç aranan lead soğur.",
        ],
      },
      { t: "p", x: "Bu değişiklikten sonra form sayısı düşebilir. Bu normaldir; önemli olan görüşmeye ve satışa dönen başvuruların artmasıdır." },
      { t: "note", x: "Algoritmaya neyi ölçtüğünüzü değil, neyi istediğinizi öğretin: nitelikli görüşme." },
    ],
  },
  {
    key: "lead",
    lang: "en",
    slug: "from-form-counts-to-qualified-meetings",
    title: "From form counts to qualified meetings",
    description: "How to set up lead scoring so your campaigns optimise for meetings that turn into sales, not for the number of forms.",
    category: "Leads",
    date: "2026-11-05",
    minutes: 5,
    body: [
      { t: "p", x: "The most common problem in lead campaigns: form numbers go up, but the sales team can’t find the right people to call. Ad platforms find whatever you teach them to find. Teach them only form counts and they find the people most likely to fill in a form, not the people closest to buying." },
      { t: "h2", x: "What is lead scoring?" },
      { t: "p", x: "Lead scoring ranks every enquiry by how likely it is to become a sale. The score comes from the form itself (budget, sector, timing), from behaviour (which pages they visited, how often they came back) and from your sales team’s feedback." },
      { t: "h2", x: "Setting it up in four steps" },
      {
        t: "ol",
        items: [
          { t: "Bring every channel into one place", d: "Form, phone and WhatsApp enquiries should land in the same CRM with their source." },
          { t: "Define “qualified”", d: "Sit down with the sales team and write down which enquiries are worth a meeting." },
          { t: "Send the outcome back to the ad platforms", d: "Upload qualified lead and sales data with Google Ads offline conversion import and Meta’s Conversions API." },
          { t: "Change the goal", d: "Optimise campaigns for cost per qualified meeting instead of cost per form." },
        ],
      },
      { t: "h2", x: "What should you track?" },
      {
        t: "ul",
        items: [
          "Number of qualified meetings and cost per meeting.",
          "Enquiry-to-meeting rate, channel by channel.",
          "The sales team’s first response time: leads called late go cold.",
        ],
      },
      { t: "p", x: "Form numbers may fall after this change. That’s normal; what matters is that more enquiries turn into meetings and sales." },
      { t: "note", x: "Teach the algorithm what you want, not just what you count: qualified meetings." },
    ],
  },
];

export const postsFor = (lang: Lang) =>
  posts.filter((p) => p.lang === lang).sort((a, b) => b.date.localeCompare(a.date));

export const findPost = (lang: Lang, slug: string) => posts.find((p) => p.lang === lang && p.slug === slug);

/** The same article in the other language, if it exists. */
export const translationOf = (post: Post) => posts.find((p) => p.key === post.key && p.lang !== post.lang);
