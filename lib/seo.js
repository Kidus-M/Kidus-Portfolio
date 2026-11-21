import { profile, socials, capabilities, metrics, faq, fullName, shortName } from "@/data/site";
import { projects } from "@/data/projects";
import { experience, organisations } from "@/data/experience";
import { techGroups } from "@/data/tech";

/** The name people search for, and the complete Ethiopian form of it. */
const FULL_NAME = shortName;
const COMPLETE_NAME = fullName;

/** Canonical origin, no trailing slash. */
export const SITE_URL = "https://www.kidus-mesfin.me";

export const seo = {
  name: FULL_NAME,
  fullName: COMPLETE_NAME,
  title: `${COMPLETE_NAME} — ${profile.role} in Addis Ababa`,
  description:
    `${FULL_NAME} (full name ${COMPLETE_NAME}) is a software engineer in ${profile.location} building end-to-end web, mobile, backend, applied AI, and smart contract products.`,
  locale: "en_US",
  ogImagePath: "/api/og",
  avatarPath: "/kidus-sigil.png",
  twitter: null, // set to "@handle" if you want twitter:creator attribution
};

const flat = (arr) => arr.flatMap((x) => x);

/** All technologies, de-duplicated, in the order they appear in the stack. */
export function allTech() {
  return [...new Set(flat(techGroups.map((g) => g.items)))];
}

/** Schema.org graph for the homepage: Person + WebSite + ProfilePage + projects. */
export function buildJsonLd(siteUrl) {
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const current = experience.find((e) => /present/i.test(e.duration));

  const person = {
    "@type": "Person",
    "@id": personId,
    name: FULL_NAME,
    alternateName: [COMPLETE_NAME, profile.geez, `${profile.names[0].geez} ${profile.names[1].geez}`],
    givenName: profile.first,
    familyName: profile.last,
    additionalName: profile.lineage,
    disambiguatingDescription: `Ethiopian software engineer. ${FULL_NAME} is the short form of the full name ${COMPLETE_NAME}.`,
    jobTitle: profile.role,
    hasOccupation: {
      "@type": "Occupation",
      name: profile.role,
      occupationLocation: { "@type": "City", name: "Addis Ababa" },
      skills: capabilities.map((c) => c.title).join(", "),
    },
    nationality: { "@type": "Country", name: "Ethiopia" },
    homeLocation: { "@type": "Place", name: profile.location },
    mainEntityOfPage: { "@id": `${siteUrl}/#profile` },
    description: profile.intro,
    url: siteUrl,
    image: `${siteUrl}${seo.avatarPath}`,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    sameAs: socials.map((s) => s.href),
    knowsAbout: [...capabilities.map((c) => c.title), ...allTech()],
    ...(current && {
      worksFor: {
        "@type": "Organization",
        name: current.company,
        ...(current.url && { url: current.url }),
      },
    }),
    memberOf: organisations.map((o) => ({
      "@type": "Organization",
      name: o.name,
      ...(o.url && { url: o.url }),
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: `${FULL_NAME} — Portfolio`,
    alternateName: [COMPLETE_NAME, FULL_NAME],
    description: seo.description,
    inLanguage: "en",
    author: { "@id": personId },
    publisher: { "@id": personId },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    url: siteUrl,
    name: seo.title,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    primaryImageOfPage: `${siteUrl}${seo.ogImagePath}`,
    about: { "@id": personId },
    dateModified: new Date().toISOString().slice(0, 10),
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    url: `${siteUrl}/#faq`,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const projectList = {
    "@type": "ItemList",
    "@id": `${siteUrl}/#projects`,
    name: `Projects by ${FULL_NAME}`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: projects.map((p, i) => {
      const repo = p.links?.find((l) => l.kind === "github");
      const live = p.links?.find((l) => l.kind === "live");
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": repo ? "SoftwareSourceCode" : "CreativeWork",
          name: p.title,
          description: p.description,
          ...(p.year && { dateCreated: String(p.year) }),
          ...(live && { url: live.href }),
          ...(repo && { codeRepository: repo.href }),
          keywords: p.tech?.join(", "),
          author: { "@id": personId },
        },
      };
    }),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, faqPage, projectList],
  };
}

/** Plain-text summary for /llms.txt (https://llmstxt.org). */
export function buildLlmsTxt(siteUrl) {
  const lines = [];
  const push = (...xs) => lines.push(...xs);

  push(`# ${FULL_NAME} (${COMPLETE_NAME})`, "");
  push(`> ${seo.description}`, "");
  push(
    `Name: ${FULL_NAME} is the short form of the full name ${COMPLETE_NAME} (${profile.geez}). Both refer to the same person.`,
    ""
  );
  push(profile.statement, "");
  push(
    `- Role: ${profile.role}`,
    `- Location: ${profile.location} (${profile.utc})`,
    `- Email: ${profile.email}`,
    `- Website: ${siteUrl}`,
    `- Available for work: ${profile.available ? "yes" : "no"}`,
    ""
  );

  push("## Profiles", "");
  socials.forEach((s) => push(`- [${s.label}](${s.href}): ${s.handle}`));
  push("");

  push("## Capabilities", "");
  capabilities.forEach((c) =>
    push(`- **${c.title}** — ${c.detail} (${c.tools.join(", ")}). Used in ${c.work.join(", ")}.`)
  );
  push("");

  push("## Numbers", "");
  metrics.forEach((m) => push(`- ${m.value}${m.suffix} ${m.label.toLowerCase()}`));
  push("");

  push("## Projects", "");
  projects.forEach((p) => {
    push(`### ${p.title} (${p.year}) — ${p.type}`, "");
    push(p.description, "");
    if (p.highlights?.length) {
      p.highlights.forEach((h) => push(`- ${h}`));
      push("");
    }
    if (p.tech?.length) push(`Tech: ${p.tech.join(", ")}`, "");
    if (p.links?.length) {
      p.links.forEach((l) => push(`- [${l.label}](${l.href})`));
      push("");
    }
  });

  push("## FAQ", "");
  faq.forEach((item) => push(`### ${item.question}`, "", item.answer, ""));

  push("## Experience", "");
  experience.forEach((e) => {
    push(`### ${e.role} — ${e.company} (${e.duration})`, "");
    push(e.description, "");
    e.highlights.forEach((h) => push(`- ${h}`));
    if (e.url) push("", `- [Website](${e.url})`);
    push("");
  });

  push("## Stack", "");
  techGroups.forEach((g) => push(`- **${g.label}**: ${g.items.join(", ")}`));
  push("");

  push("## Links", "");
  push(`- [Resume (PDF)](${siteUrl}/resume.pdf)`, `- [Sitemap](${siteUrl}/sitemap.xml)`, "");

  return lines.join("\n");
}
