import AddUser from './AddUser';

export default function EditUser({
  isOpen,
  onClose,
  onSave,
  user = null,
  departments = []
}) {
  // If no user is provided, just close the modal
  if (isOpen && !user) {
    onClose();
    return null;
  }

  // Prepare user data for the AddUser component
  const userData = user ? {
    id: user.id,
    first_name: user.firstname || user.first_name || '',
    middle_name: user.middlename || user.middle_name || '',
    last_name: user.lastname || user.last_name || '',
    email: user.email || '',
    departments: user.departments || [],
    status: user.status || 'active',
    access_controls: user.permissions || user.access_controls || [],
    password: '',
    password_confirmation: '',
  } : null;

  // Create a wrapped onSave that handles the update
  const handleUpdate = async (formData) => {
    // Add the user ID to the form data
    const updateData = {
      ...formData,
      id: user?.id,
    };
    
    // Call the original onSave with the update data
    return await onSave(updateData);
  };

  return (
    <AddUser
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleUpdate}
      isEditing={true}
      user={userData}
    />
  );
}