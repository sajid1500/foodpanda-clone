import Link from "next/link";
import Stripe from "stripe";

export default function page({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const session = stripe.checkout.sessions.retrieve(sessionId!);
  console.log("Session details:", session);
  return (
    <div>
      congratulations! your payment was successful.
      <Link href="/order-status">
        <button className="text-pink-200">Track order</button>
      </Link>
      <p>Session ID: {sessionId}</p>
    </div>
  );
}
