# SkyCast - Modern Hava Durumu Uygulaması

React, TypeScript ve Vite ile geliştirilmiş profesyonel hava durumu uygulaması. WeatherAPI.com entegrasyonu ile gerçek zamanlı hava durumu verileri ve akıllı kıyafet önerileri sunar.


# Canlı İnceleme için - [Tıklayın](https://alperhanbarut.github.io/SkyCast-weatherapp/home)

## Özellikler

- **İnteraktif 3D Dünya**: Etkileşimli dünya haritası üzerinden hava durumu verilerini keşfedin
- **Gerçek Zamanlı Hava Durumu**: Saatlik güncellemelerle anlık hava durumu bilgileri
- **Akıllı Kıyafet Önerileri**: Hava durumuna dayalı yapay zeka destekli giyim önerileri
- **7 Günlük Tahmin**: Daha iyi planlama için genişletilmiş hava durumu tahminleri
- **Şehir Arama ve Favoriler**: Favori lokasyonlarınızı arayın ve kaydedin
- **Duyarlı Tasarım**: Tüm cihaz boyutları ve ekran çözünürlükleri için optimize edildi
- **Tema Desteği**: Cyan-teal renk paleti ile karanlık ve aydınlık mod desteği
- **Canvas Animasyonları**: Hava durumuna uygun partikül efektleri ve arka plan animasyonları
- **Galaxy Efektleri**: Gelişmiş görsel deneyim için dinamik parçacık sistemi
- **Performans Optimizasyonu**: Hızlı yükleme süreleri ve verimli veri işleme

## Teknolojiler

- **Frontend**: React 18, TypeScript, Vite
- **Stil**: Tailwind CSS, Lucide React Icons
- **API**: WeatherAPI.com entegrasyonu
- **Durum Yönetimi**: Redux Toolkit
- **Routing**: React Router DOM
- **Animasyonlar**: Canvas API, CSS Transitions
- **UI Kütüphanesi**: Shadcn/ui bileşenleri

## Kurulum

### Ön Gereksinimler

- Node.js (sürüm 18 veya üzeri)
- npm veya yarn paket yöneticisi
- WeatherAPI.com API anahtarı

### Kurulum Adımları

1. **Projeyi klonlayın:**
   \`\`\`bash
   git clone https://github.com/alperhanbarut/SkyCast-weatherapp.git
   cd SkyCast-weatherapp
   \`\`\`

2. **Bağımlılıkları yükleyin:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Çevre değişkenlerini ayarlayın:**
   \`.env\` dosyası oluşturun ve WeatherAPI anahtarınızı ekleyin:
   \`\`\`env
   VITE_WEATHER_API_KEY=your_weather_api_key_here
   \`\`\`

4. **Geliştirme sunucusunu başlatın:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Tarayıcınızda açın:**
   [http://localhost:5173](http://localhost:5173)

## Kullanım

### Temel Özellikler

1. **Şehir Arama**: Arama çubuğuna şehir adı yazarak hava durumu bilgilerini görüntüleyin
2. **Hava Durumu Detayları**: Sıcaklık, nem, rüzgar hızı ve diğer meteorolojik verileri inceleyin
3. **Kıyafet Önerileri**: Mevcut hava şartlarına göre uygun giyim önerilerini görün
4. **7 Günlük Tahmin**: Gelecek hafta için detaylı hava durumu tahminlerini planlayın
5. **Tema Değiştirme**: Sağ üst köşedeki düğme ile karanlık/aydınlık mod arasında geçiş yapın

### İleri Özellikler

- **3D Globe**: Ana sayfadaki interaktif dünya haritasını keşfedin
- **Animasyonlar**: Hava durumuna uygun arka plan efektlerini izleyin
- **Responsive Tasarım**: Mobil, tablet ve masaüstü cihazlarda optimize edilmiş deneyim

## Proje Yapısı

\`\`\`
src/
├── components/ # React bileşenleri
│ ├── ui/ # Shadcn/ui bileşenleri
│ ├── VideoBackground.tsx # Canvas animasyonları
│ ├── Galaxy.tsx # 3D parçacık sistemi
│ └── ...
├── pages/ # Sayfa bileşenleri
├── hooks/ # Özel React hook'ları
├── redux/ # Redux store ve slice'lar
├── api/ # API servis fonksiyonları
├── types/ # TypeScript tip tanımları
├── utils/ # Yardımcı fonksiyonlar
└── config/ # Yapılandırma dosyaları
\`\`\`

## Özelleştirme

### Tema Renkleri

Uygulama cyan-teal renk paleti kullanır. \`tailwind.config.js\` dosyasından renkleri özelleştirebilirsiniz.

### Animasyonlar

\`VideoBackground.tsx\` dosyasından hava durumu animasyonlarını düzenleyebilirsiniz:

- Yağmur damlacıkları
- Kar tanecikleri
- Şimşek efektleri
- Güneş ışıltıları

## Deployment

### GitHub Pages

\`\`\`bash
npm run build
npm run deploy
\`\`\`

### Vercel

\`\`\`bash
npm run build

# Vercel CLI ile deploy edin

\`\`\`

### Netlify

\`\`\`bash
npm run build

# build/ klasörünü Netlify'a yükleyin

\`\`\`

## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (\`git checkout -b feature/YeniOzellik\`)
3. Değişikliklerinizi commit edin (\`git commit -am 'Yeni özellik eklendi'\`)
4. Branch'i push edin (\`git push origin feature/YeniOzellik\`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için \`LICENSE\` dosyasına bakın.

## İletişim

- **Geliştirici**: Alperhan Barut
- **GitHub**: [@alperhanbarut](https://github.com/alperhanbarut)

## Teşekkürler

- [WeatherAPI.com](https://weatherapi.com/) - Hava durumu verileri için
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Lucide React](https://lucide.dev/) - İkonlar için
- [Vite](https://vitejs.dev/) - Build tool
- [React](https://reactjs.org/) - UI framework

---

Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
