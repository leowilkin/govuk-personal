// Site configuration
export interface SiteConfig {
  name: string;
  titleSeparator: string;
}

export const siteConfig: SiteConfig = {
  name: "NOT GOV.UK",
  titleSeparator: " | "
};

export interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
}

export const navigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function getNavigationWithActive(currentPath: string): NavigationItem[] {
  return navigation.map(item => ({
    ...item,
    active: currentPath === item.href || 
            (item.href !== "/" && currentPath.startsWith(item.href))
  }));
}

// FOOTER CONFIG
export interface FooterLink {
  label: string;
  href: string;
}

export const footerLinks: FooterLink[] = [
  {
    label: "Help",
    href: "/help",
  },
  {
    label: "Cookies",
    href: "/cookies",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Terms and conditions",
    href: "/terms",
  },
  {
    label: "Privacy policy",
    href: "/privacy",
  },
];

// LOGO (in header) CONFIG
export interface LogoConfig {
  text: string;
  href: string;
  customImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
}

export const logoConfig: LogoConfig = {
  text: siteConfig.name,
  href: "/",
  // Uncomment and configure to use a custom image instead of text
  // customImage: {
  //   src: "/assets/images/logo.png",
  //   alt: "not GOV.UK Logo",
  //   width: 120,
  //   height: 30
  // }
};