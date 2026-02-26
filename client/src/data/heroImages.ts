// Imagens dos heróis do Last War Survival
// Extraídas do documento de símbolos e tier list
export const heroImages: Record<string, string> = {
  // ===== TANQUE =====
  Murphy: "/heroes/murphy.png",
  Mason: "/heroes/mason.png",
  Marshall: "/heroes/marshall.png",
  Williams: "/heroes/williams.png",
  Violet: "/heroes/violet.png",
  Scarlett: "/heroes/scarlett.png",
  Richard: "/heroes/richard.png",
  Gump: "/heroes/gump.png",
  Stefmann: "/heroes/stefmann.png",
  Kimberly: "/heroes/kimberly.png",
  Monica: "/heroes/monica.png",
  Farhad: "/heroes/farhad.png",
  Loki: "/heroes/loki.png",
  
  // ===== MÍSSIL =====
  Tesla: "/heroes/tesla.png",
  McGragor: "/heroes/mcgragor.png",
  Adam: "/heroes/adam.png",
  Swift: "/heroes/swift.png",
  Fiona: "/heroes/fiona.png",
  Venom: "/heroes/venom.png",
  Elsa: "/heroes/elsa.png",
  Braz: "/heroes/braz.png",
  Kane: "/heroes/kane.png",
  
  // ===== AERONAVE =====
  DVA: "/heroes/dva.png",
  Lucius: "/heroes/lucius.png",
  Schuyler: "/heroes/schuyler.png",
  Carlie: "/heroes/carlie.png",
  Cage: "/heroes/cage.png",
  Morrison: "/heroes/morrison.png",
  Sara: "/heroes/sara.png",
  Maxell: "/heroes/maxell.png",
  Ambolt: "/heroes/ambolt.png",
};

export const getHeroImage = (heroName: string): string => {
  return heroImages[heroName] || `https://via.placeholder.com/360x360?text=${heroName}`;
};
