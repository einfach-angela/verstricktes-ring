(async function () {
  const MEMBERS_URL =
    "https://einfach-angela.github.io/verstricktes-ring/members.json";

  const script = document.currentScript;
  const currentSite = script.dataset.site || window.location.href;

  const normalize = url => {
    const u = new URL(url);
    return u.origin + u.pathname.replace(/\/+$/, "");
  };

  const container = document.createElement("div");
  container.style.cssText =
    "font-family:Verdana,sans-serif;font-size:14px;color:#000;text-align:center;margin:15px 0;";

  script.parentNode.insertBefore(container, script.nextSibling);

  try {
    const response = await fetch(MEMBERS_URL);

    if (!response.ok) throw new Error("Mitgliederliste nicht erreichbar");

    const members = await response.json();

    const index = members.findIndex(
      m => normalize(m.url) === normalize(currentSite)
    );

    if (members.length < 2) {
      container.textContent =
        "verstricktes – Der Webring wächst. Weitere Strickblogs folgen!";
      return;
    }

    if (index < 0) {
      container.textContent =
        "Dieser Blog ist noch nicht im Webring verstricktes.";
      return;
    }

    const previous =
      members[(index - 1 + members.length) % members.length];

    const next =
      members[(index + 1) % members.length];

    const others = members.filter((_, i) => i !== index);
    const random = others[Math.floor(Math.random() * others.length)];

    const links = [
      ["← Vorherige Seite", previous.url],
      ["Zufälliger Blog", random.url],
      ["Nächste Seite →", next.url]
    ];

    const heading = document.createElement("div");
    heading.textContent = "Diese Seite ist Mitglied von verstricktes";
    heading.style.marginBottom = "8px";
    container.appendChild(heading);

    const navigation = document.createElement("div");

    links.forEach(([label, url], i) => {
      if (i > 0) {
        navigation.appendChild(document.createTextNode(" | "));
      }

      const link = document.createElement("a");
      link.href = url;
      link.textContent = label;
      link.style.cssText =
        "color:#000;text-decoration:none;font-family:Verdana,sans-serif;font-size:14px;";

      navigation.appendChild(link);
    });

    container.appendChild(navigation);

  } catch (error) {
    container.textContent =
      "Die Webring-Navigation ist momentan nicht erreichbar.";
    console.error(error);
  }
})();
    if (type === "next") link.href =
      next.url;

    if (type === "random") link.href =
      random.url;
  });
}

navigateRing().catch(console.error);
