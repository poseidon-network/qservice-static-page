import React from 'react';
import Page from '../layout/Page';

import { styles, API_ROOT } from '../constants';
import Content from '../components/Content';
import H2 from '../components/H2';
import Button from '../components/Button';

const Home = () => {
  return (
    <Page
      navColor={styles.lightColor}
      title="Poseidon Network | QService"
    >
      <div className="light-bg" />
      <Content style="align-items: center;">
        <div className="form">
          <H2 color={styles.dark}>Get Started for Free</H2>
          <Button
            margin="100px 0;"
            uri={`${API_ROOT}/connect/github`}
            title="Login with Github"
          />
        </div>
      </Content>
      <div className="dark-bg" />
      <style jsx>{`
        .form {
          position: absolute;
          top: 180px;
          width: 555px;
          height: 400px;
          border-radius: 4px;
          box-shadow: 0 2px 10px 0 #90cfbe;
          background-color: #ffffff;
          padding: 18px 23px 18px 25px;
        }

        .light-bg {
          background-color: ${styles.lightColor};
          height: 350px;
          width: 100%;
        }

        .dark-bg {
          background-color: ${styles.darkLight};
          height: 350px;
          width: 100%;
        }
      `}</style>
    </Page>
  );
};

export default Home;
