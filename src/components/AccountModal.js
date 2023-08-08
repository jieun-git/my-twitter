const AccountModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return(
        <div className="modal-wrapper">
            <div className="modal-contents">
                <button className="modal-close-btn" onClick={onClose}>X</button>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default AccountModal