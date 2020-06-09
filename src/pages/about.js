import React from "react";
import Layout from "../components/Layout";
import Anchor from "../components/Anchor";
import SEO from "../components/SEO";

export default function About() {
  return (
    <Layout>
      <SEO />
      <section>
        <p>
          OSS
          が好きなフロントエンドエンジニアです。開発者の体験を向上させること、フロントエンドのパフォーマンスを改善することに関心があります。
        </p>
      </section>
      <section>
        <h2>Open Source</h2>
        <ul>
          <li>
            <Anchor href="https://github.com/prettier/prettier">
              Prettier
            </Anchor>{" "}
            An opinionated code formatter
          </li>
          <li>
            ex-
            <Anchor href="https://github.com/BoostIO/Boostnote">
              Boostnote
            </Anchor>{" "}
            A markdown editor for developers on Mac, Windows and Linux.{" "}
          </li>
        </ul>
      </section>
      <section>
        <h2>Work History</h2>
        <ul>
          <li>
            <Anchor href="https://ubie.life">Ubie, inc</Anchor>{" "}
            ソフトウェアエンジニア(インターン) (2018/ 12 ~ 2020/05)
          </li>
          <li>
            <Anchor href="https://boostio.co">BoostIO, inc</Anchor>{" "}
            ソフトウェアエンジニア (2017/01 ~ 2018/12)
          </li>
        </ul>
      </section>
    </Layout>
  );
}
