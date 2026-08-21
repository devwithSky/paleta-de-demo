document.addEventListener("DOMContentLoaded", () => {
  const colors = [
    "#2E1E1F",
    "#E30B5C",
    "#9A0002",
    "#EFE6DE",
    "#00311F",
    "#EC5E27",
    "#523D2D",
    "#F4EFE6",
    "#004643",
    "#ABCD1C",
    "#003F30",
    "#D1AFAF",
    "#FCE8EC",
    "#F9B7C2",
    "#FCD8E4",
    "#BBD9F3",
    "#D1E4F8",
    "#9FC4E5",
    "#000016",
    "#081825",
    "#1B314C",
    "#3C5E82",
    "#795548",
    "#6D4C41",
    "#5D4037",
    "#6C3B1A",
    "#9D3E13",
    "#B3682D",
    "#FF4DA6",
    "#FFA78E",
    "#FFF1E6",
    "#B7F1F4",
    "#27D6D1",
    "#7D0507",
    "#C00F3D",
    "#D77374",
    "#E0B2AC",
    "#7B7E0F",
    "#3E4423",
    "#FDB7B7",
    "#F34B5C",
    "#FCE47B",
    "#D7BACE",
    "#A27A91",
    "#6D4659",
    "#A0BEDA",
    "#34211B",
    "#EFCEDB",
    "#4F2B1F",
    "#018081",
    "#FFCDF2",
  ];

  const getTextColor = (hex) => {
    const [red, green, blue] = hex
      .match(/[A-F\d]{2}/gi)
      .map((value) => parseInt(value, 16));
    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
    return brightness > 150 ? "#111827" : "#ffffff";
  };

  const palettes = [
    {
      name: "Pink & Blue Pop",
      bg: "#fdf2f8",
      card: "#ffffff",
      text: "#831843",
      accent: "#ec4899",
      accentText: "#ffffff",
      hex: "#ec4899",
    },
    {
      name: "Neon Cyber",
      bg: "#0f172a",
      card: "#1e293b",
      text: "#f8fafc",
      accent: "#38bdf8",
      accentText: "#ffffff",
      hex: "#38bdf8",
    },
    {
      name: "Soft Matcha",
      bg: "#f0fdf4",
      card: "#ffffff",
      text: "#14532d",
      accent: "#22c55e",
      accentText: "#ffffff",
      hex: "#22c55e",
    },
    {
      name: "Sunset Warmth",
      bg: "#fff7ed",
      card: "#ffffff",
      text: "#7c2d12",
      accent: "#f97316",
      accentText: "#ffffff",
      hex: "#f97316",
    },
    ...colors.map((accent, index) => ({
      name: `Color ${String(index + 1).padStart(2, "0")}`,
      bg: `color-mix(in srgb, ${accent} 12%, white)`,
      card: "#ffffff",
      text: "#1f2937",
      accent,
      accentText: getTextColor(accent),
      hex: accent,
    })),
  ];

  const paletteList = document.getElementById("paletteList");
  const btnPrimary = document.getElementById("btnPrimary");

  let activeColor = palettes[0].hex;

  // Renderizar las paletas
  palettes.forEach((p) => {
    const item = document.createElement("div");
    item.className = "palette-card";
    item.innerHTML = `
      <span><strong>${p.name}</strong></span>
      <div class="swatches">
        <div class="swatch" style="background: ${p.bg}"></div>
        <div class="swatch" style="background: ${p.card}"></div>
        <div class="swatch" style="background: ${p.accent}"></div>
      </div>
    `;

    item.addEventListener("click", () => {
      document
        .querySelector(".palette-card.selected")
        ?.classList.remove("selected");
      item.classList.add("selected");
      document.documentElement.style.setProperty("--bg-color", p.bg);
      document.documentElement.style.setProperty("--card-bg", p.card);
      document.documentElement.style.setProperty("--text-main", p.text);
      document.documentElement.style.setProperty("--accent", p.accent);
      document.documentElement.style.setProperty("--accent-text", p.accentText);
      activeColor = p.hex;
    });

    paletteList.appendChild(item);
  });

  paletteList.firstElementChild.classList.add("selected");

  // Copiar código de color
  btnPrimary.addEventListener("click", () => {
    navigator.clipboard.writeText(activeColor);
    btnPrimary.textContent = "¡Copiado! ✨";
    setTimeout(() => {
      btnPrimary.textContent = "Copiar Hex";
    }, 1500);
  });
});
