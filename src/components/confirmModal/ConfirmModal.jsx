import React from 'react'
import styles from './confirmModal.module.css'

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
    
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p>{message}</p>
                <div className={styles.modalActions}>
                    <button className={styles.confirmButton} onClick={onConfirm}>OK</button>
                    <button className={styles.cancelButton} onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal