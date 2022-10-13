import { Button, Modal } from 'antd';

export const DialogueCard = ({ 
    message, 
    dialogueCardState, 
    setDialogueCardState, 
    handleConfirm 
}) => {
    return (
        <Modal
        centered
        open={dialogueCardState}
        onCancel={() => setDialogueCardState(false)}
        footer={[
            <Button 
            key={3}
            className="themed-button"
            onClick={() => handleConfirm()}
            >
                Confirm
            </Button>,
            <Button 
            key={4}
            className="themed-button"
            onClick={() => setDialogueCardState(false)}
            >
                Cancel
            </Button>
        ]}
      >
        <p>{message}</p>
      </Modal>
    );
}