import React from "react";

const LogoutModal = ({ confirmLogout, modalRef }) => {
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box text-black-2">
        <h3 className="font-bold text-lg">Confirm exit</h3>
        <p className="py-4 text-[17px] font-semibold">
          Do you really want to exit?
        </p>
        <div className="modal-action">
          <button
            className="btn bg-red-500 hover:bg-red-700 text-white"
            onClick={confirmLogout}
          >
            Exit
          </button>
          <button className="btn" onClick={() => modalRef.current.close()}>
            Stay
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default LogoutModal;
