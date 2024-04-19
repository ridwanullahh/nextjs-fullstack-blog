import { getSessionUser } from '@/actions/user';
// import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

// GET ALL COMMENTS OF A POST
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { searchParams } = new URL(req.url);

  const postSlug = searchParams.get('postSlug');

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};

// CREATE A COMMENT
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const session = await getSessionUser();

  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ message: 'Not Authenticated!' }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};

// DELETE A COMMENT
export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  const session = await getSessionUser();
  const body = await req.json();

  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ message: 'Not Authenticated!' }), {
      status: 401,
    });
  }

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return new NextResponse(JSON.stringify({ message: 'Not Authenticated!' }), {
      status: 401,
    });
  }

  const { user } = sessionUser;

  if (user.email !== sessionUser.user.email) {
    return new NextResponse(JSON.stringify({ message: 'Not Authenticated!' }), {
      status: 401,
    });
  }

  const { id } = body;

  if (!id) {
    return new NextResponse(JSON.stringify({ message: 'ID does not exist!' }), {
      status: 500,
    });
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return new NextResponse(
        JSON.stringify({ message: 'Comment does not exist!' }),
        { status: 404 }
      );
    }

    if (user.email !== comment.userEmail) {
      return new NextResponse(
        JSON.stringify({ message: 'Not Authenticated!' }),
        { status: 401 }
      );
    }

    await prisma.comment.delete({
      where: { id },
    });

    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};
