import AddArticles from './AddArticles';

export default function EditArticle({
  isOpen,
  onClose,
  onSave,
  article = null,
  departments = []
}) {
  return (
    <AddArticles
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      article={article}
      isEditing={true}
      departments={departments}
    />
  );
}
