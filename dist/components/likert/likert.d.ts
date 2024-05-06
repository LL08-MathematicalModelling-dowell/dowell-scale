import * as React from 'react';
interface NpxLikertProps {
    workspace_id: string;
    username: string;
    scale_id: string;
    pointers: number;
    buttonColor?: string;
    scale_name: string;
    no_of_responses: string;
}
declare const NpxLikert: React.FC<NpxLikertProps>;
export { NpxLikert };
