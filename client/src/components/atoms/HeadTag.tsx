import Head from 'next/head';

function HeadTag({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content="MintCarbon - Carbon credits turned into NFTs" />
      <meta property="og:image" content="/assets/carbon_logo.png" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="Carbon credits turned into NFTs. Use your NFT’s within the Etherum blockchain and get access to liquidity and yield through decentralized markets. Sign up for Early Access."
      />
    </Head>
  );
}

export default HeadTag;
