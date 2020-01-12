import { useState, useEffect } from 'react';

import { withTranslation, i18n } from '../i18n';
import { styles } from '../constants';

interface IProps {
  isOpened: boolean;
  changeLanguage: (lang: string) => () => void;
}

const MobileMenu = ({ changeLanguage, isOpened, t }: IProps & ITrans) => {
  const [currentPath, setCurrentPath] = useState<string>('');
  const [currentLang, setLang] = useState<string>(i18n.language);

  useEffect(() => {
    setCurrentPath(window.location.pathname.replace(/\//g, ''));
    setLang(i18n.language);
  }, [i18n.language]);

  const itemActiveClass = (path: string) =>
    currentPath === path ? 'is-active' : '';

  return (
    <nav
      id="m-nav"
      className={`${isOpened ? 'is-active' : ''}`}
      role="navigation"
    >
      <div id="menu">
        <img className="menu-logo" src="/static/Logo.png" />
        <ul>
          {/* <li className="item">
            <a href="/technology" className={itemActiveClass('technology')}>
              {t('nav.technology')}
            </a>
          </li> */}
        </ul>
      </div>

      <style jsx>{`
        .flag-icon {
          margin-right: 13px;
        }

        nav {
          display: none;
          position: absolute;
          top: 0;
          right: 0;
          z-index: 2;
          visibility: hidden;
        }

        nav.is-active {
          visibility: visible;
        }

        nav.is-active #menu {
          transform: none;
        }

        #menu {
          position: absolute;
          right: -30px;
          top: 0px;
          width: 285px;
          height: 100vh;
          padding: 50px;
          overflow: scroll;

          background: ${styles.lightColor};
          list-style-type: none;
          -webkit-font-smoothing: antialiased;
          /* to stop flickering of text in safari */

          transform-origin: 0% 0%;
          transform: translate(120%, 0);
          transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
        }

        .menu-logo {
          height: 30px;
          top: 25px;
          position: absolute;
        }

        ul {
          padding-left: 0;
          margin-top: 30px;
        }

        li {
          margin-bottom: 22px;
          font-size: 18px;
          color: ${styles.dark};
          list-style-type: none;
        }

        a {
          color: ${styles.dark};
          font-size: 18px;
          justify-content: flex-start;
        }

        a.is-active {
          font-weight: bold;
        }

        @media only screen and (max-width: 1024px) {
          nav {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default withTranslation('nav')(MobileMenu);
