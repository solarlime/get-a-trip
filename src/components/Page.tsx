import { Link } from 'react-router-dom';

function Page() {
  return (
    <div>
      The future starts
      {' '}
      <Link to="./checkout">now!</Link>
    </div>
  );
}

export default Page;
