import {
    RiBookletLine,
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
            icon: <RiBookletLine />,
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
            href: '/dashboard/admin/adminoverview',
        },
        {
            icon: <RiEditLine />,
            label: 'Create Post',
            href: '/dashboard/admin/createpost',
        },
        {
            icon: <RiBookletLine />,
            label: 'Manage Posts',
            href: '/dashboard/admin/manageposts',
        },
        {
            icon: <RiFlag2Line />,
            label: 'Moderation',
            href: '/dashboard/admin/moderation',
        },
        {
            icon: <RiDeleteBinLine />,
            label: 'Deleted Posts',
            href: '/dashboard/admin/deletedposts',
        },
        {
            icon: <RiUserLine />,
            label: 'Manage Users',
            href: '/dashboard/admin/manageusers',
        },
        {
            icon: <RiBarChartLine />,
            label: 'Analytics',
            href: '/dashboard/admin/analytics',
        },
        {
            icon: <RiSettings3Line />,
            label: 'Settings',
            href: '/dashboard/admin/settings',
        },
    ],
}

export default menuItems;