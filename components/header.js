import logo from '@/assets/logo.png';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header id="main-header">
      <Link href="/">
        {/* <img src={logo.src} alt="Mobile phone with posts feed on it" /> */}
        {/* <Image src={logo}   alt="Mobile phone with posts feed on it"/> */}
        {/* <Image src={logo} sizes="10vw" alt="An image"/> */}
        {/* <Image src={logo} fill alt="An image"/> */}
        <Image src={logo} width={100} height={100} priority alt="An image"/>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className='cta-link' href="/new-post">New Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
