import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';

import Page from '../layout/Page';

import { styles, API_ROOT } from '../constants';
import Content from '../components/Content';
import H3 from '../components/H3';
import Button from '../components/Button';
import { useUserState, useTokenState } from '../hooks/usePersistedState';
import { getRepoENSName, getDeployedURL } from '../utils';

const Project = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token , setToken] = useTokenState('');
  // @ts-ignore
  const [user, setUser] = useUserState<TUser>({});
  const [repositories, setRepositories] = useState<any>([]);
  const [connectedRepo, setConnectedRepo] = useState<any>(null);

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
    } else if (!token) {
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
    setLoading(true);
    try {
      const { data: { hash } } = await axios.post(`${API_ROOT}/repo`, {
        username: user.login,
        projectName: repo.name,
      });
      const ensName = getRepoENSName(user, repo);

      await axios.post(`${API_ROOT}/ens`, {
        ensName: `${user.login.toLowerCase()}.qqq.eth`,
      });

      await axios.post(`${API_ROOT}/ens`, {
        ensName,
      });

      await axios.put(`${API_ROOT}/ens`, {
        ensName,
        content: hash,
      });
      setConnectedRepo(repo);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Page
      navColor={styles.dark}
      title="Poseidon Network | QService"
    >
      <Content style="align-items: center; padding-top: 59px; min-height: 550px;">
        { connectedRepo ?
            <div>
              <Button style="width: 100px; margin-bottom: 50px;" title="Back" onClick={() => setConnectedRepo(null)} />
              <H3 style="margin-bottom: 20px;">Repository: { connectedRepo.name }</H3>
              <H3>URL: <a href={getDeployedURL(user, connectedRepo)}>{ getDeployedURL(user, connectedRepo) }</a></H3>
            </div>
          :
          <>
            <H3 color={styles.primaryColor}>All Repositories</H3>
            { loading ?
              <Content style="align-items: center; justify-items: center; margin-top: 150px;">
                  <BeatLoader
                    size={15}
                    color={styles.primaryColor}
                    loading={loading}
                  />
                </Content>
              :
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
            }
          </>
        }
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
