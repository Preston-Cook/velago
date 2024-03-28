import Link from 'next/link';
import { Button } from './ui/Button';
import Container from './ui/Container';

const links = [
  {
    text: 'About',
    route: '/about',
  },
  {
    text: 'Contact',
    route: '/contact',
  },
  {
    text: 'FAQ',
    route: '/faq',
  },
  {
    text: 'Privacy Policy',
    route: '/privacy',
  },
  {
    text: 'Disclaimer',
    route: '/disclaimer',
  },
];

export default function Footer() {
  return (
    <footer className="border-t sm:flex sm:justify-between py-3 px-4 border-b ">
      <div className="px-4 sm:px-6 lg:px-8">
        <span className="text-sm  sm:text-center ">
          © 2024{' '}
          <a href="http://localhost:3000" className="hover:underline">
            Velago™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap justify-center md:justify-start items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          {links.map((link, i) => {
            return (
              <li key={i}>
                <Link href={link.route}>
                  <Button className="pl-0" variant="link">
                    {link.text}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
