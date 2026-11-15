
async function loadMembers() {
  const response = await fetch("./members.json");
  if (!response.ok) {
    throw new Error("Mitgliederliste konnte nicht geladen werden.");
  }
  return await response.json();
}

async function navigateRing() {
  const params = new URLSearchParams(window.location.search);
  const currentUrl = params.get("via");

  const members = await loadMembers();

  if (!members.length) return;

  let index = members.findIndex(
    member => member.url.replace(/\/$/, "") ===
              (currentUrl || "").replace(/\/$/, "")
  );

  if (index < 0) index = 0;

  const previous = members[
    (index - 1 + members.length) % members.length
  ];

  const next = members[
    (index + 1) % members.length
  ];

  const random = members[
    Math.floor(Math.random() * members.length)
  ];

  document.querySelectorAll("[data-ring]").forEach(link => {
    const type = link.dataset.ring;

    if (type === "previous") link.href =
      previous.url;

    if (type === "next") link.href =
      next.url;

    if (type === "random") link.href =
      random.url;
  });
}

navigateRing().catch(console.error);
