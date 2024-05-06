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
  scale_name: string;
  no_of_responses: string; 
}

const RatingScale: React.FC<RatingScaleProps> = ({
  workspace_id,
  username,
  scale_id,
  buttonColor,
  scale_type,
  axis_limit,
  pointers,
  scale_name,
  no_of_responses
}) => {


  return (
    <div style={{
      minHeight:"60px",
      minWidth:"400px",
      margin:"5px",
      padding:"10px",
      textAlign:"center"
    }}>
   
   {scale_type === 'nps' && (
          <NpxScale
            workspace_id={workspace_id}
            username={username}
            scale_id={scale_id}
            buttonColor={buttonColor || ""}
            scale_name={scale_name}
            no_of_responses={no_of_responses}
          />
        )}
         {scale_type === 'nps_lite' && (
          <NpxLite
            workspace_id={workspace_id}
            username={username}
            scale_id={scale_id}
            buttonColor={buttonColor || ""}
            scale_name={scale_name}
            no_of_responses={no_of_responses}
          />
        )}
         {scale_type === 'stapel' && (
          <NpxStapel
            workspace_id={workspace_id}
            username={username}
            scale_id={scale_id}
            buttonColor={buttonColor || ""}
            axis_limit={axis_limit || 0}
            scale_name={scale_name}
            no_of_responses={no_of_responses}
          />
        )}
         {scale_type === 'likert' && (
          <NpxLikert
            workspace_id={workspace_id}
            username={username}
            scale_id={scale_id}
            buttonColor={buttonColor || ""}
            pointers={pointers || 0}
            scale_name={scale_name}
            no_of_responses={no_of_responses}
          />
        )}
    </div>
  );
}

export { RatingScale };
