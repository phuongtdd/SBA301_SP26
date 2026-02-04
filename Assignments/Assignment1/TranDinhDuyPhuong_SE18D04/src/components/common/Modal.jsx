import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'default' // 'default' | 'lg'
}) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Use React Portal to render modal at document.body level
    // This ensures proper centering regardless of parent layout
    return createPortal(
        <div className="custom-modal-overlay" onClick={handleOverlayClick}>
            <div className={`custom-modal ${size === 'lg' ? 'custom-modal-lg' : ''}`}>
                <div className="custom-modal-header">
                    <h2 className="custom-modal-title">{title}</h2>
                    <button className="custom-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="custom-modal-body">
                    {children}
                </div>
                {footer && (
                    <div className="custom-modal-footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
