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

// Footer configuration
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