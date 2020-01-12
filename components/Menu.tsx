import { withTranslation } from '../i18n';
import { styles } from '../constants';
import { useTokenState, useUserState } from '../hooks/usePersistedState';

interface IProps {
  changeLanguage: (lang: string) => () => void;
  langIconClass: string;
}

const Menu = ({}: IProps & ITrans) => {
  const [token , setToken] = useTokenState('');
  // @ts-ignore
  const [user, setUser] = useUserState<TUser>({});

  const onLogout = () => {
    setToken('');
    setUser({});
  };

  return (
    <nav className="navigation" role="navigation">
      <ul>
        { token &&
          <li className="item">
            <a onClick={onLogout} href="/">
              Logout
            </a>
          </li>
          }
        { user && user.avatar_url && <img className="avatar" src={user.avatar_url} /> }
      </ul>

      <style jsx>{`
        a {
          cursor: pointer;
          color: ${styles.primaryColor};
          transition: color 0.3s;
        }

        a:hover {
          color: ${styles.lightColor};
        }

        a.is-active {
          color: ${styles.lightColor};
          font-weight: bold;
        }

        nav {
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: flex-end;
        }

        .avatar {
          max-width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-left: 20px;
        }

        .down-arrow {
          width: 28px;
          height: 28px;
        }

        .flag-icon {
          margin-right: 13px;
        }

        .dropdown li {
          font-size: 16px;
          font-weight: normal;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: normal;
          color: #1d202b;
          list-style-type: none;
          margin: 0 0 13px;
        }

        .dropdown a {
          color: #1d202b !important;
        }

        .dropdown {
          display: flex;
          border-radius: 2px;
          box-shadow: 0 5px 15px 0 #1d202b;
          background-color: #d7f2ee;
          flex-direction: column;
          margin: 8px 10px 0;
          padding: 16.4px 15px 0;
          transform: translateX(-50px);
          position: absolute;
          transition: visibility 0.1s;
          visibility: hidden;
          position: absolute;
          top: 55px;
          z-index: 10;
        }

        .dropdown-trigger:hover ~ .dropdown,
        .dropdown:hover {
          visibility: visible;
        }

        .item a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .navigation > ul {
          display: flex;
          flex-direction: row;
          margin: 0;
        }

        .navigation li {
          margin-left: 24px;
          display: flex;
          align-items: center;
        }

        .navigation a {
          font-size: 16px;
        }

        @media only screen and (max-width: 1024px) {
          .navigation {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default withTranslation('nav')(Menu);
