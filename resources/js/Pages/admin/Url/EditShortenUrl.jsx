import CreateShortenUrl from './CreateShortenUrl';

export default function EditShortenUrl({
  isOpen,
  onClose,
  onSave,
  url = null,
  isLoading = false
}) {
  return (
    <CreateShortenUrl
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      url={url}
      isEditing={true}
      isLoading={isLoading}
    />
  );
}