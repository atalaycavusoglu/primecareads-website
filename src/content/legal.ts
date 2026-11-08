import type { Lang } from "@/i18n";

/*
 * Draft KVKK notice and cookie policy. {{legalName}}, {{address}}, {{email}} and {{mersis}}
 * are filled from src/config.ts; empty values render as a visible placeholder.
 * These texts need legal review before launch (see site.legalApproved).
 */

export type LegalSection = {
  h: string;
  p?: string[];
  ul?: string[];
  table?: { head: string[]; rows: string[][] };
};

export type LegalDoc = {
  key: "privacy" | "cookies";
  title: string;
  metaDescription: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const cookieRows = (lang: Lang) =>
  lang === "tr"
    ? [
        ["consent", "PrimeCareAds (tarayıcı belleği)", "Çerez tercihinizi hatırlar", "Siz silene kadar", "Zorunlu"],
        ["_ga, _ga_*", "Google Analytics", "Ziyaretleri ve sayfa kullanımını ölçer", "2 yıl", "Analitik"],
        ["_gcl_au", "Google Ads", "Reklam tıklamalarını dönüşümlerle eşleştirir", "90 gün", "Pazarlama"],
        ["_fbp", "Meta (Facebook)", "Meta reklamlarının performansını ölçer", "90 gün", "Pazarlama"],
      ]
    : [
        ["consent", "PrimeCareAds (browser storage)", "Remembers your cookie choice", "Until you delete it", "Necessary"],
        ["_ga, _ga_*", "Google Analytics", "Measures visits and page use", "2 years", "Analytics"],
        ["_gcl_au", "Google Ads", "Matches ad clicks with conversions", "90 days", "Marketing"],
        ["_fbp", "Meta (Facebook)", "Measures Meta ad performance", "90 days", "Marketing"],
      ];

export const legal: Record<Lang, Record<"privacy" | "cookies", LegalDoc>> = {
  tr: {
    privacy: {
      key: "privacy",
      title: "KVKK Aydınlatma Metni",
      metaDescription: "PrimeCareAds internet sitesi üzerinden işlenen kişisel verilere ilişkin 6698 sayılı KVKK kapsamında aydınlatma metni.",
      updated: "Son güncelleme: 8 Kasım 2026",
      intro:
        "{{legalName}} (“PrimeCareAds”) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca veri sorumlusu sıfatıyla, internet sitemiz üzerinden işlenen kişisel verileriniz hakkında sizi bilgilendirmek isteriz.",
      sections: [
        {
          h: "1. Veri sorumlusu",
          ul: ["Unvan: {{legalName}}", "Adres: {{address}}", "MERSİS no: {{mersis}}", "E-posta: {{email}}"],
        },
        {
          h: "2. İşlenen kişisel veriler",
          ul: [
            "Kimlik: ad ve soyad.",
            "İletişim: e-posta adresi ve telefon numarası.",
            "Müşteri işlem: marka veya şirket adı, hedefiniz, mesajınız ve paylaşmayı seçerseniz check-up sonucunuz.",
            "Pazarlama: bülten aboneliği ve ticari elektronik ileti izniniz.",
            "İşlem güvenliği: IP adresi, tarayıcı bilgisi ve form gönderim zamanı.",
            "Çerez verileri: yalnızca onay vermeniz hâlinde analitik ve pazarlama çerezleri.",
          ],
        },
        {
          h: "3. İşleme amaçları",
          ul: [
            "Görüşme talebinizi değerlendirmek ve size dönüş yapmak.",
            "Teklif ve sözleşme süreçlerini yürütmek.",
            "İzin vermeniz hâlinde bülten ve ticari elektronik ileti göndermek.",
            "İnternet sitesinin güvenliğini sağlamak ve kötüye kullanımı önlemek.",
            "Onay vermeniz hâlinde site kullanımını analiz etmek ve reklam performansını ölçmek.",
            "Mevzuattan doğan yükümlülükleri yerine getirmek.",
          ],
        },
        {
          h: "4. Hukuki sebepler",
          p: ["Kişisel verileriniz KVKK’nın 5. maddesindeki şu hukuki sebeplere dayanılarak işlenir:"],
          ul: [
            "Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (md. 5/2-c): görüşme talepleri ve teklif süreçleri.",
            "Hukuki yükümlülüğün yerine getirilmesi (md. 5/2-ç).",
            "Bir hakkın tesisi, kullanılması veya korunması (md. 5/2-e).",
            "Temel hak ve özgürlüklerinize zarar vermemek kaydıyla meşru menfaatimiz (md. 5/2-f): site güvenliği.",
            "Açık rızanız (md. 5/1): ticari elektronik ileti, analitik ve pazarlama çerezleri ve gerektiğinde yurt dışına aktarım.",
          ],
        },
        {
          h: "5. Aktarım",
          p: [
            "Kişisel verileriniz yukarıdaki amaçlarla sınırlı olarak; internet sitesinin barındırma hizmeti sağlayıcısına, form iletim ve e-posta hizmeti sağlayıcılarına, onay vermeniz hâlinde analiz ve reklam hizmeti sağlayıcılarına (Google, Meta) ve talep hâlinde yetkili kamu kurum ve kuruluşlarına aktarılabilir.",
            "Bu hizmet sağlayıcıların sunucuları yurt dışında bulunabilir. Yurt dışına aktarım, KVKK’nın 9. maddesinde öngörülen güvencelerle (örneğin standart sözleşme) ya da açık rızanıza dayanılarak yapılır.",
          ],
        },
        {
          h: "6. Toplama yöntemi",
          p: ["Kişisel verileriniz internet sitemizdeki formlar ve onay vermeniz hâlinde çerezler aracılığıyla, elektronik ortamda, otomatik ve kısmen otomatik yollarla toplanır."],
        },
        {
          h: "7. Saklama süresi",
          p: ["Kişisel verileriniz işleme amacının gerektirdiği ve ilgili mevzuatta öngörülen süre boyunca saklanır; süre sona erdiğinde silinir, yok edilir veya anonim hâle getirilir."],
        },
        {
          h: "8. Haklarınız",
          p: ["KVKK’nın 11. maddesi uyarınca şu haklara sahipsiniz:"],
          ul: [
            "Kişisel verilerinizin işlenip işlenmediğini öğrenme.",
            "İşlenmişse buna ilişkin bilgi talep etme.",
            "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme.",
            "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme.",
            "Eksik veya yanlış işlenmişse düzeltilmesini isteme.",
            "KVKK’nın 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme.",
            "Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme.",
            "Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme.",
            "Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
          ],
        },
        {
          h: "9. Başvuru",
          p: [
            "Haklarınıza ilişkin taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ’e uygun olarak yazılı şekilde {{address}} adresine iletebilir ya da {{email}} adresine e-posta gönderebilirsiniz.",
            "Başvurunuz, talebin niteliğine göre en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.",
          ],
        },
      ],
    },
    cookies: {
      key: "cookies",
      title: "Çerez Politikası",
      metaDescription: "PrimeCareAds internet sitesinde kullanılan çerezler ve çerez tercihlerinizi nasıl yöneteceğiniz.",
      updated: "Son güncelleme: 8 Kasım 2026",
      intro:
        "Bu politika, {{legalName}} tarafından işletilen internet sitesinde hangi çerezlerin ve benzeri teknolojilerin kullanıldığını ve tercihlerinizi nasıl yönetebileceğinizi açıklar.",
      sections: [
        {
          h: "Çerez nedir?",
          p: ["Çerezler, bir internet sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Benzer amaçla tarayıcı belleği (localStorage) de kullanılabilir."],
        },
        {
          h: "Kullandığımız çerez türleri",
          ul: [
            "Zorunlu: sitenin çalışması için gereklidir; çerez tercihinizi hatırlar. Onay gerektirmez.",
            "Analitik: siteyi nasıl kullandığınızı ölçerek siteyi geliştirmemize yardımcı olur. Yalnızca onayınızla çalışır.",
            "Pazarlama: reklamlarımızın performansını ölçer. Yalnızca onayınızla çalışır.",
          ],
        },
        {
          h: "Çerez listesi",
          table: { head: ["Ad", "Sağlayıcı", "Amaç", "Süre", "Tür"], rows: cookieRows("tr") },
        },
        {
          h: "Tercihlerinizi yönetme",
          p: [
            "İlk ziyaretinizde çıkan bant üzerinden çerezleri kabul edebilir ya da reddedebilirsiniz. Tercihinizi istediğiniz zaman sayfanın altındaki “Çerez tercihleri” bağlantısından değiştirebilirsiniz.",
            "Tarayıcınızın ayarlarından da çerezleri silebilir veya engelleyebilirsiniz. Analitik ve pazarlama çerezlerini reddetmeniz sitenin çalışmasını etkilemez.",
          ],
        },
        {
          h: "Kişisel verileriniz",
          p: ["Çerezler aracılığıyla işlenen kişisel verilerinize ilişkin ayrıntılar ve haklarınız için KVKK Aydınlatma Metni’ni inceleyebilirsiniz."],
        },
      ],
    },
  },
  en: {
    privacy: {
      key: "privacy",
      title: "Privacy Notice",
      metaDescription: "Privacy notice for personal data processed through the PrimeCareAds website under Turkey’s Personal Data Protection Law (KVKK).",
      updated: "Last updated: 8 November 2026",
      intro:
        "As data controller under Turkey’s Personal Data Protection Law No. 6698 (“KVKK”), {{legalName}} (“PrimeCareAds”) explains below how personal data collected through our website is processed.",
      sections: [
        {
          h: "1. Data controller",
          ul: ["Company: {{legalName}}", "Address: {{address}}", "MERSIS no: {{mersis}}", "Email: {{email}}"],
        },
        {
          h: "2. Personal data we process",
          ul: [
            "Identity: first and last name.",
            "Contact: email address and phone number.",
            "Customer transaction: brand or company name, your goal, your message and, if you choose to share it, your check-up result.",
            "Marketing: newsletter subscription and consent to commercial electronic messages.",
            "Transaction security: IP address, browser information and form submission time.",
            "Cookie data: analytics and marketing cookies, only if you consent.",
          ],
        },
        {
          h: "3. Purposes",
          ul: [
            "Reviewing your meeting request and getting back to you.",
            "Running proposal and contract processes.",
            "Sending newsletters and commercial electronic messages, if you consent.",
            "Keeping the website secure and preventing misuse.",
            "Analysing site use and measuring ad performance, if you consent.",
            "Meeting legal obligations.",
          ],
        },
        {
          h: "4. Legal grounds",
          p: ["Your personal data is processed on these grounds under Article 5 of the KVKK:"],
          ul: [
            "Directly related to forming or performing a contract (Art. 5/2-c): meeting requests and proposals.",
            "Compliance with a legal obligation (Art. 5/2-ç).",
            "Establishing, exercising or protecting a right (Art. 5/2-e).",
            "Our legitimate interest, provided it does not harm your fundamental rights (Art. 5/2-f): site security.",
            "Your explicit consent (Art. 5/1): commercial electronic messages, analytics and marketing cookies and, where required, transfer abroad.",
          ],
        },
        {
          h: "5. Transfers",
          p: [
            "For the purposes above only, your personal data may be shared with our website hosting provider, form delivery and email service providers, analytics and advertising providers (Google, Meta) if you consent, and authorised public bodies on request.",
            "These providers’ servers may be located abroad. Transfers abroad are made with the safeguards in Article 9 of the KVKK (for example standard contracts) or based on your explicit consent.",
          ],
        },
        {
          h: "6. How we collect data",
          p: ["Your personal data is collected electronically through the forms on our website and, if you consent, through cookies, by automated and partly automated means."],
        },
        {
          h: "7. Retention",
          p: ["Your personal data is kept for as long as the purpose requires and the law prescribes; after that it is deleted, destroyed or anonymised."],
        },
        {
          h: "8. Your rights",
          p: ["Under Article 11 of the KVKK you have the right to:"],
          ul: [
            "Learn whether your personal data is processed.",
            "Request information about the processing.",
            "Learn the purpose of processing and whether data is used accordingly.",
            "Know the third parties in Turkey or abroad to whom it is transferred.",
            "Request correction if it is incomplete or inaccurate.",
            "Request deletion or destruction under the conditions in Article 7.",
            "Request that corrections and deletions be notified to third parties it was transferred to.",
            "Object to an outcome against you that results solely from automated analysis.",
            "Claim compensation for damage caused by unlawful processing.",
          ],
        },
        {
          h: "9. How to apply",
          p: [
            "You can send requests about your rights in writing to {{address}}, in line with the Communiqué on the Procedures and Principles of Application to the Data Controller, or by email to {{email}}.",
            "Requests are answered free of charge within 30 days at the latest, depending on their nature.",
          ],
        },
      ],
    },
    cookies: {
      key: "cookies",
      title: "Cookie Policy",
      metaDescription: "The cookies used on the PrimeCareAds website and how to manage your cookie preferences.",
      updated: "Last updated: 8 November 2026",
      intro: "This policy explains which cookies and similar technologies are used on the website run by {{legalName}}, and how you can manage your choices.",
      sections: [
        {
          h: "What are cookies?",
          p: ["Cookies are small text files saved in your browser when you visit a website. Browser storage (localStorage) may be used for similar purposes."],
        },
        {
          h: "Types of cookies we use",
          ul: [
            "Necessary: needed for the site to work; they remember your cookie choice. No consent required.",
            "Analytics: help us improve the site by measuring how it is used. Only with your consent.",
            "Marketing: measure the performance of our ads. Only with your consent.",
          ],
        },
        {
          h: "Cookie list",
          table: { head: ["Name", "Provider", "Purpose", "Duration", "Type"], rows: cookieRows("en") },
        },
        {
          h: "Managing your choices",
          p: [
            "On your first visit you can accept or reject cookies in the banner. You can change your choice at any time with the “Cookie preferences” link at the bottom of every page.",
            "You can also delete or block cookies in your browser settings. Rejecting analytics and marketing cookies does not affect how the site works.",
          ],
        },
        {
          h: "Your personal data",
          p: ["For details of personal data processed through cookies and your rights, see our Privacy Notice."],
        },
      ],
    },
  },
};
