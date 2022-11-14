import { Button, Modal } from 'antd';

export const WarningDialogueCard = ({ 
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
            ]}
      >
        <p>{message}</p>
      </Modal>
    );
}