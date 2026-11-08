import type { Lang } from "@/i18n";

export type Sector = {
  key: "cosmetics" | "automotive" | "tourism";
  lang: Lang;
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  intro: string;
  /** The goal this sector usually starts from, matching a tab on the home page. */
  goal: string;
  challenges: string[];
  shelves: { t: string; d: string }[];
  approach: { t: string; d: string }[];
  kpis: string[];
  faqs: [string, string][];
};

export const sectors: Sector[] = [
  {
    key: "cosmetics",
    lang: "tr",
    slug: "kozmetik",
    name: "Kozmetik",
    title: "Kozmetik markaları için dijital pazar payı",
    metaDescription: "Kozmetik ve kişisel bakım markaları için Google, Meta, pazaryeri ve yapay zeka yanıtlarında pazar payı yönetimi.",
    intro: "Kozmetikte müşteri satın almadan önce arar, karşılaştırır, yorum okur ve giderek daha sık yapay zekaya sorar. Biz markanızın bu yolculuğun her rafında rakiplerine göre ne kadar göründüğünü ölçüyor ve büyütüyoruz.",
    goal: "E-ticaret ve marka bilinirliği",
    challenges: [
      "Pazaryerlerinde aynı kategoride yüzlerce ürünle aynı rafta yarışmak.",
      "Kampanya dönemlerinde tıklama maliyetinin hızla artması.",
      "“Hassas cilt için en iyi…” gibi sorularda yapay zeka yanıtlarında rakiplerin önerilmesi.",
    ],
    shelves: [
      { t: "Pazaryeri rafı", d: "Trendyol, Hepsiburada ve Amazon’da kategori aramalarında sıranız." },
      { t: "Arama", d: "Ürün ve içerik aramalarında gösterim payınız ve marka aramalarınız." },
      { t: "Sosyal ve video", d: "Instagram ve YouTube’da ses payınız." },
      { t: "Yapay zeka yanıtları", d: "Cilt bakımı sorularında markanızın geçme oranı." },
    ],
    approach: [
      { t: "Katalog ve marj verisiyle reklam", d: "Ürün reklamlarını stok ve marjla yönetiyor, kâr bırakan ürünleri öne çıkarıyoruz." },
      { t: "Pazaryeri raf takibi", d: "Kategori aramalarındaki sıranızı rakiplerle haftalık izliyoruz." },
      { t: "İçerik ve yapay zeka görünürlüğü", d: "Müşterilerin sorduğu sorulara yanıt veren içerik planı kuruyoruz." },
      { t: "Kampanya dönemi planı", d: "Özel günlerden önce bütçe ve kreatif planını veriyle hazırlıyoruz." },
    ],
    kpis: ["Ürün bazında ROAS ve satış", "Pazaryeri raf payı", "Yapay zeka yanıt payı"],
    faqs: [
      ["Yalnızca pazaryerinde satıyoruz, uygun mu?", "Evet. Pazaryeri reklamları ve raf payı takibi tek başına da yönetilebilir."],
      ["Kozmetikte reklam kısıtlamaları var mı?", "Sağlık iddiası içeren metinler platform kurallarına takılabilir; kreatifleri bu kurallara göre hazırlıyoruz."],
    ],
  },
  {
    key: "cosmetics",
    lang: "en",
    slug: "cosmetics",
    name: "Cosmetics",
    title: "Digital market share for cosmetics brands",
    metaDescription: "Market share management for cosmetics and personal care brands on Google, Meta, marketplaces and AI answers.",
    intro: "In cosmetics, customers search, compare and read reviews before buying, and more and more often they ask AI. We measure and grow how visible your brand is on every shelf of that journey, against your competitors.",
    goal: "E-commerce and brand awareness",
    challenges: [
      "Competing on the same marketplace shelf with hundreds of products in one category.",
      "Cost per click rising fast during campaign periods.",
      "AI answers recommending competitors for questions like “best … for sensitive skin”.",
    ],
    shelves: [
      { t: "Marketplace shelf", d: "Your rank in category searches on Trendyol, Hepsiburada and Amazon." },
      { t: "Search", d: "Your impression share on product and content searches, and your brand searches." },
      { t: "Social and video", d: "Your share of voice on Instagram and YouTube." },
      { t: "AI answers", d: "How often your brand appears in skincare questions." },
    ],
    approach: [
      { t: "Ads run on catalogue and margin data", d: "We run product ads with stock and margin data and push the profitable products." },
      { t: "Marketplace shelf tracking", d: "We track your category search rank against competitors every week." },
      { t: "Content and AI visibility", d: "We build a content plan that answers the questions customers ask." },
      { t: "Campaign period planning", d: "We prepare budget and creative plans with data before key retail dates." },
    ],
    kpis: ["Sales and ROAS per product", "Marketplace shelf share", "AI answer share"],
    faqs: [
      ["We only sell on marketplaces. Is that a fit?", "Yes. Marketplace ads and shelf share tracking can be run on their own."],
      ["Are there ad restrictions in cosmetics?", "Copy with health claims can break platform rules; we write creative to fit those rules."],
    ],
  },
  {
    key: "automotive",
    lang: "tr",
    slug: "otomotiv",
    name: "Otomotiv",
    title: "Otomotiv markaları ve bayileri için nitelikli lead",
    metaDescription: "Otomotiv markaları ve bayileri için test sürüşü, teklif ve servis randevusu getiren lead kampanyaları ve lead puanlama.",
    intro: "Otomotivde karar uzun sürer ve satış bayide kapanır. Biz form sayısını değil, test sürüşüne, teklif görüşmesine ve satışa dönen başvuruyu ölçüyor; kampanyaları buna göre yönetiyoruz.",
    goal: "Lead",
    challenges: [
      "Çok sayıda form gelmesi ama satış ekibinin nitelikli kişiyi bulamaması.",
      "Uzun karar sürecinde müşterinin rakip modellere kayması.",
      "Reklam, telefon ve WhatsApp başvurularının ayrı yerlerde kaybolması.",
    ],
    shelves: [
      { t: "Arama", d: "Model ve “en iyi SUV” gibi karşılaştırma aramalarında gösterim payınız." },
      { t: "Sosyal ve video", d: "Lansman ve model videolarının erişimi ve izlenme oranı." },
      { t: "Yerel arama", d: "Bayi ve servis aramalarında haritadaki görünürlüğünüz." },
      { t: "Yapay zeka yanıtları", d: "Model karşılaştırma sorularında markanızın geçme oranı." },
    ],
    approach: [
      { t: "Tek lead akışı", d: "Form, telefon ve WhatsApp başvurularını kaynağıyla tek CRM’de topluyoruz." },
      { t: "Lead puanlama", d: "Bütçe, model ilgisi ve zamanlamaya göre her başvuruyu puanlıyoruz." },
      { t: "Sonucu reklama geri gönderme", d: "Test sürüşü ve satış bilgisini Google Ads ve Meta’ya geri yüklüyoruz." },
      { t: "Bayi bazında rapor", d: "Hangi bayiye hangi kanaldan ne kadar nitelikli lead gittiğini gösteriyoruz." },
    ],
    kpis: ["Test sürüşü ve teklif görüşmesi sayısı", "Nitelikli lead başı maliyet", "Bayi bazında dönüşüm oranı"],
    faqs: [
      ["Birden fazla bayi için çalışabiliyor musunuz?", "Evet. Kampanyaları ve raporları bayi bazında ayırıyoruz."],
      ["Servis randevusu kampanyaları da yapıyor musunuz?", "Evet. Satış sonrası servis randevuları ayrı bir lead hedefi olarak yönetilebilir."],
    ],
  },
  {
    key: "automotive",
    lang: "en",
    slug: "automotive",
    name: "Automotive",
    title: "Qualified leads for automotive brands and dealers",
    metaDescription: "Lead campaigns and lead scoring that bring test drives, quotes and service bookings for automotive brands and dealers.",
    intro: "In automotive the decision takes time and the sale closes at the dealer. We measure enquiries that become test drives, quote meetings and sales, not form counts, and run campaigns on that basis.",
    goal: "Leads",
    challenges: [
      "Lots of forms coming in, but the sales team can’t find the qualified ones.",
      "Customers drifting to competitor models during a long decision process.",
      "Ad, phone and WhatsApp enquiries getting lost in different places.",
    ],
    shelves: [
      { t: "Search", d: "Your impression share on model and comparison searches such as “best SUV”." },
      { t: "Social and video", d: "Reach and view rate of launch and model videos." },
      { t: "Local search", d: "Your visibility on maps for dealer and service searches." },
      { t: "AI answers", d: "How often your brand appears in model comparison questions." },
    ],
    approach: [
      { t: "One lead flow", d: "We bring form, phone and WhatsApp enquiries into one CRM with their source." },
      { t: "Lead scoring", d: "We score every enquiry by budget, model interest and timing." },
      { t: "Sending outcomes back to ads", d: "We upload test drive and sales data back to Google Ads and Meta." },
      { t: "Dealer-level reporting", d: "We show how many qualified leads each dealer gets from each channel." },
    ],
    kpis: ["Test drives and quote meetings", "Cost per qualified lead", "Conversion rate by dealer"],
    faqs: [
      ["Can you work for several dealers?", "Yes. We split campaigns and reports by dealer."],
      ["Do you run service booking campaigns?", "Yes. After-sales service bookings can be run as a separate lead goal."],
    ],
  },
  {
    key: "tourism",
    lang: "tr",
    slug: "turizm",
    name: "Turizm",
    title: "Turizm ve konaklama için doğrudan rezervasyon",
    metaDescription: "Oteller ve turizm işletmeleri için doğrudan rezervasyon, sezon planlaması ve yurt dışı pazarlarda dijital görünürlük.",
    intro: "Turizmde talep sezona, ülkeye ve rezervasyon platformlarına göre hızla değişir. Biz hangi pazardan, hangi kanaldan doğrudan rezervasyon geldiğini ölçüyor ve bütçeyi sezona göre önceden planlıyoruz.",
    goal: "Lead ve e-ticaret",
    challenges: [
      "Rezervasyonların büyük kısmının komisyonlu platformlardan gelmesi.",
      "Sezon başında tıklama maliyetinin artması ve bütçenin geç planlanması.",
      "Farklı ülkelerden gelen talebin ayrı ölçülememesi.",
    ],
    shelves: [
      { t: "Arama", d: "Destinasyon ve otel aramalarında gösterim payınız, marka aramalarınız." },
      { t: "Sosyal ve video", d: "Instagram ve YouTube’da ilham veren içeriklerin erişimi." },
      { t: "Yerel ve harita", d: "Google Haritalar ve otel aramalarında görünürlük." },
      { t: "Yapay zeka yanıtları", d: "“Nerede kalmalı?” sorularında işletmenizin önerilme oranı." },
    ],
    approach: [
      { t: "Doğrudan rezervasyon ölçümü", d: "Rezervasyon motorunuzu ve dönüşüm etiketlerini doğru kuruyoruz." },
      { t: "Pazar bazında kampanyalar", d: "Kampanyaları ülke ve dil bazında ayırıp ayrı raporluyoruz." },
      { t: "Sezon planı", d: "Geçmiş veriyle bütçeyi sezondan önce planlıyoruz." },
      { t: "Marka araması koruma", d: "Marka aramalarınızda doğrudan rezervasyonu öne çıkarıyoruz." },
    ],
    kpis: ["Doğrudan rezervasyon sayısı ve geliri", "Pazar bazında rezervasyon başı maliyet", "Marka araması payı"],
    faqs: [
      ["Yurt dışı pazarlar için çalışıyor musunuz?", "Evet. Kampanyaları ve içerikleri hedef pazarın diline ve sezonuna göre hazırlıyoruz."],
      ["Rezervasyon platformlarıyla rekabet nasıl yönetilir?", "Marka aramalarınızda doğrudan rezervasyonu öne çıkarıyor, farkı rakamla izliyoruz."],
    ],
  },
  {
    key: "tourism",
    lang: "en",
    slug: "tourism",
    name: "Tourism",
    title: "Direct bookings for tourism and hospitality",
    metaDescription: "Direct bookings, season planning and digital visibility in international markets for hotels and tourism businesses.",
    intro: "In tourism, demand shifts quickly with the season, the country and the booking platforms. We measure which market and which channel bring direct bookings, and plan the budget ahead of the season.",
    goal: "Leads and e-commerce",
    challenges: [
      "Most bookings coming through commission-based platforms.",
      "Cost per click rising at the start of the season, with budgets planned late.",
      "Demand from different countries that can’t be measured separately.",
    ],
    shelves: [
      { t: "Search", d: "Your impression share on destination and hotel searches, and your brand searches." },
      { t: "Social and video", d: "Reach of inspiring content on Instagram and YouTube." },
      { t: "Local and maps", d: "Visibility on Google Maps and hotel searches." },
      { t: "AI answers", d: "How often you’re recommended for “where to stay” questions." },
    ],
    approach: [
      { t: "Measuring direct bookings", d: "We set up your booking engine and conversion tags correctly." },
      { t: "Campaigns by market", d: "We split campaigns by country and language and report them separately." },
      { t: "Season plan", d: "We plan the budget before the season using past data." },
      { t: "Protecting brand search", d: "We put direct booking first on your brand searches." },
    ],
    kpis: ["Direct bookings and revenue", "Cost per booking by market", "Brand search share"],
    faqs: [
      ["Do you work on international markets?", "Yes. We prepare campaigns and content in the language and season of each target market."],
      ["How do you handle competition with booking platforms?", "We put direct booking first on your brand searches and track the difference in numbers."],
    ],
  },
];

export const sectorsFor = (lang: Lang) => sectors.filter((s) => s.lang === lang);
export const findSector = (lang: Lang, slug: string) => sectors.find((s) => s.lang === lang && s.slug === slug);
export const sectorTranslation = (s: Sector) => sectors.find((x) => x.key === s.key && x.lang !== s.lang);
