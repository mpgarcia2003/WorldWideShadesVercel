export default function BlackoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Preload hero image — browser starts downloading before JS bundle */}
      <link
        rel="preload"
        as="image"
        href="https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_400/v1776277846/photo-1616594039964-ae9021a400a0_o7co15.jpg"
        media="(max-width: 768px)"
      />
      <link
        rel="preload"
        as="image"
        href="https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1776277846/photo-1616594039964-ae9021a400a0_o7co15.jpg"
        media="(min-width: 769px)"
      />
      {children}
    </>
  );
}
