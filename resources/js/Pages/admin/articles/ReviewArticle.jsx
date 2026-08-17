import { useState } from 'react';
import AddArticles from './AddArticles';

export default function ReviewArticle({
  isOpen,
  onClose,
  article = null,
  departments = [],
  onApprove = null,
  onReject = null,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  return (
    <AddArticles
      isOpen={isOpen}
      onClose={handleClose}
      article={article}
      isViewing={!isEditing}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      departments={departments}
      isReviewMode={true}
      onApproveFromReview={onApprove}
      onRejectFromReview={onReject}
    />
  );
}
