import { useRouter } from 'next/router';
import Layout from '../components/layout';

function Home() {
  const router = useRouter();
  const { locale } = router;
  return <Layout title="Home Page">{locale === 'en' && 'Home page'}</Layout>;
}

export default Home;
