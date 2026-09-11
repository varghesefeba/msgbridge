import type { Metadata } from "next";
import ProseTemplate from "@/components/templates/ProseTemplate";

export const metadata: Metadata = {
  title: "The DLT registration checklist most teams miss",
  description: "The five things that most often delay DLT approval, and how to avoid each one.",
  alternates: { canonical: "/blog/dlt-registration-checklist" },
};

export default function Post() {
  return (
    <ProseTemplate eyebrow="Blog" title="The DLT registration checklist most teams miss" crumb="Blog" lede="The five things that most often delay approval — and how to avoid each one.">
      <p>Most DLT rejections trace back to the same handful of mistakes. Here&rsquo;s what to check before you submit.</p>
      <h2>1. Variable text doesn&rsquo;t match exactly</h2>
      <p>The static text around your variables has to match your registered template character-for-character, punctuation included. Copy the approved string directly into your code rather than retyping it.</p>
      <h2>2. Wrong template category</h2>
      <p>A promotional-sounding line in a transactional template gets flagged. Keep transactional templates strictly to order and account updates — nothing that reads like an offer.</p>
      <h2>3. Header doesn&rsquo;t match your brand name</h2>
      <p>A 6-character header that doesn&rsquo;t reasonably represent your registered business name is a common rejection reason. Pick something recognisable, not clever.</p>
      <h2>4. Missing TM chain binding</h2>
      <p>An approved template still won&rsquo;t deliver if it isn&rsquo;t bound to your entity and header on the operator route you&rsquo;re sending from. Confirm binding status before your first live send.</p>
      <h2>5. No consent record for promotional sends</h2>
      <p>Keep opt-in timestamps against the same identifiers you register on DLT from day one — retrofitting consent records after an audit request is much harder.</p>
      <p>See the full <a href="/compliance">DLT & TRAI compliance guide</a> for the complete reference, or let us <a href="/services/dlt-registration">run registration for you</a>.</p>
    </ProseTemplate>
  );
}
