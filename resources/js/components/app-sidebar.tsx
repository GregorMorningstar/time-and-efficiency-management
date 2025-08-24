
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { MonitorCog, Folder, LayoutGrid, BookOpen, Factory, Calendar,MessagesSquare, BrainCog   } from 'lucide-react'; 
import AppLogo from './app-logo';
export function AppSidebar() {
    interface User {
        name?: string;
        role?: 'admin' | 'moderator' | 'employee';
        barcode?: string;
    }

    interface PageProps {
        auth?: {
            user?: User;
        };
        // add other props if needed
        [key: string]: unknown;
    }

    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;

    // Menu dla moderatora
    const moderatorNavItems = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'produkcja',
              href: '/dashboard/moderator/production',
            icon: Factory,
        },
        {
            title: 'Szczegóły maszyn',
            href: '/dashboard/moderator/machines',
            icon: BrainCog,
        },
        {
            title: 'planowanie',
            href: '/dashboard/moderator/planning',
            icon: Calendar,
        },
        {
            title: 'wydziały',
            href: '/dashboard/moderator/departments',
            icon: BookOpen,
        },
    ];

    // Menu dla administratora
    const adminNavItems = [
        {
            title: 'Dashboard',
            href: 'admin/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Użytkownicy',
            href: 'admin/users',
            icon: Folder,
        },
        {
            title: 'Raporty',
            href: '/admin/reports',
            icon: BookOpen,
        },
          
    ];

    // Menu dla pracownika
    const employeeNavItems = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Moje dane',
            href: '/profile',
            icon: Folder,
        },
    ];

    // Wspólne menu dla wszystkich zalogowanych
  const commonNavItems =
        user?.role === 'moderator'
            ? []
            : [
                 {
                    title: 'Chat',
                    href: '/chat',
                    icon: MessagesSquare ,
                },
                {
                    title: 'Maszyny',
                    href: '#',
                    icon: BrainCog,
                },
                {
                    title: 'Awarie',
                    href: '#',
                    icon: MonitorCog,
                },
               
            ];

    // Wybierz menu na podstawie roli
    let mainNavItems = employeeNavItems;
    if (user?.role === 'moderator') mainNavItems = moderatorNavItems;
    else if (user?.role === 'admin') mainNavItems = adminNavItems;

    // Dodaj wspólne menu na początek
    mainNavItems = [...commonNavItems, ...mainNavItems];

    return (
        <Sidebar collapsible="icon" variant="inset">
                                    <SidebarFooter>
                                        <SidebarMenu>
                                            {user ? (
                                                <>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton size="lg" disabled className="cursor-default !opacity-100 flex flex-col items-start">
                                                         
                                                            {user.role && <span className="text-xs text-muted-foreground">{user.role}</span>}
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link href={typeof route === 'function' ? (route as any)('logout') : '/logout'} method="post" as="button" className="text-left text-red-500 hover:text-red-600">
                                                                Wyloguj
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </>
                                            ) : (
                                                <>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link href={typeof route === 'function' ? (route as any)('login') : '/login'} className="text-left">
                                                                Zaloguj
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link href={typeof route === 'function' ? (route as any)('register') : '/register'} className="text-left">
                                                                Rejestracja
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </>
                                            )}
                                        </SidebarMenu>
                                    </SidebarFooter>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

                     
        </Sidebar>
    );
}
