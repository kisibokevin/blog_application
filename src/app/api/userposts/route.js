
import prisma from '@/utils/connect'
import { NextResponse } from "next/server";
import { auth } from '@/auth';

// fetch all posts that the user has from the server using user session

export const GET = async (req) => {
    
    const session = await auth();

    if (!session?.user?.id) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized: No user ID' }), { status: 401 });
    }
    
    
    try {
        const userPosts = await prisma.post.findMany({
            where: { user: { email: session.user.email } },
            //include: { user: true },
        });

        return new NextResponse(JSON.stringify(userPosts), { status: 200 });

    } catch (err) {
        console.error("Error fetching user posts:", err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
};

