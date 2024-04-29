import * as React from 'react';
import { NpxScale } from "../npx/npx";

interface RatingScaleProps {
  workspace_id: string;
  username: string;
  scale_id: string;
  buttonColor: string;
  scale_type: string;
}

const RatingScale: React.FC<RatingScaleProps> = ({
  workspace_id,
  username,
  scale_id,
  buttonColor,
  scale_type,
}) => {


  return (
    <div style={{
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center'
    }}>
   
      {scale_type === 'nps' && (
        <NpxScale
          workspace_id={workspace_id}
          username={username}
          scale_id={scale_id}
          buttonColor={buttonColor}
        />
      )}
    </div>
  );
}

export { RatingScale };
