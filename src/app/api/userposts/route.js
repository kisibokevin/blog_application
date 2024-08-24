
import prisma from '@/utils/connect'
import { NextResponse } from "next/server";
import { auth } from '@/auth';

// fetch all posts that the user has from the server using user session

export const GET = async (req) => {
    const session = await auth();

    if (!session?.user?.id) {
        return new NextResponse(null, { status: 401 });
    }

    try {
        const userPosts = await prisma.post.findMany({
            where: { userId: session.user.id },
            include: { user: true },
        });

        return new NextResponse(JSON.stringify(userPosts), { status: 200 });
    } catch (err) {
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
}

