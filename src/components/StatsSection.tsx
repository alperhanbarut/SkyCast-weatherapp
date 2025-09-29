import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatData {
  number: number;
  suffix: string;
  label: string;
  color: string;
}

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats: StatData[] = [
    {
      number: 200,
      suffix: "+",
      label: "Ülke Kapsamı",
      color: "text-cyan-600 dark:text-cyan-400",
    },
    {
      number: 1000000,
      suffix: "+",
      label: "Aktif Kullanıcı",
      color: "text-teal-600 dark:text-teal-400",
    },
    {
      number: 24,
      suffix: "/7",
      label: "Güncel Veri",
      color: "text-sky-600 dark:text-sky-400",
    },
  ];

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-4 py-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut",
            }}
          >
            <div className={`text-4xl font-bold ${stat.color} mb-2`}>
              <Counter
                target={stat.number}
                suffix={stat.suffix}
                isInView={isInView}
                delay={index * 0.2}
              />
            </div>
            <div className="text-cyan-600 dark:text-cyan-300">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface CounterProps {
  target: number;
  suffix: string;
  isInView: boolean;
  delay: number;
}

function Counter({ target, suffix, isInView, delay }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now() + delay * 1000;
    const duration = 2000;

    const timer = setInterval(() => {
      const now = Date.now();
      if (now < startTime) return;

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(target * easeOutQuart);

      setCount(currentCount);

      if (progress >= 1) {
        clearInterval(timer);
        setCount(target);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, isInView, delay]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <span>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export default StatsSection;
