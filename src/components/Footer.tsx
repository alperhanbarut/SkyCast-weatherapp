import { Link } from "react-router-dom";
import { NAV_LINKS } from "@/config/navigation";
import Galaxy from "./Galaxy";
import {
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com",
      color: "hover:text-gray-300",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com",
      color: "hover:text-pink-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com",
      color: "hover:text-blue-500",
    },
  ];

  const contactInfo = [
    { icon: Mail, text: "info@skycast.com" },
    { icon: MapPin, text: "İstanbul, Türkiye" },
    { icon: Phone, text: "+90 (555) 123-4567" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90 border-t border-border/50">
      {/* Galaxy Background - Interactive with mouse */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-30"
        style={{ pointerEvents: "all", zIndex: 1 }}
      >
        <Galaxy />
      </div>

      {/* Content Overlay */}
      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ zIndex: 10, pointerEvents: "none" }}
      >
        {/* Top Section */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                    Sky<span className="text-primary">Cast</span>
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Akıllı Hava Durumu & Kıyafet Önerileri
                  </p>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  Türkiye'nin en güvenilir hava durumu uygulaması. Güncel
                  veriler, akıllı kıyafet önerileri ve sezgisel tasarım.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-6">Sayfalar</h3>
              <nav className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={scrollToTop}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 relative z-20"
                    style={{ pointerEvents: "auto" }}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-foreground mb-6">Özellikler</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li
                  className="hover:text-primary transition-colors duration-200 cursor-pointer relative z-20"
                  style={{ pointerEvents: "auto" }}
                >
                  Güncel Hava Durumu
                </li>
                <li
                  className="hover:text-primary transition-colors duration-200 cursor-pointer relative z-20"
                  style={{ pointerEvents: "auto" }}
                >
                  Kıyafet Önerileri
                </li>
                <li
                  className="hover:text-primary transition-colors duration-200 cursor-pointer relative z-20"
                  style={{ pointerEvents: "auto" }}
                >
                  Şehir Arama
                </li>
                <li
                  className="hover:text-primary transition-colors duration-200 cursor-pointer relative z-20"
                  style={{ pointerEvents: "auto" }}
                >
                  Tema Desteği
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50"></div>

        {/* Bottom Section */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} SkyCast. Tüm hakları saklıdır.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-background/50 border border-border/50 text-muted-foreground transition-all duration-200 hover:bg-background hover:border-border ${social.color} hover:scale-105 relative z-20`}
                    aria-label={social.name}
                    style={{ pointerEvents: "auto" }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* API Credit */}
            <div className="text-xs text-muted-foreground">
              Powered by{" "}
              <a
                href="https://www.weatherapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline relative z-20"
                style={{ pointerEvents: "auto" }}
              >
                WeatherAPI
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
