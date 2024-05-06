import * as React from 'react';
interface NpxScaleProps {
    workspace_id: string;
    username: string;
    scale_id: string;
    buttonColor: string;
    scale_name: string;
    no_of_responses: string;
}
declare const NpxScale: React.FC<NpxScaleProps>;
export { NpxScale };
