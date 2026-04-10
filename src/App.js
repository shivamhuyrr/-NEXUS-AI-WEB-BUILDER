import React, { useState, useEffect } from 'react';
import { Sparkles, Code2, Zap, LayoutTemplate, Copy, MonitorPlay, Github, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LiveRenderer from './components/LiveRenderer';

const NexusLandingPage = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Navigation = () => (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-dark-900/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nexus-600 to-nexus-400 flex items-center justify-center shadow-lg shadow-nexus-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {t('app.title')}
            </span>
          </div>
          <div className="flex items-center space-x-4">

            {/* Language Switcher */}
            <div className="relative group">
              <button className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                <Globe className="w-5 h-5" />
                <span className="text-sm uppercase">{i18n.language || 'en'}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-dark-800 rounded-xl border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button onClick={() => changeLanguage('en')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-nexus-500/20 ${i18n.language === 'en' ? 'text-nexus-400' : 'text-slate-300'}`}>English</button>
                <button onClick={() => changeLanguage('es')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-nexus-500/20 ${i18n.language === 'es' ? 'text-nexus-400' : 'text-slate-300'}`}>Español</button>
                <button onClick={() => changeLanguage('hi')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-nexus-500/20 ${i18n.language === 'hi' ? 'text-nexus-400' : 'text-slate-300'}`}>हिंदी (Hindi)</button>
              </div>
            </div>

            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <button
              className="primary-button px-6 py-2.5 rounded-full text-sm flex items-center gap-2"
              onClick={() => setCurrentPage('builder')}
            >
              <Sparkles className="w-4 h-4" />
              {t('app.start_building')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const HeroSection = () => {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-nexus-400" />
            <span className="text-sm font-medium text-slate-300">
              {t('hero.badge')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight text-white leading-tight"
          >
            {t('hero.title_part_1')} <br />
            <span className="bg-gradient-to-r from-nexus-400 to-fuchsia-400 bg-clip-text text-transparent">
              {t('hero.title_part_2')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
            spellCheck={false}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              className="primary-button text-lg px-8 py-4 rounded-full flex items-center gap-2"
              onClick={() => setCurrentPage('builder')}
            >
              {t('hero.open_builder')} <MonitorPlay className="w-5 h-5" />
            </button>
            <button
              className="glass-button text-lg px-8 py-4 rounded-full text-slate-200 flex items-center gap-2"
              onClick={() => document.getElementById('features').scrollIntoView()}
            >
              {t('hero.learn_more')}
            </button>
          </motion.div>

          {/* Hero Image Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 mx-auto max-w-5xl glass-panel rounded-2xl p-2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10 top-1/2"></div>
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"
              alt="Code Editor Mockup"
              className="rounded-xl w-full object-cover h-[400px] opacity-80"
            />
          </motion.div>
        </div>
      </section>
    );
  };

  const FeaturesSection = () => {
    const features = [
      {
        icon: Zap,
        title: t('features.instant.title'),
        description: t('features.instant.desc')
      },
      {
        icon: LayoutTemplate,
        title: t('features.modern.title'),
        description: t('features.modern.desc')
      },
      {
        icon: Copy,
        title: t('features.export.title'),
        description: t('features.export.desc')
      }
    ];

    return (
      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('features.title')}</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t('features.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-nexus-500/20 flex items-center justify-center mb-6 border border-nexus-400/30">
                  <item.icon className="w-6 h-6 text-nexus-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="app-container">
      <div className="bg-mesh"></div>

      {currentPage === 'home' ? (
        <>
          <Navigation />
          <main className="main-content">
            <HeroSection />
            <FeaturesSection />
          </main>
          <footer className="py-8 text-center text-slate-500 border-t border-white/5 relative z-10 glass-panel">
            <p>{t('footer.text', { year: new Date().getFullYear() })}</p>
          </footer>
        </>
      ) : (
        <LiveRenderer onNavigateHome={() => setCurrentPage('home')} />
      )}
    </div>
  );
};

export default NexusLandingPage;