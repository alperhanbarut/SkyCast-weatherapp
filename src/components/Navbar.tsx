import {
  Search as SearchIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { NAV_LINKS } from "@/config/navigation";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = NAV_LINKS;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const cityName = searchTerm.trim();
      navigate(`/weather/${cityName}`);
      setSearchTerm("");
      setMobileMenuOpen(false);
      scrollToTop();
    }
  };

  const isWeatherDetailPage = location.pathname.startsWith("/weather/");

  const navbarBgClass = isWeatherDetailPage
    ? "bg-black/20 dark:bg-black/30 backdrop-blur-xl border-white/10 dark:border-white/5"
    : "bg-cyan-50/90 dark:bg-slate-900/90 backdrop-blur-lg border-cyan-200/50 dark:border-cyan-700/50";

  return (
    <div className="fixed top-2 left-0 right-0 z-1000 px-4 sm:px-6 lg:px-8">
      <nav
        className={`max-w-6xl mx-auto ${navbarBgClass} rounded-2xl shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20`}
      >
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center">
            <Link
              to="/"
              onClick={scrollToTop}
              className={
                isWeatherDetailPage
                  ? "text-xl font-bold text-white hover:text-cyan-200 transition-colors"
                  : "text-xl font-bold text-slate-800 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              }
            >
              Sky
              <span
                className={
                  isWeatherDetailPage
                    ? "text-cyan-200"
                    : "text-cyan-600 dark:text-cyan-400"
                }
              >
                Cast
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              if (isWeatherDetailPage) {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => {
                      if (link.path === "/" || link.path === "/outfit") {
                        scrollToTop();
                      }
                    }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-white bg-white/20 font-bold"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              } else {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => {
                      if (link.path === "/" || link.path === "/outfit") {
                        scrollToTop();
                      }
                    }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-bold"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              }
            })}
          </div>

          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden sm:block">
              <div className="relative">
                <SearchIcon
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-lg ${
                    isWeatherDetailPage ? "text-white/60" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Şehir ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e);
                    }
                  }}
                  className={
                    isWeatherDetailPage
                      ? "pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-white/60 text-white backdrop-blur-sm"
                      : "pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                  }
                />
              </div>
            </form>

            <AnimatedThemeToggler
              className={
                isWeatherDetailPage
                  ? "p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                  : "p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
              }
            />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isWeatherDetailPage
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t ${
              isWeatherDetailPage
                ? "border-white/20 bg-black/10"
                : "border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95"
            } backdrop-blur-lg`}
          >
            <div className="px-6 py-4 space-y-4">
              <form onSubmit={handleSearch} className="sm:hidden">
                <div className="relative">
                  <SearchIcon
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-lg ${
                      isWeatherDetailPage ? "text-white/60" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Şehir ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={
                      isWeatherDetailPage
                        ? "w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-white/60 text-white backdrop-blur-sm"
                        : "w-full pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                    }
                  />
                </div>
              </form>

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (link.path === "/" || link.path === "/outfit") {
                          scrollToTop();
                        }
                      }}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isWeatherDetailPage
                          ? isActive
                            ? "text-white bg-white/20 font-bold"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                          : isActive
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-bold"
                          : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
