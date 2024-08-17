import { auth } from "@/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const cat = searchParams.get("cat");
    const POSTS_PER_PAGE = 4;

    const query = {
      take: POSTS_PER_PAGE,
      skip: POSTS_PER_PAGE * (page - 1),
      where: {
        ...(cat && { catSlug: cat }),
      },
    };
    
    try {

      const [posts, count] = await prisma.$transaction([
          prisma.post.findMany(query),
          prisma.post.count({where: query.where}),
        ]);

      return new NextResponse(JSON.stringify({posts, count}), { status: 200 });
    } catch (err) {
      console.error("Error fetching posts:", err); // Log the error
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }, { status: 500 })
      );
    }
};



// create a post
export const POST = async (req) => {
    const session = await auth();
    //console.log(session);
    if (!session) {
        return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401 }
        )
    }

    try {
        const body = await req.json();
        console.log("Received post data:", body); // Log the received data
        const post = await prisma.post.create({
            data: {
                ...body,
                userEmail: session.user.email,
            },

            include: { user: true },
        });

        return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
        console.log(err)
        return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 500 }
        );
    }
};
