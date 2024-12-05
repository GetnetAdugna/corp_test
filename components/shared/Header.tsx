import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/config/site.settings';
import { headerNavLinks } from '@/data/config/headerNavLinks';
import Link from './Link';
import MobileNav from './MobileNav';
import ActiveLink from '@/components/shared/ActiveLink';
import Image from '@/components/shared/Image';
import AuthButtons from './AuthButtons';
import { isAuthenticated } from 'utils/utils';

const Header = async ({ className }: { className?: string }) => {
  const isUserAuthenticated = await isAuthenticated();
  console.log('isUserAuthenticated Header', isUserAuthenticated);
  return (
    <header
      className={cn(
        'flex items-center justify-between flex-wrap w-full lg:mb-32 p-6 max-w-full container-wide',
        className,
      )}
    >
      <div>
        <Link href="/" aria-label={siteConfig.logoTitle}>
          <div className="flex items-center gap-3 justify-between">
            <Image
              src="/static/logos/logo_c2.png"
              alt="Niche AI"
              height={100}
              width={100}
              className="group-hover:animate-wiggle "
            />
            <div className="hidden text-2xl font-semibold lg:flex h-full">
              ______ Niche AI ______
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center leading-5 gap-4 sm:gap-6">
        {headerNavLinks.map((link) => (
          <ActiveLink
            key={link.title}
            href={link.href}
            className="nav-link hidden sm:block"
            activeClassName="nav-link-active"
          >
            <span>{link.title}</span>
          </ActiveLink>
        ))}
        {/*<SearchButton />
        <ThemeSwitch />
        */}
        <MobileNav isUserAuthenticated={isUserAuthenticated} />
      </div>
      <AuthButtons isUserAuthenticated={isUserAuthenticated} />
    </header >
  );
};

export default Header;