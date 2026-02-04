import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import './ConfirmDialog.css';

const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Delete',
    message = 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText = 'Delete',
    cancelText = 'Cancel',
    type = 'danger' // 'danger' | 'warning'
}) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            footer={
                <>
                    <button className="btn btn-secondary" onClick={onClose}>
                        {cancelText}
                    </button>
                    <button
                        className={`btn ${type === 'danger' ? 'btn-danger' : 'btn-warning'}`}
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </button>
                </>
            }
        >
            <div className="confirm-content">
                <div className={`confirm-icon ${type}`}>
                    <AlertTriangle size={32} />
                </div>
                <p className="confirm-message">{message}</p>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;
