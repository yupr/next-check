import Link from 'next/link';
import { NextPage, NextPageContext } from 'next';

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <div className="error-container">
      {statusCode && <h1>Error: {statusCode}</h1>}
      <p>We are sorry! There was an error</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
