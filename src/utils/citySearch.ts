export function normalizeSearchQuery(query: string): string {
  const turkishToEnglish: Record<string, string> = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G', 
    'ı': 'i', 'I': 'I',
    'İ': 'I', 'i': 'i',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U'
  };

  return query.replace(/[çÇğĞıİöÖşŞüÜ]/g, (match) => turkishToEnglish[match] || match);
}

export function getCityAlternatives(query: string): string[] {
  const normalizedQuery = normalizeSearchQuery(query.toLowerCase());
  const originalLower = query.toLowerCase();
  
  const alternatives: string[] = [query.trim(), normalizeSearchQuery(query.trim())];
  
  const cityMappings: Record<string, string[]> = {
    'düzce': ['Düzce', 'Duzce', 'düzce', 'duzce'],
    'duzce': ['Düzce', 'Duzce', 'düzce', 'duzce'],
    
    'izmit': ['İzmit', 'Izmit', 'izmit'],
    'izmir': ['İzmir', 'Izmir', 'izmir'],
    'istanbul': ['İstanbul', 'Istanbul', 'istanbul'],
    'ankara': ['Ankara', 'ankara'],
    
    'mugla': ['Muğla', 'Mugla', 'mugla', 'muğla'],
    'muğla': ['Muğla', 'Mugla', 'mugla', 'muğla'],
    
    'corum': ['Çorum', 'Corum', 'corum', 'çorum'],
    'çorum': ['Çorum', 'Corum', 'corum', 'çorum'],
    
    'sanliurfa': ['Şanlıurfa', 'Sanliurfa', 'sanliurfa', 'şanlıurfa'],
    'şanlıurfa': ['Şanlıurfa', 'Sanliurfa', 'sanliurfa', 'şanlıurfa'],
    
    'kirikkale': ['Kırıkkale', 'Kirikkale', 'kirikkale', 'kırıkkale'],
    'kırıkkale': ['Kırıkkale', 'Kirikkale', 'kirikkale', 'kırıkkale'],

    'denizli': ['Denizli', 'denizli'],
    'gaziantep': ['Gaziantep', 'gaziantep'],
    'konya': ['Konya', 'konya'],
    'kayseri': ['Kayseri', 'kayseri'],
  };

  if (cityMappings[originalLower]) {
    alternatives.push(...cityMappings[originalLower]);
  }
  
  if (cityMappings[normalizedQuery] && normalizedQuery !== originalLower) {
    alternatives.push(...cityMappings[normalizedQuery]);
  }

  return [...new Set(alternatives.filter(city => city && city.trim().length > 0))];
}

export function getBestCityName(query: string): string {
  const alternatives = getCityAlternatives(query);
  return alternatives[0];
}

export function getSuggestions(query: string): string[] {
  const lowerQuery = query.toLowerCase().trim();
  
  const suggestions: Record<string, string[]> = {
    'duzce': ['Düzce'],
    'dusce': ['Düzce'],
    'duzde': ['Düzce'],
    'izmit': ['İzmit'],
    'izmir': ['İzmir'],
    'istanbul': ['İstanbul'],
    'mugla': ['Muğla'],
    'corum': ['Çorum'],
    'sanliurfa': ['Şanlıurfa'],
    'kirikkale': ['Kırıkkale'],
    'anakara': ['Ankara'],
    'ankra': ['Ankara'],
    'bursa': ['Bursa'],
    'adana': ['Adana'],
    'antalya': ['Antalya'],
  };

  return suggestions[lowerQuery] || [];
}