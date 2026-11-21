import { NotFoundPoster } from '../components/page-sections';

export default function NotFound() {
  return (
    <NotFoundPoster
      heading="Shh."
      message="This page went quiet. It may have been pasted over."
      homeLabel="Back to Home"
      workLabel="See the work wall"
    />
  );
}
