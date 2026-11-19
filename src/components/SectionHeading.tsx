import { LotusDivider } from './decor/Ornaments';

/**
 * Shared section heading: lotus ornament, inscriptional title, italic line.
 * `sub` is the section's original label text, set beneath the title.
 */
export default function SectionHeading({ title, sub, dark = false, as: Tag = 'h2' }: {
  title: string; sub?: string; dark?: boolean; as?: 'h2' | 'h3';
}) {
  return (
    <div className={`sec-head ${dark ? 'on-dark' : ''}`}>
      <div data-reveal="curtain"><LotusDivider width={200} tone={dark ? 'light' : 'gold'} /></div>
      <Tag className="sec-title" data-reveal="tilt" style={{ ['--d' as string]: 120 }}>{title}</Tag>
      {sub && <p className="sec-sub" data-reveal="fade" style={{ ['--d' as string]: 320 }}>{sub}</p>}
    </div>
  );
}
