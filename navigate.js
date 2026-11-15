 try {
    const response = await fetch(MEMBERS_URL);
    if (!response.ok) throw new Error("Fehler");

    const members = await response.json();

    if (members.length < 2) {
      container.textContent = "verstricktes – Weitere Strickblogs folgen!";
      return;
    }

    const index = members.findIndex(
      m => normalize(m.url) === normalize(currentSite)
    );

    if (index < 0) {
      container.textContent = "Dieser Blog ist noch nicht Mitglied.";
      return;
    }

    const previous = members[(index - 1 + members.length) % members.length];
    const next = members[(index + 1) % members.length];
    const others = members.filter((_, i) => i !== index);
    const random = others[Math.floor(Math.random() * others.length)];

    const heading = document.createElement("div");
    heading.textContent = "Diese Seite ist Mitglied von verstricktes";
    heading.style.marginBottom = "8px";
    container.appendChild(heading);

    [
      ["← Vorherige Seite", previous.url],
      ["Zufälliger Blog", random.url],
      ["Nächste Seite →", next.url]
    ].forEach(([label, url], i) => {
      if (i) container.appendChild(document.createTextNode(" | "));
      const link = document.createElement("a");
      link.href = url;
      link.textContent = label;
      link.style.cssText = "color:#000;text-decoration:none;";
      container.appendChild(link);
    });

  } catch (error) {
    container.textContent = "Die Webring-Navigation ist momentan nicht erreichbar.";
  }
})();
