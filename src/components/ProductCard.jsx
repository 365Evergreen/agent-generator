import React, { useState } from 'react';
import Modal from './Modal';
import PersonalAssistModal from './PersonalAssistModal';
import LeadGeneratorModal from './LeadGeneratorModal';
import HrAgentModal from './HrAgentModal';

function ProductCard({ name, description, link }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getModalContent = () => {
    switch (link) {
      case '/personal-assist':
        return <PersonalAssistModal />;
      case '/lead-generator':
        return <LeadGeneratorModal />;
      case '/hr-agent':
        return <HrAgentModal />;
      default:
        return <div>Demo not available</div>;
    }
  };

  return (
    <>
      <div className="product-card">
        <h2>{name}</h2>
        <p>{description}</p>
        <button onClick={openModal} className="demo-button">
          View Demo
        </button>
      </div>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={name}
      >
        {getModalContent()}
      </Modal>
    </>
  );
}

export default ProductCard;