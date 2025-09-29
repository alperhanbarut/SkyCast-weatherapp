const IMAGE_MAP: Record<string, string> = {
  "ust-termal": "/images/ust-termal.png",
  "ust-katman": "/images/ust-katman.png",
  "ust-uzunkol": "/images/ust-uzunkol.jpg",
  "ust-tshirt": "/images/ust-tshirt.png",
  "ust-ince": "/images/ust-ınce.webp",

  "alt-kalin": "/images/alt-kalin.jpg",
  "alt-normal": "/images/alt-normal.png",
  "alt-serin": "/images/alt-serin.png",

  "dis-yagmurluk": "/images/dis-yagmurluk.png",
  "dis-ruzgar": "/images/dis-ruzgar.png",
  "dis-kar": "/images/dis-kar.png",

  "aks-bere": "/images/aks-bere.png",
  "aks-semsiye": "/images/aks-semsiye.jpg",
  "aks-gunes": "/images/aks-gunes.jpg",

  "ayk-bot-termal": "/images/ayk-bot.png",
  "ayk-bot-su": "/images/ayk-bot.png",
  "ayk-bot-hafif": "/images/ayk-bot.png",
  "ayk-spor-su": "/images/ayk-spor.jpg",
  "ayk-spor-nefes": "/images/ayk-spor.jpg",
  "ayk-sneaker": "/images/ayk-sneaker.jpg",
  "ayk-sandalet": "/images/ayk-terlik.jpg",

  "ayk-bot": "/images/ayk-bot.png",
  "ayk-terlik": "/images/ayk-terlik.jpg",
  "ayk-spor": "/images/ayk-spor.jpg",
};

export function getOutfitImage(id: string): string | null {
  return IMAGE_MAP[id] || null;
}

export function isOutfitImageAvailable(id: string): boolean {
  return id in IMAGE_MAP;
}

export type OutfitImageId = keyof typeof IMAGE_MAP;

export function getCategoryColor(category: string): string {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('üst')) {
    return 'bg-blue-500';
  } else if (categoryLower.includes('alt')) {
    return 'bg-green-500';
  } else if (categoryLower.includes('dış')) {
    return 'bg-purple-500';
  } else if (categoryLower.includes('aksesuar')) {
    return 'bg-orange-500';
  } else if (categoryLower.includes('ayakkabı')) {
    return 'bg-red-500';
  } else {
    return 'bg-gray-500';
  }
}
