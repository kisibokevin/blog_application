import {
    RiDashboardLine,
    RiEditLine,
    RiFileListLine,
    RiFileList2Line,
    RiFlag2Line,
    RiDeleteBinLine,
    RiImageLine,
    RiUserLine,
    RiBarChartLine,
    RiSettingsLine,
    RiSettings3Line,
} from "@remixicon/react";


const menuItems = {
    creator: [
        {
            icon: <RiDashboardLine />,
            label: 'Overview',
            href: '/dashboard/creator/overview',
        },
        {
            icon: <RiEditLine />,
            label: 'Create Post',
            href: '/dashboard/creator/createpost',
        },
        {
            icon: <RiFileListLine />,
            label: 'My Posts',
            href: '/dashboard/creator/myposts',
        },
        {
            icon: <RiFileList2Line />,
            label: 'Scheduled Posts',
            href: '/dashboard/creator/scheduled-posts',
        },
        {
            icon: <RiImageLine />,
            label: 'Media Library',
            href: '/dashboard/creator/media-library',
        },
        {
            icon: <RiUserLine />,
            label: 'Edit Profile',
            href: '/dashboard/creator/edit-profile',
        },
        {
            icon: <RiSettingsLine />,
            label: 'Settings',
            href: '/dashboard/creator/settings',
        },
    ],

    admin: [
        {
            icon: <RiDashboardLine />,
            label: 'Overview',
            href: '/dashboard/admin/overview',
        },
        {
            icon: <RiEditLine />,
            label: 'Manage Posts',
            href: '/dashboard/admin/manage-posts',
        },
        {
            icon: <RiFlag2Line />,
            label: 'Content Moderation',
            href: '/dashboard/admin/content-moderation',
        },
        {
            icon: <RiDeleteBinLine />,
            label: 'Deleted Posts',
            href: '/dashboard/admin/deleted-posts',
        },
        {
            icon: <RiUserLine />,
            label: 'Manage Users',
            href: '/dashboard/admin/manage-users',
        },
        {
            icon: <RiBarChartLine />,
            label: 'Analytics',
            href: '/dashboard/admin/analytics',
        },
        {
            icon: <RiSettingsLine />,
            label: 'Settings',
            href: '/dashboard/admin/settings',
        },
        {
            icon: <RiSettings3Line />,
            label: 'Site Settings',
            href: '/dashboard/admin/settings',
        },
    ],
}

export default menuItems;