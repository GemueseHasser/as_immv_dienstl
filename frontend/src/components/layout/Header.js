import React, { useEffect, useRef, useState } from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import BrandLogos from '../BrandLogos';
import { useAuth } from '../../auth/AuthContext';

export default function Header() {
  const navRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [mobileBrandProgress, setMobileBrandProgress] = useState(0);
  const { isAdmin, isAuthenticated, logout } = useAuth();

  const navItems = [
    { label: 'Start', to: '/', icon: <HomeRoundedIcon fontSize="small" /> },
    { label: 'Immobilienverwaltung', to: '/immobilienverwaltung', emphasis: true, icon: <ApartmentRoundedIcon fontSize="small" /> },
    { label: 'Dienstleistungen', to: '/dienstleistungen', emphasis: true, icon: <ConstructionRoundedIcon fontSize="small" /> },
    { label: 'Kontakt', to: '/kontakt', icon: <MailOutlineRoundedIcon fontSize="small" /> },
  ];

  useEffect(() => {
    const node = navRef.current;
    if (!node) return undefined;
    const updateScrollState = () => {
      const maxScrollLeft = node.scrollWidth - node.clientWidth;
      setCanScrollLeft(node.scrollLeft > 6);
      setCanScrollRight(maxScrollLeft - node.scrollLeft > 6);
    };
    updateScrollState();
    node.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      node.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  useEffect(() => {
    const updateBrandVisibility = () => {
      const isMobile = window.innerWidth <= 980;
      if (!isMobile) {
        setMobileBrandProgress(0);
        return;
      }
      const currentScrollY = window.scrollY;
      const startFade = 36;
      const endFade = 198;
      const rawProgress = (currentScrollY - startFade) / (endFade - startFade);
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      const easedProgress = clampedProgress * clampedProgress * (3 - 2 * clampedProgress);
      setMobileBrandProgress(easedProgress);
    };
    updateBrandVisibility();
    window.addEventListener('scroll', updateBrandVisibility, { passive: true });
    window.addEventListener('resize', updateBrandVisibility);
    return () => {
      window.removeEventListener('scroll', updateBrandVisibility);
      window.removeEventListener('resize', updateBrandVisibility);
    };
  }, []);

  const scrollNav = (direction) => {
    const node = navRef.current;
    if (!node) return;
    node.scrollBy({ left: direction === 'left' ? -180 : 180, behavior: 'smooth' });
  };

  return (
    <header className="site-header" style={{ '--mobile-brand-progress': mobileBrandProgress }}>
      <div className="mobile-header-top">
        <div className="header-aurora" aria-hidden="true" />
        <div className="container header-bar compact-shell">
          <NavLink to="/" className="brand header-brand" aria-label="Zur Startseite">
            <BrandLogos variant="header" />
          </NavLink>

          <nav className="main-nav desktop-nav" aria-label="Hauptnavigation">
            <div className="nav-primary nav-primary-premium">
              {navItems.map((item) => (
                <div key={item.label} className="nav-item">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      ['nav-link', item.emphasis ? 'nav-link-area' : '', isActive ? 'active' : ''].filter(Boolean).join(' ')
                    }
                  >
                    <span className="nav-link-icon">{item.icon}</span>
                    <span className="nav-link-label">{item.label}</span>
                    {item.emphasis ? <span className="nav-link-glow" aria-hidden="true" /> : null}
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="nav-cta-group nav-cta-group-compact">
              {isAdmin ? (
                <NavLink to="/admin" className="nav-link subtle">
                  <span className="nav-link-icon"><DashboardRoundedIcon fontSize="small" /></span>
                  <span className="nav-link-label">Admin</span>
                </NavLink>
              ) : null}
              {isAuthenticated ? (
                <button type="button" className="nav-link subtle nav-link-button" onClick={logout}>
                  <span className="nav-link-icon"><LogoutRoundedIcon fontSize="small" /></span>
                  <span className="nav-link-label">Logout</span>
                </button>
              ) : (
                <NavLink to="/anmelden" className="nav-link subtle">
                  <span className="nav-link-icon"><LoginRoundedIcon fontSize="small" /></span>
                  <span className="nav-link-label">Login</span>
                </NavLink>
              )}
            </div>
          </nav>
        </div>
      </div>

      <div className="mobile-floating-nav-wrap">
        <div className="container compact-shell mobile-floating-nav-shell">
          <IconButton
            className={`mobile-nav-arrow mobile-nav-arrow-left ${canScrollLeft ? 'is-visible' : 'is-hidden'}`}
            onClick={() => scrollNav('left')}
            aria-label="Navigation nach links scrollen"
            size="small"
          >
            <ChevronLeftRoundedIcon />
          </IconButton>

          <nav ref={navRef} className="mobile-floating-nav" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  ['mobile-floating-link', item.emphasis ? 'is-emphasis' : '', isActive ? 'active' : ''].filter(Boolean).join(' ')
                }
              >
                <span className="mobile-floating-link-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <IconButton
            className={`mobile-nav-arrow mobile-nav-arrow-right ${canScrollRight ? 'is-visible' : 'is-hidden'}`}
            onClick={() => scrollNav('right')}
            aria-label="Navigation nach rechts scrollen"
            size="small"
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
