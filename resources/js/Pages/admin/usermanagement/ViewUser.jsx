import AddUser from './AddUser';

export default function ViewUser({
  isOpen,
  onClose,
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

  return (
    <AddUser
      isOpen={isOpen}
      onClose={onClose}
      onSave={() => {}} // No-op for view mode
      isViewing={true}
      user={userData}
    />
  );
}