interface MediaProps {
  fileName: string;
  title: string;
  mimeType: string;
}
export const VideoPlayer = ({ src }: { src: string }) => <video src={src} controls />;
export const ImageDisplay = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} height={400} />
);
export const PDFViewer = ({ src, title }: { src: string; title: string }) => (
  <iframe src={src} title={title} height={300} />
);

export const renderMediaComponent = (media: MediaProps) => {
  if (!media) return null;

  const { mimeType, fileName } = media;
  if (mimeType.startsWith('video/')) {
    return <VideoPlayer src={fileName} />;
  } else if (mimeType.startsWith('image/')) {
    return <ImageDisplay src={fileName} alt={media.title} />;
  } else if (mimeType.startsWith('application/pdf')) {
    return <PDFViewer src={fileName} title={media.title} />;
  } else {
    return null;
  }
};
export const renderMediaThumbnail = (mediaItem: { mimeType: string; fileName: string }) => {
  if (!mediaItem) return null;

  const { mimeType, fileName } = mediaItem;
  switch (true) {
    case mimeType.startsWith('video'):
      return <video src={fileName} width={100} controls />;
    case mimeType.startsWith('image'):
      return <img src={fileName} width={100} alt="thumbnail" />;
    case mimeType.startsWith('application/pdf'):
      return (
        <iframe src={fileName} width={100} height={100} style={{ overflow: 'hidden' }} seamless />
      );
    default:
      return null;
  }
};
