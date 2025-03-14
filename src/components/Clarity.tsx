import { useEffect } from 'react';
import clarity from '@microsoft/clarity';

const CLARITY_PROJECT_ID = 'qoa5a77upa';

export const ClarityComponent: React.FC = () => {
  useEffect(() => {
    // Initialize Clarity
    clarity.init(CLARITY_PROJECT_ID);
  }, []);

  return null;
};

export default ClarityComponent; 