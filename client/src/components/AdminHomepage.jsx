import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  ArrowDown,
  BarChart3,
  Leaf,
  TrendingUp,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from 'lucide-react';
import SplitText from './Splittext';
import Orb from './Orb';

const AdminHomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAnimationComplete = () => {
    // called when all letters finish animating
    // keep short for debugging or hook additional logic
    console.log('Heading animation complete');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToFeatures = () => scrollToSection('about');

  const features = [
    {
      icon: <BarChart3 size={40} />,
      title: 'Overview',
      description:
        'Get real-time insights into canteen operations with comprehensive dashboards and analytics that help you make data-driven decisions.',
      gradient: 'from-[#d946ef] to-[#8b5cf6]',
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Meal Analytics',
      description:
        'Track consumption patterns, predict demand, and optimize inventory management with advanced AI-powered meal analytics.',
      gradient: 'from-[#8b5cf6] to-[#d946ef]',
    },
    {
      icon: <Leaf size={40} />,
      title: 'Green Score Tracker',
      description:
        'Monitor your environmental impact with our sustainability metrics. Reduce waste, track carbon footprint, and achieve green goals.',
      gradient: 'from-[#d946ef] to-[#8b5cf6]',
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* ---------- NAVBAR ---------- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[rgba(139,92,246,0.3)] shadow-lg shadow-[#d946ef]/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              Karmic Canteen
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-white/70 hover:text-white transition-all duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white/70 hover:text-white transition-all duration-300"
              >
                About
              </button>
              <Link
                to="/dashboard"
                className="text-white/70 hover:text-white transition-all duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/loginadmin"
                className="px-6 py-2 bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] text-white rounded-full font-medium hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] hover:scale-105 transition-all duration-300"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-[#d946ef] transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-[rgba(139,92,246,0.3)]">
            <div className="px-4 pt-4 pb-6 space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left text-white/70 hover:text-white"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-white/70 hover:text-white"
              >
                About
              </button>
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/70 hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                to="/loginadmin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 py-2 bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] text-white rounded-full font-medium text-center hover:shadow-[0_0_20px_rgba(217,70,239,0.6)]"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-20 md:pt-24"
        style={{ scrollMarginTop: '6rem' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d946ef]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8b5cf6]/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#d946ef]/10 to-[#8b5cf6]/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#d946ef] rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SplitText
              text="Karmic Canteen System"
              tag="h1"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
              delay={80}
              duration={0.8}
              ease="power3.out"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </motion.div>

          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-white/70 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Smart, Sustainable & Automated Meal Management
          </motion.p>

          {/* Orb visual - full width canvas */}
          <div className="w-full h-[420px] mb-8 rounded-3xl overflow-hidden" style={{ position: 'relative' }}>
            <Orb hue={260} hoverIntensity={0.5} rotateOnHover={true} forceHoverState={false} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={scrollToFeatures}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] text-white text-lg font-semibold rounded-full overflow-hidden hover:shadow-[0_0_30px_rgba(217,70,239,0.8)] transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowDown className="group-hover:translate-y-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c026d3] to-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </motion.div>
        </div>

        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            animation: gradient 3s ease infinite;
          }
          @keyframes spin-slow {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
        `}</style>
      </section>

      <section id="about" className="relative py-20 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d946ef]/5 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] bg-clip-text text-transparent">
              Why Choose Karmic Canteen?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Experience the future of canteen management with intelligent automation,
              sustainability tracking, and seamless operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 bg-[#1a1a1a] rounded-2xl border border-[rgba(139,92,246,0.3)] hover:border-[#d946ef] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(217,70,239,0.3)]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d946ef]/10 to-[#8b5cf6]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div
                    className={`inline-block p-4 bg-gradient-to-r ${feature.gradient} rounded-xl mb-6 group-hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] transition-all duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#d946ef] group-hover:to-[#8b5cf6] group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#d946ef]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="relative bg-[#1a1a1a] rounded-3xl p-12 border border-[rgba(139,92,246,0.3)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d946ef]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8b5cf6]/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Experience the Future of{' '}
                  <span className="bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] bg-clip-text text-transparent">
                    Canteen Management
                  </span>
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Our platform combines cutting-edge technology with sustainable practices to
                  deliver an unparalleled canteen management experience. From automated
                  ordering to waste reduction, we've got you covered.
                </p>
                <ul className="space-y-3">
                  {[
                    'Automated meal planning and ordering',
                    'Real-time inventory tracking',
                    'Sustainable waste management',
                    'Smart payment integration',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d946ef] to-[#8b5cf6] rounded-3xl animate-pulse"></div>
                  <div className="absolute inset-2 bg-[#0a0a0a] rounded-3xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] bg-clip-text text-transparent mb-2">
                        100%
                      </div>
                      <div className="text-white/70 text-lg">Digital</div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#d946ef] to-[#8b5cf6] rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-[#8b5cf6] to-[#d946ef] rounded-full blur-xl animate-pulse delay-700"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative bg-[#0a0a0a] border-t border-[rgba(139,92,246,0.3)]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d946ef] via-[#8b5cf6] to-[#d946ef] animate-gradient bg-[length:200%_auto]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] bg-clip-text text-transparent mb-4">
                Karmic Canteen System
              </h3>
              <p className="text-white/70 mb-6 max-w-md">
                Revolutionizing canteen management with smart automation, sustainability
                tracking, and seamless operations for a better tomorrow.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1a1a1a] border border-[rgba(139,92,246,0.3)] rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-[#d946ef] hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] transition-all duration-300"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1a1a1a] border border-[rgba(139,92,246,0.3)] rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-[#d946ef] hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] transition-all duration-300"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1a1a1a] border border-[rgba(139,92,246,0.3)] rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-[#d946ef] hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] transition-all duration-300"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1a1a1a] border border-[rgba(139,92,246,0.3)] rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-[#d946ef] hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] transition-all duration-300"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[rgba(139,92,246,0.3)] text-center">
            <p className="text-white/60">
              © {currentYear} Karmic Canteen System. All rights reserved.
            </p>
            <p className="text-white/50 text-sm mt-2">
              Built with innovation, powered by sustainability
            </p>
          </div>
        </div>

        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            animation: gradient 3s ease infinite;
          }
        `}</style>
      </footer>
    </div>
  );
};

export default AdminHomePage;
