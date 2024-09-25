import React from 'react'

const LogoutModal = ({ confirmLogout, modalRef }) => {
    return (
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <p className="font-bold text-base text-red-600">Are you sure you want to logout?</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={confirmLogout}>Yes</button>
            <button className="btn" onClick={() => modalRef.current.close()}>No</button>
          </div>
        </div>
      </dialog>
    );
  };

export default LogoutModal