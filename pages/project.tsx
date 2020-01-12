import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';

import Page from '../layout/Page';

import { styles, API_ROOT } from '../constants';
import Content from '../components/Content';
import H3 from '../components/H3';
import Button from '../components/Button';
import { useUserState, useTokenState } from '../hooks/usePersistedState';

const Project = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token , setToken] = useTokenState('');
  // @ts-ignore
  const [user, setUser] = useUserState<TUser>({});
  const [repositories, setRepositories] = useState<any>([]);

  useEffect(() => {
    const getAccessToken = async (code: string) => {
      const { data } = await axios.get(`${API_ROOT}/oauth/github/callback?code=${code}`);
      if (data.token) {
        setToken(data.token);
      }
    };

    const searchParams = new window.URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    if (code) {
      getAccessToken(code);
    } else {
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: ` token ${token}`,
        },
      });
      setUser(data);
      setLoading(false);
    };

    const getRepos = async () => {
      const { data } = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: ` token ${token}`,
        },
      });
      setRepositories(data);
    };

    if (token) {
      getUser();
      getRepos();
    }
  }, [token]);

  const onConnect = async (repo: any) => {
    const { data: { hash } } = await axios.post(`${API_ROOT}/repo`, {
      username: user.login,
      projectName: repo.name,
    });
    console.log(hash);
    const ensName = `${repo.name.toLowerCase()}.${user.login.toLowerCase()}.qqq.eth`;
    await axios.post(`${API_ROOT}/ens`, {
      ensName,
    });

    await axios.put(`${API_ROOT}/ens`, {
      ensName,
      content: hash,
    });
  };

  return (
    <Page
      navColor={styles.dark}
      title="Poseidon Network | QService"
    >
      <Content style="padding-top: 59px; min-height: 550px;">
        <H3 color={styles.primaryColor}>All Repositories</H3>

        { loading && <Content style="align-items: center; justify-items: center; margin-top: 150px;">
            <BeatLoader
              size={15}
              color={styles.primaryColor}
              loading={loading}
            />
          </Content>
        }

        <div className="repos">
          {
            repositories.map((repo: any) => (
              <div key={repo.id} className="repo">
                <h5 className="repo-title">{ repo.name }</h5>
                <Button
                  onClick={() => onConnect(repo)}
                  style="margin-top: 100px;"
                  title="Connect"
                />
              </div>
            ))
          }
        </div>
      </Content>

      <div className="dark-bg" />
      <style jsx>{`
        .dark-bg {
          background-color: ${styles.dark};
          height: 350px;
          width: 100%;
        }

        .repos {
          margin-top: 24px;
          display: grid;
          grid-template-columns: auto auto auto auto;
          grid-gap: 24px 30px;
        }

        .repo {
          width: 263px;
          height: 297px;
          border-radius: 2px;
          box-shadow: 0 4px 4px 0 rgba(17, 19, 26, 0.32);
          background-color: ${styles.darkLight};
          padding: 24px;
        }

        .repo-title {
          width: 215px;
          height: 29px;
          font-family: Montserrat;
          font-size: 24px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          color: ${styles.primaryColor};
        }
      `}</style>
    </Page>
  );
};

export default Project;
