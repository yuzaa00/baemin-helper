import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';

export const loader: LoaderFunction = async ({ params }) => {
  return params.detail;
};

export default function detail() {
  const detail = useLoaderData();

  return (
    <div>
      <h1>Some option: {detail}</h1>
    </div>
  );
}
