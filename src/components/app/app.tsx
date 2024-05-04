import * as React from 'react';
import { NpxScale } from "../npx/npx";
import {NpxLikert} from '../likert/likert';
import {NpxLite} from '../lite/lite';
import {NpxStapel} from '../stapel/stapel';

interface RatingScaleProps {
  workspace_id: string;
  username: string;
  scale_id: string;
  buttonColor?: string;
  scale_type: string;
  axis_limit?: number; 
  pointers?: number; 
}

const RatingScale: React.FC<RatingScaleProps> = ({
  workspace_id,
  username,
  scale_id,
  buttonColor,
  scale_type,
  axis_limit,
  pointers
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
            buttonColor={buttonColor || ""}
          />
        )}
         {scale_type === 'nps_lite' && (
          <NpxLite
            workspace_id={workspace_id}
            username={username}
            scale_id={scale_id}
            buttonColor={buttonColor || ""}
          />
        )}
         {scale_type === 'stapel' && (
          <NpxStapel
            workspace_id={workspace_id}
            username={username}
            scale_id={scale_id}
            buttonColor={buttonColor || ""}
            axis_limit={axis_limit || 0}
          />
        )}
         {scale_type === 'likert' && (
          <NpxLikert
            workspace_id={workspace_id}
            username={username}
            scale_id={scale_id}
            buttonColor={buttonColor || ""}
            pointers={pointers || 0}
          />
        )}
    </div>
  );
}

export { RatingScale };
