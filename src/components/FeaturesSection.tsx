import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
}

interface StickyImageProps {
  imgUrl: string;
}

interface OverlayCopyProps {
  subheading: string;
  heading: string;
}

interface WeatherContentProps {
  title: string;
  description: string;
  buttonText: string;
}

export const FeaturesSection = () => {
  return (
    <div className="bg-cyan-50 dark:bg-slate-900">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
        subheading="Anlık Veri"
        heading="Gerçek Zamanlı Hava Durumu"
      >
        <WeatherContent
          title="Anlık Hava Durumu Takibi"
          description="Türkiye'deki tüm şehirlerden anlık hava durumu verilerine ulaşın. Sıcaklık, hissedilen sıcaklık ve hava koşullarını gerçek zamanlı olarak takip edin."
          buttonText="Keşfet"
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
        subheading="Akıllı Öneriler"
        heading="Kıyafet Önerileri"
      >
        <WeatherContent
          title="Hava Durumuna Göre Ne Giysem?"
          description="Güncel hava koşullarına göre akıllı kıyafet önerileri alın. Sıcaklık, yağış durumu ve rüzgar şiddetine göre üst giyim, alt giyim ve aksesuar önerileri."
          buttonText="Kombinimi Getir"
        />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: TextParallaxContentProps) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: StickyImageProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }: OverlayCopyProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-lg md:mb-4 md:text-2xl font-display">
        {subheading}
      </p>
      <p className="text-center text-3xl font-display md:text-5xl">{heading}</p>
    </motion.div>
  );
};

const WeatherContent = ({ title, description }: WeatherContentProps) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-2xl font-display text-cyan-900 dark:text-white md:col-span-4 md:text-3xl">
      {title}
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-lg font-body text-cyan-600 dark:text-cyan-300 md:text-xl leading-relaxed">
        {description}
      </p>
      <p className="mb-8 text-lg font-body text-cyan-600 dark:text-cyan-300 md:text-xl leading-relaxed">
        Gelişmiş teknoloji ve kullanıcı dostu arayüz ile hava durumu takibi
        artık çok daha kolay.
      </p>
    </div>
  </div>
);
