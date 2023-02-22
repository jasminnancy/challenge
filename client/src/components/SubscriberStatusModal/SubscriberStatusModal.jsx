import { useState } from "react";
import Modal, { ModalBody, ModalFooter } from "../Modal";
import PropTypes from "prop-types";

// Components
import Button, { SecondaryButton } from "../Button";

// Services
import { updateSubscriber } from "../../services/subscriber";

const SubscriberStatusModal = (props) => {
  const { isOpen, onSuccess, onClose, subscriberId, status } = props;
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState();

  const onUpdate = () => {
    const payload = {
      status: !status,
    };

    setIsUpdating(true);
    updateSubscriber(subscriberId, payload)
      .then(({ data }) => {
        onSuccess(data);
      })
      .catch((payload) => {
        const error =
          payload?.response?.data?.message || "Something went wrong";
        setError(error);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const modalTitleText = status ? "Unsubscribe" : "Resubscribe";
  const messageBodyText = `Are you sure you'd like to ${
    status ? "unsubscribe" : "resubscribe"
  } to this subscriber?`;
  const buttonText = status ? "Unsubscribe" : "Resubscribe";

  return (
    <Modal
      modalTitle={modalTitleText}
      showModal={isOpen}
      onCloseModal={onClose}
    >
      <>
        <ModalBody>{messageBodyText}</ModalBody>
        <ModalFooter>
          <SecondaryButton className="mx-2" onClick={onClose}>
            Cancel
          </SecondaryButton>
          <Button type="primary" loading={isUpdating} onClick={onUpdate}>
            {buttonText}
          </Button>
          {error && <div>{error}</div>}
        </ModalFooter>
      </>
    </Modal>
  );
};

SubscriberStatusModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  subscriberId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.bool,
};

export default SubscriberStatusModal;
