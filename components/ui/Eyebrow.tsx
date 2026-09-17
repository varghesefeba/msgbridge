// Eyebrows are intentionally removed site-wide: this component renders nothing.
// The prop signature is kept so every existing <Eyebrow index label dark /> call
// site still type-checks without any edits. To bring eyebrows back, restore the
// markup from version control — no call sites need to change.
export default function Eyebrow(_props: { index: string; label: string; dark?: boolean }) {
  return null;
}
