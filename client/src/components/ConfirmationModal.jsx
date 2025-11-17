import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import theme from '../theme';
import { AlertTriangle, X } from 'lucide-react';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.surface};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  z-index: 1001;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.colors.urgent}1A; /* 10% opacity */
  color: ${theme.colors.urgent};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: ${theme.colors.textMain};
`;

const Message = styled.p`
  color: ${theme.colors.textLight};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  margin-left: calc(48px + 1rem); /* Align with title */
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &.primary {
    background-color: ${theme.colors.urgent};
    color: ${theme.colors.white};
    &:hover { filter: brightness(1.1); }
  }

  &.secondary {
    background-color: ${theme.colors.bgLight};
    color: ${theme.colors.textMain};
    border: 1px solid ${theme.colors.border};
    &:hover { background-color: ${theme.colors.border}; }
  }
`;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.9 },
};

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close on overlay click
        >
          <ModalContent
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Prevent closing on content click
          >
            <ModalHeader>
              <IconWrapper>
                <AlertTriangle size={24} />
              </IconWrapper>
              <Title>{title}</Title>
            </ModalHeader>
            <Message>{message}</Message>
            <ButtonGroup>
              <Button className="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button className="primary" onClick={onConfirm}>
                Delete
              </Button>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}