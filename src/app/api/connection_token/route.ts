import createConnectionToken from "./connection_token";

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request: Request) {
  const { account_id } = await request.json();
  const secret = await createConnectionToken(account_id);
  return Response.json({ secret });
}
