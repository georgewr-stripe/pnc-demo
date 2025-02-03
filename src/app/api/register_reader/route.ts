import registerReader from "./register_reader";
import { RegisterReaderProps } from "../types";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const data: RegisterReaderProps = await request.json();
  const reader = await registerReader(data);
  return Response.json(reader);
}
