import Link from 'next/link';
import { Button } from './ui/Button';

const links = [
  {
    text: 'Search',
    route: '/search',
  },
  {
    text: 'Contact',
    route: '/contact',
  },
  {
    text: 'About',
    route: '/about',
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
        <ul className="flex flex-wrap justify-center sm:justify-start items-center mt-3 text-sm font-medium">
          {links.map((link) => (
            <li key={`${link.text}${link.route}`}>
              <Link href={link.route}>
                <Button className="sm:pl-0" variant="link">
                  {link.text}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
